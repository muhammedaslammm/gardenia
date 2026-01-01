import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  date: { type: String },
  requester_name: { type: String },
  phone_number: { type: Number },
});

const Block = mongoose.model("block", Schema);

export default Block;
