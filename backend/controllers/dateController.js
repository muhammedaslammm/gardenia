import EventDate from "../models/eventDateModel.js";

export const getDates = async (req, res) => {
  try {
    let { month, year } = req.query;
    month = parseInt(month);
    year = parseInt(year);

    let month_start = new Date(year, month - 1, 1);
    let month_end = new Date(year, month, 1);

    let dates = await EventDate.find({
      date: { $gte: month_start, $lt: month_end },
    });
    res.json({ dates });
  } catch (error) {
    console.log("date controller error:", error.message);
    res.status(500).json({ message: error.message });
  }
};
