import Block from "../models/BlockModal.js";
import EventDate from "../models/EventDateModel.js";
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
            block_stat: 1,
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
            block_stat: 1,
          };
      console.log("date result:", date_result);
      res.json({ date_result });
    } else {
      month = parseInt(month);
      year = parseInt(year);

      let month_start = new Date(year, month - 1, 1);
      let month_end = new Date(year, month, 1);

      let query = [{ $match: { date: { $gte: month_start, $lt: month_end } } }];
      let filter_query = [];

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
        filter_query = [
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
                  cond: { $ne: ["$$event.cancelled", true] },
                },
              },
            },
          },
          {
            $project: {
              date: 1,
              events: { $size: "$events" },
              block: "$blockId",
            },
          },
        ];
      }

      let dates = await EventDate.aggregate([...query, ...filter_query]);
      console.log("dates:", dates);
      res.json({ dates });
    }
  } catch (error) {
    console.log("date controller error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getDateBookings = async (req, res) => {
  try {
    let { date } = req.params;
    let data = await EventDate.aggregate([
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
          localField: "blockId",
          foreignField: "_id",
          as: "block",
        },
      },
      {
        $unwind: {
          path: "$block",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          date: 1,
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
          block: 1,
          mainhall_stat: 1,
          minihall_stat: 1,
          block_stat: 1,
        },
      },
    ]);
    return res.json({ data: data[0] });
  } catch (error) {
    console.log("failed to fetch date bookings.", error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const exportReport = async (req, res) => {
  try {
    res.json({ message: "hey" });
  } catch (error) {
    console.log("failed to export excel sheet:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const blockDate = async (req, res) => {
  try {
    let { date } = req.body;
    let date_event = await EventDate.findOne({
      date: {
        $gte: new Date(`${date}T00:00:00.000Z`),
        $lte: new Date(`${date}T23:59:59.999Z`),
      },
    });
    if (!date_event) await EventDate.create({ date: new Date(date) });
    let new_block = await Block.create(req.body);
    await EventDate.updateOne(
      {
        date: {
          $gte: new Date(`${date}T00:00:00.000Z`),
          $lte: new Date(`${date}T23:59:59.999Z`),
        },
      },
      { $set: { block_stat: 0, blockId: new_block._id } }
    );
    return res.json({ message: "block data updated" });
  } catch (error) {
    console.log("failed to create date block details");
    return res.status(500).json({ message: error.message });
  }
};
