import Block from "../models/BlockModal.js";
import EventDate from "../models/DateModel.js";
import Event from "../models/EventModel.js";

const getBlockStat = async (date, stage, start_time, end_time) => {
  let noon_time = new Date(`${date}T12:00:00+05:30`);
  let afternoon_time = new Date(`${date}T16:00:00+05:30`);

  let events = await Event.find({ date, cancelled: { $ne: true } }).select(
    "start_time end_time stage",
  );
  let blocks = await Block.find({ date, status: { $ne: "freeze" } }).select(
    "start_time end_time stage",
  );

  let eventDate = await EventDate.findOne({
    date: {
      $gte: new Date(`${date}T00:00:00.000Z`),
      $lte: new Date(`${date}T23:59:59.999Z`),
    },
  }).select("mainhall_stat minihall_stat");

  let { mainhall_stat, minihall_stat } = eventDate || {};

  let records = [...events, ...blocks];
  console.log("records:", records);

  let stat = {
    mainhall_stat: mainhall_stat ?? 1,
    minihall_stat: minihall_stat ?? 1,
  };

  if (records.length) {
    let record = records[0];
    let overlapping =
      start_time <
        new Date(`${record.end_time}`).getTime() + 2 * 60 * 60 * 1000 &&
      end_time >
        new Date(`${record.start_time}`).getTime() - 2 * 60 * 60 * 1000;

    if (record.stage === "main_hall" && stage === "main_hall")
      return {
        message: "Failed : Main hall is not available to block",
      };
    if (overlapping)
      return {
        message: "Failed : Time slot overlapping an existing date record",
      };

    stat.mainhall_block_stat = 0;
    stat.minihall_block_stat = 0;
  } else {
    if (end_time <= afternoon_time) {
      if (stage === "main_hall") {
        stat.mainhall_block_stat = 0;
        stat.minihall_block_stat = 3;
      } else {
        stat.mainhall_block_stat = 3;
        stat.minihall_block_stat = 3;
      }
    } else if (start_time >= noon_time) {
      if (stage === "main") {
        stat.mainhall_block_stat = 0;
        stat.minihall_block_stat = 2;
      } else {
        stat.mainhall_block_stat = 2;
        stat.minihall_block_stat = 2;
      }
    } else {
      stat.mainhall_block_stat = 0;
      stat.minihall_block_stat = 0;
    }
  }

  return stat;
};

export default getBlockStat;
