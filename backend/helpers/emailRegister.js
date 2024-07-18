import nodemailer from "nodemailer";
import "dotenv/config";

const emailRegister = async (data) => {
    var transport = nodemailer.createTransport({
        host: process.env.EMAIL_REGISTER_HOST,
        port: process.env.EMAIL_REGISTER_PORT,
        auth: {
            user: process.env.EMAIL_REGISTER_USER,
            pass: process.env.EMAIL_REGISTER_PASS,
        },
    });
    const { name, email, token } = data;

    const sendEmail = await transport.sendMail({
        from: "UMA Users Management App",
        to: email,
        subject: "Confirm your account",
        text: "Confirm you email",
        html: `
            <p> Hi ${name}</p>
            <p> Check your account in the following link
        <a href= "${process.env.FRONTEND_URL}/confirmed/${token}"> Confirm Account</a>
            </p>`,
    });
    //Concate the sendEmail info
    console.log("Message send %s", sendEmail.messageId);
};

export default emailRegister;