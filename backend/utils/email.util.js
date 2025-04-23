const nodemailer = require("nodemailer");

const { HOST, SERVICE, PASS, USER } = require("../config/env.config");

const sendEmail = async (email, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      host: HOST,
      service: SERVICE,
      port: 587,
      secure: false,
      auth: {
        user: USER,
        pass: PASS,
      },
    });
    await transporter.sendMail({
      from: USER,
      to: email,
      subject,
      html,
    });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = sendEmail;
