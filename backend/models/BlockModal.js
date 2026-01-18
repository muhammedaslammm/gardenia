import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  date: { type: String },
  stage: { type: String },
  start_time: { type: Date },
  end_time: { type: Date },
  requester_name: { type: String },
  phone_number_1: { type: Number },
  phone_number_2: { type: Number },
  status: { type: String, enum: ["active", "freeze"], default: "active" },
  author_timeline: [
    {
      name: { type: String },
      date: { type: Date, default: Date.now },
    },
  ],
  author: {
    name: String,
    date: { type: Date, default: Date.now },
  },
});

const Block = mongoose.model("block", Schema);

export default Block;
