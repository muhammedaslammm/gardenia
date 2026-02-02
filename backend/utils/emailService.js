import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.CENTER_EMAIL,
    pass: process.env.CENTER_EMAIL_APP_PASSWORD,
  },
});
