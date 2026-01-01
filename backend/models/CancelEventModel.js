import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId },
  refundAmount: { type: Number },
  reScheduled: { type: Boolean, default: false },
  reScheduledEventId: { type: mongoose.Schema.Types.ObjectId },
  reasonNote: { type: String },
  createdAt: { type: Date, default: Date.now },
  cancelledBy: { type: String },
});

const CancelEventModel = mongoose.model("cancelevent", Schema);

export default CancelEventModel;
