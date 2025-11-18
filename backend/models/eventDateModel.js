import mongoose from "mongoose";

let Schema = new mongoose.Schema({
  date: { type: Date },
  events: { type: [mongoose.Schema.Types.ObjectId], ref: "event" },
  mainhall_stat: { type: Number },
  minihall_stat: { type: Number },
  message: { type: String },
  style: { color: { type: String }, bg: { type: String } },
  time_mark: { type: Date },
});

let EventDate = mongoose.model("eventdate", Schema);

export default EventDate;
