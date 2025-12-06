import EventDate from "../models/eventDateModel.js";
import Event from "../models/eventModel.js";
import User from "../models/userModel.js";
import handleDayEvent from "../utils/handleDayEvent.js";
import getData from "../utils/getData.js";
import mongoose from "mongoose";
import getDateUpdate from "../utils/getDateUpdate.js";

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

    start_time = start_time ? new Date(start_time) : undefined;
    end_time = end_time ? new Date(end_time) : undefined;

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
          "events.date": 1,
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

    let date_events = matching_date[0].events.filter(
      (ev) => ev._id.toString() !== id
    );

    let event_start_time = start_time || matching_event.start_time;
    let event_end_time = end_time || matching_event.end_time;
    let event_stage = stage || matching_event.stage;

    if ((stage || start_time || end_time) && date_events.length) {
      if (
        stage &&
        stage === "main_hall" &&
        date_events.find((ev) => ev.stage === stage)
      )
        return res.status(409).json({
          message:
            "Update Failed : Main Hall event already booked on this date",
        });
      let overlap = date_events.find(
        (ev) =>
          event_start_time <=
            new Date(ev.end_time).getTime() + 2 * 60 * 60 * 1000 &&
          event_end_time >=
            new Date(ev.start_time).getTime() - 2 * 60 * 60 * 1000
      );
      if (overlap)
        return res.status(409).json({
          message:
            "Updation Failed : Provided time is overlapping an existing event time.",
        });
    }
    //
    else if (start_time || end_time || stage) {
      let result = getDateUpdate(
        event_stage,
        event_start_time,
        event_end_time,
        matching_event.date
      );
      await EventDate.updateOne(
        { _id: matching_date[0]._id },
        { $set: result }
      );
    }
    await Event.updateOne({ _id: id }, { $set: req.body });
    return res.json({ message: "Event Updated" });
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

export const addPayment = async (req, res) => {
  try {
    let eventId = req.params.id;
    let data = req.body;
    let user = await User.findById(req.userId).select("username -_id");
    let event = await Event.findById(eventId).select(
      "payment.remaining_amount"
    );
    let remaining_amount = event.payment.remaining_amount;
    remaining_amount = remaining_amount - parseInt(data.paid_amount);

    let new_payment_data = { ...data, timeline: [user] };

    let db_query = {
      $set: { "payment.remaining_amount": remaining_amount },
      $push: { "payment.payment_timeline": new_payment_data },
    };

    if (remaining_amount === 0) {
      if (data.payment_type !== "final" && data.payment_type !== "discount")
        new_payment_data.payment_type = "final";
      db_query.$set["payment.payment_settled"] = true;
    }

    await Event.findByIdAndUpdate(eventId, db_query);

    res.json({ message: "payment updated" });
  } catch (error) {
    console.log("payment update error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const addDiscount = async (req, res) => {};

export const getCharges = async (req, res) => {
  try {
    let charges = await Event.findById(req.params.id).select(
      "addon_charges -_id"
    );
    res.json({ charges });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCharges = async (req, res) => {
  try {
    let { total_amount, items } = req.body;
    let { id } = req.params;

    let data = {
      total_amount,
      remaining_amount: total_amount,
      items,
    };

    let user = await User.findById(req.userId).select("username -_id");
    let new_charge = await Event.findByIdAndUpdate(id, {
      $set: { addon_charges: data },
    });
    return res.json({ message: "charges updated" });
  } catch (error) {
    console.log("adding charges failed:", error.message);
    return res.status(500).json({ message: error.message });
  }
};
