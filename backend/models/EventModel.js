import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    event: { type: String },
    stage: { type: String },
    event_title: { type: String },
    event_date: {
      date: { type: Date },
      iso_date: { type: String },
      start_time: { type: String },
      end_time: { type: String },
    },
    phone_number: { type: String },
    contract_number: { type: String },
    updated_by: { type: String },
  },
  { strict: true }
);

const Event = mongoose.model("event", Schema);

export default Event;
