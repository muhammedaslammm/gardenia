import EventDate from "../models/eventDateModel.js";
import Event from "../models/eventModel.js";

export const getDates = async (req, res) => {
  try {
    let { month, year, date } = req.query;

    if (date) {
      let date_result = await EventDate.aggregate([
        {
          $match: {
            date: {
              $gte: new Date(`${date}T00:00:00.000Z`),
              $lte: new Date(`${date}T23:59:59.000Z`),
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
          $project: {
            date: 1,
            mainhall_stat: 1,
            minihall_stat: 1,
            "events.start_time": 1,
            "events.end_time": 1,
            "events.cancelled": 1,
          },
        },
      ]);
      date_result = date_result.length
        ? date_result[0]
        : {
            date: new Date(date),
            events: [],
            mainhall_stat: 1,
            minihall_stat: 1,
          };
      res.json({ date_result });
    } else {
      month = parseInt(month);
      year = parseInt(year);

      let month_start = new Date(year, month - 1, 1);
      let month_end = new Date(year, month, 1);

      let query = [
        { $match: { date: { $gte: month_start, $lt: month_end } } },
        {
          $lookup: {
            from: "events",
            localField: "events",
            foreignField: "_id",
            as: "events",
          },
        },
        // {
        //   $addFields: {
        //     events: {
        //       $filter: {
        //         input: "$events",
        //         as: "event",
        //         cond: { $ne: ["$$event.cancelled", true] },
        //       },
        //     },
        //   },
        // },
      ];

      if (req.query.destination) {
        query.push({
          $project: {
            date: 1,
            mainhall_stat: 1,
            minihall_stat: 1,
            "events.start_time": 1,
            "events.end_time": 1,
            "events.cancelled": 1,
          },
        });
      } else {
        query.push({
          $project: {
            date: 1,
            mainhall_stat: 1,
            minihall_stat: 1,
            "events._id": 1,
            "events.booking_number": 1,
            "events.date": 1,
            "events.event_name": 1,
            "events.stage": 1,
            "events.event": 1,
            "events.start_time": 1,
            "events.end_time": 1,
            "events.name": 1,
            "events.cancelled": 1,
          },
        });
      }

      let dates = await EventDate.aggregate(query);
      res.json({ dates });
    }
  } catch (error) {
    console.log("date controller error:", error.message);
    res.status(500).json({ message: error.message });
  }
};
