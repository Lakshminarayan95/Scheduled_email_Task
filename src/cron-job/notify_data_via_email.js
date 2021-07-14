var cron = require('node-cron');
const request = require('request');
const moment = require('moment');
const emailService = require('../email_service/smtp_servie');
const queryDAO = require('../dao/query-dao');
const emailTemplate = require('../email_service/email_template');


async function promiseRequest(methodName, url, json) {
    const options = {
        method: methodName,
        headers: {
            "content-type": "application/json",
        },
        url: url,
        json: json,
    };
    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (error) {
                return reject(error);
            }
            return resolve(body);
        });
    });
};


async function notify_users() {
    try {
        const url = "http://localhost:9005/tasks/getUndelivered_email"

        var undeliverd_data = await promiseRequest('GET', url, true)
        console.log("undeliverd_data", undeliverd_data);
        if (undeliverd_data.status == 200) {
            for (let i = 0; i < undeliverd_data.unDeliveredList.length; i++) {
                const params = undeliverd_data.unDeliveredList[i]

                let delivery_dates = moment(new Date(params.deliver_date)).format("YYYY-MM-DD");
                let today = moment(new Date()).format("YYYY-MM-DD");

                if (today <= delivery_dates) {

                    let emailOptions = emailTemplate.notify_email_delivery(params.email, params.name, params.content, params.deliver_date);
                    emailService.sendMail(emailOptions);

                    const updateFields = {
                        "email_delivered_status" : true, 
                        "email_delivered_flag" : 1
                    }
                    const updateData = await queryDAO.updateByCondition({ _id: params._id }, updateFields);
                    console.log("updateData", updateData)
                }
            }
        }
        console.log({ status: 200 })
    } catch (error) {
        return Promise.reject(res.error(500, error.message, error.stack));
    }
}


// CRON JOB executed for every day at 06:00 PM
var task = cron.schedule('00 18 * * *', async function () {
    notify_users();
});

task.start();