import EventDate from "../models/DateModel.js";
import Gallery from "../models/GalleryModal.js";

export const getMonthEvents = async (req, res) => {
  try {
    let { month, year } = req.query;

    let month_start = new Date(year, parseInt(month) - 1, 1);
    let month_end = new Date(year, parseInt(month), 1);

    let dates = await EventDate.aggregate([
      {
        $match: {
          date: { $gte: month_start, $lt: month_end },
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
              cond: {
                $ne: ["$$event.cancelled", true],
              },
            },
          },
          blocks: {
            $filter: {
              input: "$blocks",
              as: "block",
              cond: {
                $ne: ["$$block.status", "freeze"],
              },
            },
          },
        },
      },
      {
        $project: {
          date: 1,
          events: { $size: "$events" },
          blocks: { $size: "$blocks" },
        },
      },
    ]);

    return res.json({ dates });
  } catch (error) {
    console.log("date details failed to fetch:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const getDateDetails = async (req, res) => {
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
                $ne: ["$$event.cancelled", true],
              },
            },
          },
          blocks: {
            $filter: {
              input: "$blocks",
              as: "block",
              cond: {
                $ne: ["$$block.status", "freeze"],
              },
            },
          },
        },
      },
      {
        $project: {
          date: 1,
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
    ]);
    return res.json({ data: data[0] });
  } catch (error) {
    console.log("date details failed to fetch:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const getGallery = async (req, res) => {
  try {
    let images = await Gallery.find().select("public_id -_id");
    return res.json({ images });
  } catch (error) {
    console.log(
      "failed to fetch gallery images for client page:",
      error.message,
    );
  }
};
