import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, unique: true },
  description: { type: String },
  job_type: { type: String },
  enquiry_email: { type: String },
  enquiry_phone: { type: Number },
});

const Job = mongoose.model("job", jobSchema);

export default Job;
