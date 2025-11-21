import mongoose from "mongoose";

let Schema = new mongoose.Schema({
  date: { type: Date },
  events: { type: [mongoose.Schema.Types.ObjectId], ref: "event" },
  mainhall_stat: { type: Number },
  minihall_stat: { type: Number },
});

let EventDate = mongoose.model("eventdate", Schema);

export default EventDate;
