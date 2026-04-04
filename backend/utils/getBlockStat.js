import EventDate from "../models/DateModel.js";

const getBlockStat = async (date, stage, start_time, end_time) => {
  let noon_time = new Date(`${date}T12:00:00+05:30`);
  let afternoon_time = new Date(`${date}T16:00:00+05:30`);

  let $date = (
    await EventDate.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(`${date}T00:00:00.000Z`),
            $lte: new Date(`${date}T23:59:59.999Z`),
          },
        },
      },
      {
        $lookup: {
          from: "events",
          localField: "events",
          foreignField: "_id",
          as: "events",
        },
      },
      {
        $lookup: {
          from: "blocks",
          localField: "blocks",
          foreignField: "_id",
          as: "blocks",
        },
      },
      {
        $addFields: {
          events: {
            $filter: {
              input: "$events",
              as: "event",
              cond: { $ne: ["$$event.cancelled", true] },
            },
          },
        },
      },
      {
        $project: {
          mainhall_stat: 1,
          minihall_stat: 1,
          mainhall_block_stat: 1,
          minihall_block_stat: 1,
          "events.start_time": 1,
          "events.end_time": 1,
          "blocks.start_time": 1,
          "blocks.end_time": 1,
        },
      },
    ])
  )[0];

  let events = $date?.events || [];
  let blocks = $date?.blocks || [];

  let stat = {
    mainhall_stat: $date?.mainhall_stat ?? 1,
    minihall_stat: $date?.minihall_stat ?? 1,
    mainhall_block_stat: $date?.mainhall_block_stat ?? 1,
    minihall_block_stat: $date?.minihall_block_stat ?? 1,
  };

  if (stage === "main_hall") {
    if (stat.mainhall_stat === 0)
      return { message: "Event Blocking Failed : Main hall is not available" };
    else if (stat.mainhall_block_stat === 1) {
      if (end_time <= afternoon_time) {
        stat.mainhall_block_stat = 0;
        stat.minihall_block_stat = 3;
      } else if (start_time >= noon_time) {
        stat.mainhall_block_stat = 0;
        stat.minihall_block_stat = 2;
      } else {
        stat.mainhall_block_stat = 0;
        stat.minihall_block_stat = 0;
      }
    } else if (stat.mainhall_block_stat === 2) {
      let intersecting = [...events, ...blocks].find(
        (item) =>
          end_time > new Date(item.start_time).getTime() - 2 * 1000 * 60 * 60,
      );
      if (intersecting)
        return {
          message:
            "Event Blocking Failed : Time ovelapping an existing booking or event",
        };
      stat.mainhall_block_stat = 0;
      stat.minihall_block_stat = 0;
    } else if (stat.mainhall_block_stat === 3) {
      let intersecting = [...events, ...blocks].find(
        (item) =>
          start_time < new Date(item.end_time).getTime() + 2 * 1000 * 60 * 60,
      );
      if (intersecting)
        return {
          message:
            "Event Blocking Failed : Time overlapping an existing booking or event",
        };
      stat.mainhall_block_stat = 0;
      stat.minihall_block_stat = 0;
    }
  } else if (stage === "mini_hall") {
    if (stat.minihall_stat === 0)
      return { message: "Event Blocking Failed : Mini hall not available" };
    else if (stat.minihall_block_stat === 1) {
      if (end_time <= afternoon_time) {
        stat.mainhall_block_stat = 3;
        stat.minihall_block_stat = 3;
      } else if (start_time >= noon_time) {
        stat.mainhall_block_stat = 2;
        stat.minihall_block_stat = 2;
      } else {
        stat.mainhall_block_stat = 0;
        stat.minihall_block_stat = 0;
      }
    } else if (stat.minihall_block_stat === 2) {
      let intersecting = [...events, ...blocks].find(
        (item) =>
          end_time > new Date(item.start_time).getTime() - 2 * 1000 * 60 * 60,
      );
      if (intersecting)
        return {
          message:
            "Event Blocking Failed : Time overlapping an existing booking or event",
        };
      stat.mainhall_block_stat = 0;
      stat.minihall_block_stat = 0;
    } else if (stat.minihall_block_stat === 3) {
      let intersecting = [...events, ...blocks].find(
        (item) =>
          start_time < new Date(item.end_time).getTime() + 2 * 1000 * 60 * 60,
      );
      if (intersecting)
        return {
          message:
            "Event Blocking Failed : Time overlapping an existing booking or event",
        };
      stat.mainhall_block_stat = 0;
      stat.minihall_block_stat = 0;
    }
  }

  return stat;
};

export default getBlockStat;
