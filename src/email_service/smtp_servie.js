var request = require('request');
var nodemailer = require('nodemailer');

var smtpTransport = nodemailer.createTransport({
    port: 465,
    host: 'smtp.gmail.com',
    secure: true, // use SSL
    // secure: false,
    auth: {
        user: 'lakshminarayanachar02@gmail.com',
        pass: 'TASKCHECK@123'
    }
});

exports.sendMail = function (mailOptions) {
    smtpTransport.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Mail sent: ', info);
            }
        });
}


