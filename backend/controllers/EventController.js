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
    let event_date = await EventDate.findOne({
      date: {
        $gte: new Date(`${new_event.date}T00:00:00.000Z`),
        $lte: new Date(`${new_event.date}T23:59:59.000Z`),
      },
    });
    if (!event_date) {
      await EventDate.create({
        ...day_result,
        events: [event._id],
        date: new Date(`${new_event.date}T00:00:00.000Z`),
      });
    } else {
      event_date.events.push(event._id);
      event_date.mainhall_stat = day_result.mainhall_stat;
      event_date.minihall_stat = day_result.minihall_stat;
      await event_date.save();
    }

    return res.json({ message: "event created" });
  } catch (error) {
    console.log("error:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const updateEvent = async (req, res) => {
  let { id } = req.params;
  let { date } = req.query;
  let { start_time, end_time, stage, ...rest } = req.body;
  try {
    let day_start = new Date(`${date}T00:00:00.000Z`);
    let day_end = new Date(`${date}T23:59:59.000Z`);
    let matching_date = await EventDate.aggregate([
      { $match: { date: { $gte: day_start, $lte: day_end } } },
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
          "events._id": 1,
          "events.stage": 1,
          "events.start_time": 1,
          "events.end_time": 1,
        },
      },
    ]);
    if (!matching_date.length)
      return res
        .status(404)
        .json({ message: "Updation Failed : Credential not found" });

    let matching_event = matching_date[0].events.find(
      (ev) => ev._id.toString() === id
    );

    if (!matching_event)
      return res
        .status(404)
        .json({ message: "Update Failed : Credential not found" });

    let { mainhall_stat, minihall_stat } = matching_date;
    let date_events = matching_date.events.filter(
      (ev) => ev._id.toString() !== id
    );

    if (date_events.length) {
      let time_contradict = date_events.find((ev) => {
        console.log(`db time: ${ev.start_time} | client time: ${start_time}`);
      });
    }
  } catch (error) {
    console.log("error:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const getEvent = async (req, res) => {
  let { id } = req.params;
  try {
    if (req.query.date) {
      let event = await Event.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id) } },
        {
          $addFields: {
            booker_name: "$contact_details.booker_name",
            address: "$contact_details.address",
            phone_number_1: "$contact_details.phone_number_1",
            phone_number_2: "$contact_details.phone_number_2",
          },
        },
        {
          $project: {
            payment: 0,
            timeline: 0,
            contact_details: 0,
          },
        },
      ]);
      return res.json({ event: event[0] });
    }
    let event = await Event.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
    ]);
    return res.json({ event: event[0] });
  } catch (error) {
    console.log("error:", error.message);
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
