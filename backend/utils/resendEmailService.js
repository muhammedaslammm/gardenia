import dotenv from "dotenv";
import { Resend } from "resend";
import {
  enquiryEmail,
  eventCancellationEmail,
  eventCreationEmail,
} from "./resendEmailTemplates.js";
dotenv.config();

export const sendEventCreationNotification = async (event) => {
  if (!process.env.RESEND_API_KEY || !process.env.RESEND_RECEIVER_EMAIL) {
    console.warn(
      "Event email skipped: Resend environment variables are missing",
    );
    return;
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from:
        process.env.RESEND_SENDER_EMAIL ||
        "Gardenia Convention Center <onboarding@resend.dev>",
      to: process.env.RESEND_RECEIVER_EMAIL,
      subject: `New Event Booking #${event.booking_number}`,
      html: eventCreationEmail(event),
    });

    if (error) throw error;
    console.log("Success: event creation email sent");
  } catch (error) {
    console.error("Failed: event creation email could not be sent", error);
  }
};

export const sendEventCancellationNotification = async (cancellation) => {
  if (!process.env.RESEND_API_KEY || !process.env.RESEND_RECEIVER_EMAIL) {
    console.warn(
      "Cancellation email skipped: Resend environment variables are missing",
    );
    return;
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from:
        process.env.RESEND_SENDER_EMAIL ||
        "Gardenia Convention Center <onboarding@resend.dev>",
      to: process.env.RESEND_RECEIVER_EMAIL,
      subject: `Event Cancelled ${cancellation?.reScheduled && "for Reschedule"} #${cancellation.booking_number}`,
      html: eventCancellationEmail(cancellation),
    });

    if (error) throw error;
    console.log("Success: event cancellation email sent");
  } catch (error) {
    console.error("Failed: event cancellation email could not be sent", error);
  }
};

export const sendEnquiryNotification = async (enquiry) => {
  if (!process.env.RESEND_API_KEY || !process.env.RESEND_RECEIVER_EMAIL) {
    console.warn(
      "Enquiry email skipped: Resend environment variables are missing",
    );
    return;
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from:
        process.env.RESEND_SENDER_EMAIL ||
        "Gardenia Convention Center <onboarding@resend.dev>",
      to: process.env.RESEND_RECEIVER_EMAIL,
      subject: `New Enquiry from ${enquiry.name || "Website Visitor"}`,
      html: enquiryEmail(enquiry),
    });

    if (error) throw error;
    console.log("Success: enquiry email sent");
  } catch (error) {
    console.error("Failed: enquiry email could not be sent", error);
  }
};
