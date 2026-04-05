import mongoose from "mongoose";
import Block from "../models/BlockModal.js";
import EventDate from "../models/DateModel.js";
import Event from "../models/EventModel.js";
import User from "../models/UserModel.js";
import getBlockData from "../utils/getBlockData.js";
import getBlockStat from "../utils/getBlockStat.js";

export const createBlock = async (req, res) => {
  try {
    let { date, stage } = req.body;
    console.log("start time:", req.body.start_time);
    let { start_time, end_time, ...rest } = getBlockData(req.body);
    let stat = await getBlockStat(date, stage, start_time, end_time);
    if (stat?.message) return res.status(400).json({ message: stat?.message });
    let author = (await User.findOne({ _id: req.userId }))?.username;

    let session = await mongoose.startSession();

    // await session.withTransaction(async () => {
    //   console.log("start time:", start_time);
    //   const block = await Block.create(
    //     [
    //       {
    //         ...rest,
    //         date,
    //         stage,
    //         start_time,
    //         end_time,
    //         author: { name: author },
    //         author_timeline: [{ name: author }],
    //       },
    //     ],
    //     { session },
    //   );
    //   await EventDate.updateOne(
    //     {
    //       date: {
    //         $gte: new Date(`${date}T00:00:00.000Z`),
    //         $lte: new Date(`${date}T23:59:59.999Z`),
    //       },
    //     },
    //     {
    //       $set: stat,
    //       $push: { blocks: block._id },
    //       $setOnInsert: { date: new Date(date) },
    //     },
    //     {
    //       upsert: true,
    //       session,
    //     },
    //   );
    // });

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

    return res.json({ message: "Time Slot Booked" });
  } catch (error) {
    console.log("block creation failed:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteBlock = async (req, res) => {
  try {
    let { id } = req.params;
    let block = await Block.findOne({ _id: id }).select(
      "date start_time end_time _id",
    );

    if (!block) return res.status(404).json({ message: "Block Not Found" });

    let blocks = await Block.find({
      _id: { $ne: id },
      date: block.date,
      status: { $ne: "freeze" },
    }).select("stage");

    let events = await Event.find({
      date: block.date,
      cancelled: { $ne: true },
    }).select("stage");

    let records = [...events, ...blocks];
    let stat = {};

    if (records.length === 0) {
      stat.mainhall_block_stat = 1;
      stat.minihall_block_stat = 1;
    } else {
      let record = records[0];
      let { start_time, end_time } = block;
      let noon = new Date(`${block.date}T12:00:00+05:30`);
      let afternoon = new Date(`${block.date}T16:00:00+05:30`);

      if (end_time <= afternoon) {
        if (record.stage === "main_hall") {
          stat.mainhall_block_stat = 0;
          stat.minihall_block_stat = 2;
        } else {
          stat.mainhall_block_stat = 2;
          stat.minihall_block_stat = 2;
        }
      } else if (start_time >= noon) {
        if (record.stage === "main_hall") {
          stat.mainhall_block_stat = 0;
          stat.minihall_block_stat = 3;
        } else {
          stat.mainhall_block_stat = 3;
          stat.minihall_block_stat = 3;
        }
      }
    }

    let session = await mongoose.startSession();
    await session.withTransaction(async () => {
      await EventDate.updateOne(
        {
          date: {
            $gte: new Date(`${block.date}T00:00:00.000Z`),
            $lte: new Date(`${block.date}T23:59:59.999Z`),
          },
        },
        { $set: stat },
        { session },
      );
      await Block.deleteOne({ _id: id }, { session });
    });
    return res.json({ message: "Block Deleted" });
  } catch (error) {
    console.log("failed to delete the block:", error.message);
    return res.status(500).json({ message: error.message });
  }
};
