import EventDate from "../models/eventDateModel.js";

const getCancellationStat = async ({ _id, stage, date }) => {
  try {
    let day_stat = { mainhall_stat: 0, minihall_stat: 0 };
    let data = await EventDate.aggregate([
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
        $addFields: {
          events: {
            $filter: {
              input: "$events",
              as: "event",
              cond: { $ne: ["$$event._id", _id] },
            },
          },
        },
      },
    ]);

    let events = data[0].events;
    console.log("events:", events);

    if (stage === "main_hall") {
      if (events.length) {
        if (
          events[0].start_time <
          new Date(
            `${date}T12:00:00+05:30` &&
              events[0].end_time < new Date(`${date}T14:00:00+05:30`)
          )
        ) {
          day_stat.mainhall_stat = 3;
          day_stat.minihall_stat = 3;
        } else if (events[0].start_time > new Date(`${date}T12:00:00+05:30`)) {
          day_stat.mainhall_stat = 2;
          day_stat.minihall_stat = 2;
        }
      } else {
        day_stat.mainhall_stat = 1;
        day_stat.minihall_stat = 1;
      }
    } else if (stage === "mini_hall") {
      if (events.length) {
        if (
          events[0].start_time < new Date(`${date}T12:00:00+05:30`) &&
          events[0].end_time <= new Date(`${date}T16:00:00+05:30`)
        ) {
          if (events[0].stage === "main_hall") {
            day_stat.mainhall_stat = 0;
            day_stat.minihall_stat = 3;
          } else if (events[0].stage === "mini_hall") {
            day_stat.mainhall_stat = 3;
            day_stat.minihall_stat = 3;
          }
        } else if (events[0].start_time > new Date(`${date}T12:00:00+05:30`)) {
          if (events[0].stage === "main_hall") {
            day_stat.mainhall_stat = 0;
            day_stat.minihall_stat = 2;
          } else if (events[0].stage === "mini_hall") {
            day_stat.mainhall_stat = 2;
            day_stat.minihall_stat = 2;
          }
        }
      } else {
        day_stat.mainhall_stat = 1;
        day_stat.minihall_stat = 1;
      }
    }
    return day_stat;
  } catch (error) {
    console.log("error:", error.message);
    return false;
  }
};

export default getCancellationStat;
