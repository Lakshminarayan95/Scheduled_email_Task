const queryDAO = require('../dao/query-dao');
const moment = require('moment');

const taskService = {
    async create_email_data(bodyData) {
        try {

            if (!bodyData) {
                return Promise.reject(res.error(406, 'Invalid Payload'));
            }
            if (!bodyData.name) {
                return Promise.reject(res.error(406, 'Name is Mandatory'));
            }
            if (!bodyData.mobile) {
                return Promise.reject(res.error(406, 'Mobile number is Mandatory'));
            }
            if (!bodyData.email) {
                return Promise.reject(res.error(406, 'email is Mandatory'));
            }
            if (!bodyData.content) {
                return Promise.reject(res.error(406, 'Please provide the content for the emai'));
            }
            if (!bodyData.deliver_date) {
                return Promise.reject(res.error(406, 'Mention the Date and Time email to be Triggred'));
            }

            const result = await queryDAO.create(bodyData);
            console.log("result", result)

            return Promise.resolve({ status: 200, message: 'Email has been Scheduled successfully on ' + moment(new Date(bodyData.deliver_date)).format("DD-MMM-YYYY HH:mm:ss") + ' !!' });

        } catch (error) {
            console.log("err", error)
            return Promise.reject(res.error(500, error.message, error.stack))
        }
    },

    // Get Sales Incharge Details  
    async getList() {
        try {
            const data = await queryDAO.getData();
            if (data != null || data != undefined) {
                return Promise.resolve(data);
            } else {
                return Promise.reject(res.error(404, 'No Data Found !!'));
            }
        } catch (error) {
            return Promise.reject(res.error(500, error.message, error.stack));
        }
    },

    // Reschedule Email Deliver Date
    async Reschedule_deliver(query, BodyData) {
        try {
            if (!BodyData || !query) {
                return Promise.reject(res.error(406, 'Invalid Handshake_id'));
            }
            const getData = await queryDAO.getOne({ _id: query._id });
            console.log("getData", getData)

            if (getData == null) {
                return Promise.reject(res.error(406, 'Invalid Object Id'));
            }

            const updateFields = {
                "deliver_date": Date.parse(BodyData.deliver_date),
                "email_delivered_status": false,
                "email_delivered_flag": 0
            }
            const updateData = await queryDAO.updateByCondition({ _id: query._id }, updateFields);
            console.log("updateData", updateData)
            if (updateData.nModified == 1) {
                return Promise.resolve({ status: 200, message: 'Email deliver date Rescheduled successfully !!' });
            } else {
                return Promise.resolve({ status: 400, message: 'Some thing went while updatimg Email Deliver Date !!' });
            }
        } catch (error) {
            return Promise.reject(res.error(500, error.message, error.stack));
        }
    },

    async getDeliveredData_byDate(params) {
        try {
            if (!params) {
                return Promise.reject(res.error(406, 'Please enter proper date'));
            }

            if (params) {
                const startDate = new Date(params.startDate); // this is the starting date that looks like ISODate("2021-03-11T04:00:00.188Z")
                oneDay = (1000 * 60 * 60 * 24)
                today = new Date(startDate - (startDate % oneDay)); // Converting starting date that looks like ISODate("2021-03-11T00:00:00.000Z")
                console.log("today", today)

                const dateMidnight = new Date(today);
                dateMidnight.setHours(23);
                dateMidnight.setMinutes(59);
                dateMidnight.setSeconds(59);

                const conditions = {
                    "deliver_date":
                    {
                        $gte: today,
                        $lte: dateMidnight
                    },
                    "email_delivered_status": true,
                    "email_delivered_flag": 1
                }
                const deliveredList = await queryDAO.getByConditions(conditions)
                console.log("deliveredList", deliveredList)
                if (deliveredList.length > 0) {
                    return Promise.resolve({ status: 200, deliveredList });
                } else {
                    return Promise.reject({ status: 404, message: 'No Data found' });
                }
            }
        } catch (error) {
            return Promise.reject(res.error(500, error.message, error.stack));
        }
    },

    async getDeliveredData() {
        try {
            const conditions = {
                "email_delivered_status": true,
                "email_delivered_flag": 1
            }
            const deliveredList = await queryDAO.getByConditions(conditions)
            console.log("deliveredList", deliveredList)
            if (deliveredList.length > 0) {
                return Promise.resolve({ status: 200, deliveredList });
            } else {
                return Promise.reject({ status: 404, message: 'No Data found' });
            }
        } catch (error) {
            return Promise.reject(res.error(500, error.message, error.stack));
        }
    },

    async getUndelivered_email_byDate(params) {
        try {
            if (!params) {
                return Promise.reject(res.error(406, 'Please enter proper date'));
            }

            if (params) {
                const startDate = new Date(params.startDate); // this is the starting date that looks like ISODate("2021-03-11T04:00:00.188Z")
                oneDay = (1000 * 60 * 60 * 24)
                today = new Date(startDate - (startDate % oneDay)); // Converting starting date that looks like ISODate("2021-03-11T00:00:00.000Z")
                console.log("today", today)

                const dateMidnight = new Date(today);
                dateMidnight.setHours(23);
                dateMidnight.setMinutes(59);
                dateMidnight.setSeconds(59);

                const conditions = {
                    "deliver_date":
                    {
                        $gte: today,
                        $lte: dateMidnight
                    },
                    "email_delivered_status": false,
                    "email_delivered_flag": 0
                }
                const unDeliveredList = await queryDAO.getByConditions(conditions)
                console.log("unDeliveredList", unDeliveredList)
                if (unDeliveredList.length > 0) {
                    return Promise.resolve({ status: 200, unDeliveredList });
                } else {
                    return Promise.reject({ status: 404, message: 'No Data found' });
                }
            }
        } catch (error) {
            return Promise.reject(res.error(500, error.message, error.stack));
        }
    },

    async getUndelivered_email() {
        try {
            const conditions = {
                "email_delivered_status": false,
                "email_delivered_flag": 0
            }
            const unDeliveredList = await queryDAO.getByConditions(conditions)
            console.log("unDeliveredList", unDeliveredList)
            if (unDeliveredList.length > 0) {
                return Promise.resolve({ status: 200, unDeliveredList });
            } else {
                return Promise.reject({ status: 404, message: 'No Data found' });
            }
        } catch (error) {
            return Promise.reject(res.error(500, error.message, error.stack));
        }
    },

    async getUndelivered_email(params) {
        try {
            if (!params) {
                return Promise.reject(res.error(406, 'Please enter proper Object Id'));
            }
            const conditions = {
                _id: params._id
            }
            const getObj = await queryDAO.getByConditions(conditions)
            console.log("unDeliveredList", unDeliveredList)
            
            if (getObj.length > 0) {
                const response = await queryDAO.deleteData(conditions)
                console.log("response", response)

                return Promise.resolve({ status: 200, message: 'Data Deleted Successfully' });
            } else {
                return Promise.reject({ status: 404, message: 'No Record found' });
            }
        } catch (error) {
            return Promise.reject(res.error(500, error.message, error.stack));
        }
    },


}
module.exports = taskService;