import EventDate from "../models/eventDateModel.js";
import Event from "../models/eventModel.js";
import User from "../models/userModel.js";
import handleDayEvent from "../utils/handleDayEvent.js";
import getData from "../utils/getData.js";
import mongoose from "mongoose";

export const createEvent = async (req, res) => {
  try {
    let client_data = req.body;
    let user = await User.findOne({ _id: req.userId });
    let new_event = getData(client_data, user);

    let day_result = await handleDayEvent(
      new_event.date,
      new_event.stage,
      new_event.start_time,
      new_event.end_time
    );
    if (day_result?.message) {
      return res.status(409).json({ message: day_result.message });
    }

    let event = await Event.create(new_event);
    let new_event_date = await EventDate.create({
      ...day_result,
      events: [...day_result.events.map((ev) => ev._id), event._id],
      date: new Date(new_event.date),
    });

    return res.json({ message: "event created" });
  } catch (error) {
    console.log("error:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getEvent = async (req, res) => {
  let { id } = req.params;
  try {
    let event = await Event.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
    ]);
    return res.json({ event: event[0] });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({ message: "success", events });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    await Event.deleteOne({ _id: id });
    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
