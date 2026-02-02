import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { eventCreationTemplate } from "./emailTemplates.js";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.CENTER_EMAIL,
    pass: process.env.CENTER_EMAIL_APP_PASSWORD,
  },
});

export const sendEventCreationEmail = async (event) => {
  const mailOptions = {
    from: process.env.CENTER_EMAIL,
    to: process.env.OWNER_EMAIL,
    subject: `New Event Booking`,
    html: eventCreationTemplate(event),
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("Success : Email scucessfully send.");
  } catch (error) {
    console.log("Failed : Event creation mail failed to send");
  }
};
