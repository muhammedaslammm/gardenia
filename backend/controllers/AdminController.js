import Job from "../models/JobModel.js";

export const createJob = async (req, res) => {
  const data = req.body;
  try {
    await Job.create(data);
    const jobs = await Job.find();
    res
      .status(200)
      .json({ message: `${data.title} job successfully created`, jobs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateJob = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    await Job.updateOne({ _id: id }, data);
    const jobs = await Job.find();
    res.status(200).json({ message: "Job successfully updated", jobs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  try {
    await Job.deleteOne({ _id: id });
    const jobs = await Job.find();
    res.status(200).json({ message: "Job successfully deleted", jobs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    console.log("jobs:", jobs);
    res.status(200).json({ success: true, jobs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
