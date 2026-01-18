import Block from "../models/BlockModal.js";
import EventDate from "../models/DateModel.js";
import User from "../models/UserModel.js";
import getBlockData from "../utils/getBlockData.js";
import getBlockStat from "../utils/getBlockStat.js";

export const createBlock = async (req, res) => {
  try {
    console.log("data:", req.body);
    let { date, stage } = req.body;
    let { start_time, end_time, ...rest } = getBlockData(req.body);
    let stat = await getBlockStat(date, stage, start_time, end_time);
    if (stat?.message) return res.status(400).json({ message: stat?.message });
    let author = (await User.findOne({ _id: req.userId }))?.username;
    const block = await Block.create({
      ...rest,
      date,
      stage,
      start_time,
      end_time,
      author: { name: author },
      author_timeline: [{ name: author }],
    });
    await EventDate.updateOne(
      {
        date: {
          $gte: new Date(`${date}T00:00:00.000Z`),
          $lte: new Date(`${date}T23:59:59.999Z`),
        },
      },
      {
        $set: stat,
        $push: { blocks: block._id },
        $setOnInsert: { date: new Date(date) },
      },
      {
        upsert: true,
      },
    );
    return res.json({ message: "Time slot successfully booked" });
  } catch (error) {
    console.log("block creation failed:", error.message);
    return res.status(500).json({ message: error.message });
  }
};
