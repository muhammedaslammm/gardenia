import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    name: String,
    email: String,
    contact_number: String,
    event_date: Date,
    event: String,
    stage: String,
    read: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Enquiry = mongoose.model("enquiry", Schema);

export default Enquiry;
