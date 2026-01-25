import EventDate from "../models/DateModel.js";

const getCancellationStat = async ({ _id, stage, date }) => {
  try {
    let day_stat = {
      mainhall_stat: 1,
      minihall_stat: 1,
      mainhall_block_stat: 1,
      minihall_block_stat: 1,
    };
    let data = (
      await EventDate.aggregate([
        {
          $match: { date: new Date(date) },
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
                cond: {
                  $and: [
                    { $ne: ["$$event._id", _id] },
                    { $ne: ["$$event.cancelled", true] },
                  ],
                },
              },
            },
          },
        },
        {
          $addFields: {
            blocks: {
              $filter: {
                input: "$blocks",
                as: "block",
                cond: { $ne: ["$$block.status", "freeze"] },
              },
            },
          },
        },
        {
          $project: { events: 1, blocks: 1 },
        },
      ])
    )[0];

    let events = data?.events;
    let blocks = data?.blocks;
    let items = [...events, ...blocks];
    let noon = new Date(`${date}T12:00:00+05:30`);
    let afternoon = new Date(`${date}T16:00:00+05:30`);

    if (stage === "main_hall") {
      if (items.length) {
        if (items[0].start_time <= noon && items[0].end_time <= afternoon) {
          if (events.length) {
            day_stat.mainhall_stat = 3;
            day_stat.minihall_stat = 3;
          }
          day_stat.mainhall_block_stat = 3;
          day_stat.minihall_block_stat = 3;
        } else if (items[0].start_time >= noon) {
          if (events.length) {
            day_stat.mainhall_stat = 2;
            day_stat.minihall_stat = 2;
          }
          day_stat.mainhall_block_stat = 2;
          day_stat.minihall_block_stat = 2;
        }
      }
    } else if (stage === "mini_hall") {
      if (items.length) {
        if (items[0].start_time <= noon && items[0].end_time <= afternoon) {
          if (items[0].stage === "main_hall") {
            if (events.length) {
              day_stat.mainhall_stat = 0;
              day_stat.minihall_stat = 3;
            }
            day_stat.mainhall_block_stat = 0;
            day_stat.minihall_block_stat = 3;
          } else if (items[0].stage === "mini_hall") {
            if (events.length) {
              day_stat.mainhall_stat = 3;
              day_stat.minihall_stat = 3;
            }
            day_stat.mainhall_block_stat = 3;
            day_stat.minihall_block_stat = 3;
          }
        } else if (items[0].start_time >= noon) {
          if (items[0].stage === "main_hall") {
            if (events.length) {
              day_stat.mainhall_stat = 0;
              day_stat.minihall_stat = 2;
            }
            day_stat.mainhall_block_stat = 0;
            day_stat.minihall_block_stat = 2;
          } else if (items[0].stage === "mini_hall") {
            if (events.length) {
              day_stat.mainhall_stat = 2;
              day_stat.minihall_stat = 2;
            }
            day_stat.mainhall_block_stat = 2;
            day_stat.minihall_block_stat = 2;
          }
        }
      }
    }
    return day_stat;
  } catch (error) {
    console.log("error:", error.message);
    return false;
  }
};

export default getCancellationStat;
