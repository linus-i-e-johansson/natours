const nodemailer = require("nodemailer");

const sendEmail = async options =>{
    // 1. create a transporter..
        const transporter =nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth:{
                user:process.env.EMAIL_USERNAME,
                password:process.env.USER_PASSWORD
            }
        })
    // 2. define email options
        const emailOptions = {
            from:"Linus Johansson <linus.i.e.johansson@gmail.com>",
            to:options.email,
            subject:options.subject,
            text:options.message,
            //html:
        }
    // 3. send email with nodemailer.
    await transporter.sendEmail(emailOptions)
};

module.exports = sendEmail;
