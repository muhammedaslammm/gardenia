import EventDate from "../models/eventDateModel.js";
import Event from "../models/eventModel.js";
import User from "../models/userModel.js";
import getData from "../utils/getData.js";
import handleDayEvent from "../utils/handleDayEvent.js";

export const createEvent = async (req, res) => {
  try {
    let client_data = req.body;
    let user = await User.findOne({ _id: req.userId });
    let new_event = getData(client_data, user);

    let event = await Event.create(new_event);
    let result = handleDayEvent(
      event.date,
      event.stage,
      event.start_time,
      event.end_time
    );

    return res.json({ message: "event reached at backend" });
  } catch (error) {
    console.log("error:", error.message);
    return res.status(500).json({ message: error.message });
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
