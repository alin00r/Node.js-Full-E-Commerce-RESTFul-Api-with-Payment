const nodemailer = require("nodemailer");

const sendEmail = async(options) => {
    const transporter = nodemailer.createTransport({
        // host: process.env.EMAIL_HOST,
        // port: process.env.EMAIL_PORT, //if secure port = 587, if true port =465
        // secure: true,
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOpts = {
        from: "E-Shop App <alinour30211@gmail.com>",
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    await transporter.sendMail(mailOpts);
};

module.exports = sendEmail;