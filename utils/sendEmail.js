const nodemailer = require('nodemailer');

const sendEmail = async (subject, html) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.titan.email',
        port: 465,
        secure: true,
        auth: {
            user: 'info@oqvest.com',
            pass: '3lEZ!b7PR1$ss-'
        }
    });
    let mailOptions = {
        from: 'info@oqvest.com',
        to: 'lead@oqvest.com',
        subject: subject,
        html: html
    }
    transporter.sendMail(mailOptions);
}

module.exports = sendEmail;