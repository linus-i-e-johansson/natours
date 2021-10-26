const nodemailer = require('nodemailer');

const sendEmail = async options =>{
//1. create transporter.
    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "3753037f71ed99",
            pass: "0b4854dfbf47de"
        }
    });
//2. Define email options.
    const emailOptions = {
        from:"Linus Johansson <linus.i.e.johansson@gmail.com>",
        to:options.email,
        subject:options.subject,
        text: options.message,
    }
//3. Actually send email with nodemailer.
    await transport.sendMail(emailOptions);
}

module.exports = sendEmail;