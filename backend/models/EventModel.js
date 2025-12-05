import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    booking_number: { type: Number },
    date: { type: String },
    stage: { type: String, enum: ["main_hall", "mini_hall", "outdoor_space"] },
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
      remaining_amount: Number,
      payment_timeline: [
        {
          payment_type: {
            type: String,
            enum: ["advance", "partial", "final"],
          },
          paid_amount: { type: Number },
          timeline: [
            {
              username: String,
              date: { type: Date, default: Date.now },
              note: String,
            },
          ],
        },
      ],
      payment_settled: { type: Boolean, default: false },
      update_timeline: [
        {
          username: String,
          date: { type: Date },
          note: String,
        },
      ],
    },
    miscellaneous_expenses: {
      total_amount: Number,
      remaining_amount: Number,
      expenses: [{ expense_name: String, amount: Number }],
      payment_summary: [{ username: String, paid_amount: Number }],
    },
    timeline: [
      {
        _id: false,
        username: String,
        date: Date,
        note: String,
      },
    ],
    restricted: { type: Boolean, default: true },
  },
  { strict: true, timestamps: true }
);

const Event = mongoose.model("event", Schema);

export default Event;
