import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    booking_number: { type: Number },
    date: { type: String },
    stage: { type: String },
    event: { type: String },
    start_time: { type: Date },
    end_time: { type: Date },
    event_name: { type: String },
    contact_details: {
      booker_name: { type: String },
      address: { type: String },
      phone_number_1: { type: Number },
      phone_number_2: { type: Number },
    },
    payment: {
      _id: false,
      total_amount: Number,
      payment_timeline: [
        {
          payment_type: {
            type: String,
            enum: ["advance", "partial", "final"],
          },
          paid_amount: { type: Number },
        },
      ],
      remaining_amount: { type: Number },
      payment_closed: { type: Boolean, default: false },
    },
    timeline: [
      {
        _id: false,
        action: { type: String, enum: ["create", "update"], default: "create" },
        author: { type: String },
        date: { type: String },
      },
    ],
  },
  { strict: true }
);

const Event = mongoose.model("event", Schema);

export default Event;
