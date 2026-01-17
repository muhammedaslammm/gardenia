import mongoose from "mongoose";

let Schema = new mongoose.Schema({
  date: { type: Date },
  events: { type: [mongoose.Schema.Types.ObjectId], ref: "event" },
  blockId: { type: mongoose.Schema.Types.ObjectId, ref: "block" },
  mainhall_stat: { type: Number, default: 1 },
  minihall_stat: { type: Number, default: 1 },
  block_stat: { type: Number, default: 1 },
  mainhall_block_stat: { type: Number, default: 1 },
  minihall_block_stat: { type: Number, default: 1 },
});

let EventDate = mongoose.model("eventdate", Schema);

export default EventDate;
