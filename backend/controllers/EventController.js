import Event from "../models/EventModel.js";
import getDateString from "../utils/getDateString.js";
import getEventDate from "../utils/getEventDate.js";

export const createEvent = async (req, res) => {
  const { iso_date, start_time, end_time, ...rest } = req.body;

  const event_date = {
    date: new Date(iso_date),
    iso_date,
    start_time,
    end_time,
  };

  try {
    const event = new Event({ ...rest, event_date });
    const new_event = await event.save();
    res.status(200).json({ message: "success", event: new_event });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const updateEvent = async (req, res) => {
  const { eventid } = req.params;
  const { iso_date, start_time, end_time, ...rest } = req.body;
  const event_date = {
    date: new Date(iso_date),
    iso_date,
    start_time,
    end_time,
  };

  try {
    await Event.updateOne({ _id: eventid }, { $set: { ...rest, event_date } });
    const updated_event = await Event.findOne({ _id: eventid });
    console.log("updated event:", updated_event);
    res
      .status(200)
      .json({ message: "success", event: updated_event, update: true });
  } catch (error) {
    console.log("error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    console.log("events accessed", events);
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
