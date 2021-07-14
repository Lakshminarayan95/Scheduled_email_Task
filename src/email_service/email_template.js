exports.notify_email_delivery = function (email, name, content, deliver_date) {
    return {
        to: email, // list of receivers
        subject: 'Notify Scheduled Email Data', // Subject line
        text: 'Dear ' + name + ',',
        html: '<span>Please find the details of your Scheduled email - ' + content + ',</span>' +
            '<p> Which was Scheduled on ' + deliver_date + '</p>' +
            '<span>Sincerely,<br/></span>' +
            '<span>Lakshminarayan K<br/></span>' +
            '<span style="border-bottom: 1px dashed grey;"></span>' +
            '<span style="color: grey;">Software Developer</span>'
    };
};