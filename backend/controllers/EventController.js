import EventDate from "../models/DateModel.js";
import Event from "../models/EventModel.js";
import User from "../models/UserModel.js";
import handleDayEvent from "../utils/handleDayEvent.js";
import getData from "../utils/getData.js";
import mongoose from "mongoose";
import getDateUpdate from "../utils/getDateUpdate.js";
import getCancellationStat from "../utils/getCancellationStat.js";
import CancelEventModel from "../models/CancelEventModel.js";
import ExcelJS from "exceljs";
import dayjs from "dayjs";
import Block from "../models/BlockModal.js";
import {
  sendEventCancellationEmail,
  sendEventCreationEmail,
} from "../utils/emailService.js";

export const createEvent = async (req, res) => {
  try {
    let client_data = req.body;
    let { payment_type, total_amount, paid_amount } = req.body;
    let staff = await User.findOne({ _id: req.userId });

    if (["partial", "final"].includes(client_data.payment_type))
      return res.status(400).json({
        message:
          "Event Creation Failed : An event can only created with Advance or Full payment.",
      });

    let matching_booking_num = await Event.findOne({
      booking_number: client_data.booking_number,
    }).select("_id");

    if (matching_booking_num)
      return res.status(409).json({
        message: "Event Creation Failed : Booking number already taken",
      });

    if (payment_type === "full" && Number(paid_amount) !== Number(total_amount))
      return res.status(400).json({
        message:
          "Paid amount and Total amount should be same under payment type full",
      });

    if (Number(paid_amount) > Number(total_amount))
      return res
        .status(400)
        .json({ message: "Paid amount cannot be more than total amount" });

    let new_event = getData(client_data, staff);

    let day_result = await handleDayEvent(
      new_event.date,
      new_event.stage,
      new_event.start_time,
      new_event.end_time,
    );

    if (day_result?.message) {
      return res.status(409).json({ message: day_result.message });
    }

    let event = await Event.create(new_event);
    // await sendEventCreationEmail(event);

    if (client_data.selected) {
      await CancelEventModel.updateOne(
        {
          eventId: client_data.selected,
        },
        { $set: { reScheduledEventId: event._id } },
      );
    }

    let event_date = await EventDate.findOne({
      date: {
        $gte: new Date(`${new_event.date}T00:00:00.000Z`),
        $lte: new Date(`${new_event.date}T23:59:59.000Z`),
      },
    });
    if (!event_date) {
      event_date = await EventDate.create({
        ...day_result,
        blocks: [],
        events: [event._id],
        date: new Date(`${new_event.date}T00:00:00.000Z`),
      });
    } else {
      event_date.events.push(event._id);
      event_date.mainhall_stat = day_result.mainhall_stat;
      event_date.minihall_stat = day_result.minihall_stat;
      event_date.mainhall_block_stat = day_result.mainhall_block_stat;
      event_date.minihall_block_stat = day_result.minihall_block_stat;
      await event_date.save();
    }

    if (event_date.blocks.length) {
      await Promise.all(
        event_date.blocks.map((item) =>
          Block.updateOne(
            {
              _id: item,
              start_time: {
                $lte:
                  new Date(new_event.end_time).getTime() + 2 * 1000 * 60 * 60,
              },
              end_time: {
                $gte:
                  new Date(new_event.start_time).getTime() - 2 * 1000 * 60 * 60,
              },
            },
            { $set: { status: "freeze" } },
          ),
        ),
      );
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

    let matching_date = (
      await EventDate.aggregate([
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
                cond: { $ne: ["$$event.cancelled", true] },
              },
            },
          },
        },
        {
          $addFields: {
            blocks: {
              $filter: {
                input: "$blocks",
                as: "block",
                cond: { $ne: ["$$block.status", "freeze"] },
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
            "events._id": 1,
            "events.date": 1,
            "events.stage": 1,
            "events.start_time": 1,
            "events.end_time": 1,
            "events.contact_details": 1,
            "events.createdAt": 1,
            "blocks._id": 1,
            "blocks.start_time": 1,
            "blocks.end_time": 1,
            "blocks.stage": 1,
          },
        },
      ])
    )[0];

    if (!matching_date)
      return res
        .status(404)
        .json({ message: "Updation Failed : Event Date not found" });

    let matching_event = matching_date.events.find(
      (ev) => ev._id.toString() === id,
    );

    if (!matching_event)
      return res
        .status(404)
        .json({ message: "Updation Failed : Event not found" });

    if (
      req.userRole === "staff" &&
      Date.now() >= new Date(matching_event.createdAt).setHours(24, 0, 0, 0)
    )
      return res
        .status(403)
        .json({ message: "Updation Failed : Permission Denied" });

    let date_events = matching_date.events.filter(
      (ev) => ev._id.toString() !== id,
    );

    let event_start_time = start_time || matching_event.start_time;
    let event_end_time = end_time || matching_event.end_time;
    let event_stage = stage || matching_event.stage;

    req.body.contact_details = matching_event.contact_details;

    Object.entries(req.body).forEach(([key, value]) => {
      if (
        ["booker_name", "address", "phone_number_1", "phone_number_2"].includes(
          key,
        )
      ) {
        req.body.contact_details[key] = value;
        delete req.body[key];
      }
    });

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
            new Date(ev.start_time).getTime() - 2 * 60 * 60 * 1000,
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
        matching_event.date,
        matching_date.blocks,
        matching_date.mainhall_block_stat,
        matching_date.minihall_block_stat,
      );

      console.log("update stat result:", result);
      await EventDate.updateOne({ _id: matching_date._id }, { $set: result });
    }
    let result = await Event.updateOne({ _id: id }, { $set: req.body });
    console.log("update result:", result);
    return res.json({ message: "Updation Successfull" });
  } catch (error) {
    console.log("error:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const getEvent = async (req, res) => {
  let { id } = req.params;
  try {
    if (req.query.date) {
      let event = (
        await Event.aggregate([
          { $match: { _id: new mongoose.Types.ObjectId(id) } },
          {
            $addFields: {
              booker_name: "$contact_details.booker_name",
              address: "$contact_details.address",
              phone_number_1: "$contact_details.phone_number_1",
              phone_number_2: "$contact_details.phone_number_2",
              crossedMidnight: {
                $gte: [
                  "$$NOW",
                  {
                    $dateAdd: {
                      startDate: {
                        $dateTrunc: {
                          date: "$createdAt",
                          unit: "day",
                        },
                      },
                      unit: "day",
                      amount: 1,
                    },
                  },
                ],
              },
            },
          },
          {
            $project: {
              payment: 0,
              timeline: 0,
              contact_details: 0,
            },
          },
        ])
      )[0];
      return res.json({ event });
    }
    let event = (
      await Event.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id) } },
        {
          $addFields: {
            crossedMidnight: {
              $gte: [
                "$$NOW",
                {
                  $dateAdd: {
                    startDate: {
                      $dateTrunc: {
                        date: "$createdAt",
                        unit: "day",
                      },
                    },
                    unit: "day",
                    amount: 1,
                  },
                },
              ],
            },
          },
        },
      ])
    )[0];
    return res.json({ event });
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

export const getSearch = async (req, res) => {
  try {
    let query_words = req.query.query.trim().split(/\s+/);
    let query_condition = query_words.map((word) => {
      let or = [
        { event_name: { $regex: word, $options: "i" } },
        { "contact_details.booker_name": { $regex: word, $options: "i" } },
      ];
      if (!Number.isNaN(Number(word)))
        or.push({ booking_number: Number(word) });
      return { $or: or };
    });
    let events = await Event.aggregate([
      {
        $match: {
          $and: query_condition,
        },
      },
      {
        $project: {
          _id: 1,
          booking_number: 1,
          event_name: 1,
          event: 1,
          booker_name: "$contact_details.booker_name",
        },
      },
    ]);
    return res.json({ events });
  } catch (error) {
    console.log("Event searching failed:", error.message);
    return res.status(500).json({ message: error.message });
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
      "payment.remaining_amount",
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
      "addon_charges -_id",
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

export const cancelEvent = async (req, res) => {
  try {
    const { id } = req.params;
    let event = await Event.findById(id).select(
      "_id stage date booking_number payment",
    );
    let { username } = await User.findOne({ _id: req.userId }).select(
      "username",
    );
    let stat = await getCancellationStat(event);

    await Event.findByIdAndUpdate(id, { $set: { cancelled: true } });
    let cancelled_data = await CancelEventModel.create({
      eventId: id,
      ...req.body,
      cancelledBy: username,
    });
    let message_utils = {
      booking_number: event.booking_number,
      event_date: event.date,
      reScheduled: cancelled_data.reScheduled,
      reason_note: cancelled_data.reasonNote || "Not Provided",
      author: cancelled_data.cancelledBy,
      total_event_amount: event.payment.total_amount,
      client_paid_amount: event.payment.payment_timeline.reduce(
        (total, item) => {
          if (item.payment_type !== "discount") total += item.paid_amount;
          return total;
        },
        0,
      ),
      refunded_amount: cancelled_data.refundAmount,
    };
    // await sendEventCancellationEmail(message_utils);
    await EventDate.updateOne({ date: new Date(event.date) }, { $set: stat });
    return res.json({ message: "Event Cancelled" });
  } catch (error) {
    console.log("cancellation error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getCancelledEvents = async (req, res) => {
  try {
    let cancelled_events = await CancelEventModel.aggregate([
      {
        $match: {
          reScheduled: true,
          $or: [
            { reScheduledEventId: { $exists: false } },
            { reScheduledEventId: null },
          ],
        },
      },
      {
        $lookup: {
          from: "events",
          localField: "eventId",
          foreignField: "_id",
          as: "event",
        },
      },
      { $unwind: "$event" },
      {
        $project: {
          "event._id": 1,
          "event.booking_number": 1,
          "event.date": 1,
          "event.event": 1,
          "event.event_name": 1,
          booker_name: "$event.contact_details.booker_name",
          number_1: "$event.contact_details.phone_number_1",
          number_2: "$event.contact_details.phone_number_2",
        },
      },
    ]);
    return res.json({ events: cancelled_events });
  } catch (error) {
    console.log("failed to fetch cancelled events:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const getEventCancelData = async (req, res) => {
  try {
    let { id: eventId } = req.params;
    let cancel_data = (
      await CancelEventModel.aggregate([
        { $match: { eventId: new mongoose.Types.ObjectId(eventId) } },
        {
          $lookup: {
            from: "events",
            localField: "reScheduledEventId",
            foreignField: "_id",
            as: "reScheduledEvent",
          },
        },
        {
          $unwind: {
            path: "$reScheduledEvent",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            refundAmount: 1,
            reScheduled: 1,
            reasonNote: 1,
            createdAt: 1,
            cancelledBy: 1,
            "reScheduledEvent._id": 1,
            "reScheduledEvent.date": 1,
            "reScheduledEvent.booking_number": 1,
          },
        },
      ])
    )[0];
    if (!cancel_data)
      return res
        .status(404)
        .json({ message: "Requested cancelled event data not found" });

    return res.json({ data: cancel_data });
  } catch (error) {
    console.log("failed to fetch cancelled event data:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const getSourceDetail = async (req, res) => {
  try {
    let source_data = (
      await CancelEventModel.aggregate([
        {
          $match: {
            reScheduledEventId: new mongoose.Types.ObjectId(
              req.params.reScheduledEventId,
            ),
          },
        },
        {
          $lookup: {
            from: "events",
            localField: "eventId",
            foreignField: "_id",
            as: "data",
          },
        },
        { $unwind: "$data" },
        {
          $addFields: {
            booking_number: "$data.booking_number",
          },
        },
        {
          $project: {
            booking_number: 1,
          },
        },
      ])
    )[0];
    console.log("source data:", source_data);
    return res.json({ source_data: source_data?.booking_number || null });
  } catch (error) {
    console.log("failed to fetch the source detail:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const getEventsExcel = async (req, res) => {
  let { start_date, end_date } = req.query;
  try {
    let events = await Event.aggregate([
      {
        $match: {
          start_time: {
            $gte: new Date(`${start_date}T00:00:00.000Z`),
            $lte: new Date(`${end_date}T23:59:59.999Z`),
          },
        },
      },
      {
        $lookup: {
          from: "cancelevents",
          localField: "_id",
          foreignField: "eventId",
          as: "cancel_data",
        },
      },
      {
        $unwind: {
          path: "$cancel_data",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          reScheduled: {
            $cond: [
              {
                $and: [
                  { $eq: ["$cancel_data.reScheduled", true] },
                  { $ifNull: ["$cancel_data.reScheduledEventId", false] },
                ],
              },
              true,
              false,
            ],
          },
        },
      },
      {
        $project: { cancel_data: 0 },
      },
    ]);

    if (!events.length)
      return res.status(404).json({
        message: "Excel creation cancelled : No event found on this date range",
      });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Events");
    worksheet.columns = [
      { header: "Booking Number", key: "booking_number", width: 15 },
      { header: "Date", key: "date", width: 15 },
      { header: "Start Time", key: "start_time", width: 15 },
      { header: "End Time", key: "end_time", width: 15 },
      { header: "Customer", key: "booker_name", width: 20 },
      { header: "Mobile Number", key: "phone_number", width: 30 },
      { header: "Address", key: "address", width: 40 },
      { header: "Hall", key: "hall", width: 15 },
      { header: "Event", key: "event", width: 15 },
      { header: "Total Amount", key: "total_amount", width: 15 },
      { header: "Paid Amount", key: "paid_amount", width: 15 },
      { header: "Discount Amount", key: "discount_amount", width: 15 },
      { header: "Balance", key: "balance_amount", width: 15 },
      { header: "Event Status", key: "event_status", width: 15 },
    ];

    events.forEach((event) => {
      worksheet.addRow({
        booking_number: event.booking_number,
        date: event.date,
        start_time: dayjs(event.start_time).format("hh:mm a"),
        end_time: dayjs(event.end_time).format("hh:mm a"),
        booker_name: event.contact_details.booker_name,
        phone_number: `${event.contact_details.phone_number_1}, ${event.contact_details.phone_number_2}`,
        address: event.contact_details.address,
        hall: event.stage
          .split("_")
          .map((word) => word[0].toUpperCase() + word.slice(1))
          .join(" "),
        event: event.event,
        total_amount: event.payment.total_amount,
        paid_amount: event.payment.payment_timeline.reduce((total, item) => {
          if (item.payment_type !== "discount") total += item.paid_amount;
          return total;
        }, 0),
        discount_amount: event.payment.payment_timeline.reduce(
          (total, item) => {
            if (item.payment_type === "discount") total += item.paid_amount;
            return total;
          },
          0,
        ),
        balance_amount: event.payment.remaining_amount,
        event_status: event.reScheduled
          ? "Rescheduled"
          : event.cancelled
            ? "Cancelled"
            : new Date() > event.end_time
              ? "Completed"
              : "Pending",
      });
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=events-report.xlsx",
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.log("failed to create events excel:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const getPaymentsExcel = async (req, res) => {
  try {
    let { start_date, end_date } = req.query;
    let convertToUpperCase = (value) =>
      value
        .split(" ")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" ");
    let events = await Event.aggregate([
      {
        $match: {
          start_time: {
            $gte: new Date(`${start_date}T00:00:00.000Z`),
            $lte: new Date(`${end_date}T23:59:59.999Z`),
          },
        },
      },
      {
        $project: {
          date: 1,
          booking_number: 1,
          customer_name: "$contact_details.booker_name",
          payment: 1,
        },
      },
    ]);
    console.log("events:", events);
    if (!events.length)
      return res.status(404).json({
        message: "Excel creation cancelled : No event found on this date range",
      });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Payments");
    worksheet.columns = [
      { header: "Payment Date", key: "date", width: 15 },
      { header: "Booking Number", key: "booking_number", width: 15 },
      { header: "Customer Name", key: "customer_name", width: 20 },
      { header: "Event Date", key: "event_date", width: 15 },
      { header: "Payment Type", key: "payment_type", width: 15 },
      { header: "Payment Mode", key: "payment_mode", width: 15 },
      { header: "Amount", key: "amount", width: 15 },
      { header: "Remarks", key: "remarks", width: 25 },
    ];

    events.forEach((event) => {
      event.payment.payment_timeline.forEach((payment) => {
        worksheet.addRow({
          date: dayjs(payment.timeline[0].date).format("DD-MM-YYYY"),
          booking_number: event.booking_number,
          customer_name: convertToUpperCase(event.customer_name),
          event_date: event.date,
          payment_type: convertToUpperCase(payment.payment_type),
          payment_mode:
            payment?.payment_mode
              .split("_")
              .map((word) => word[0].toUpperCase() + word.slice(1))
              .join(" ") ?? "-",
          amount: payment.paid_amount,
        });
      });
    });
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=payments-report.xlsx",
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.log("failed to create payments excel:", error.message);
    return res.status(500).json({ message: error.message });
  }
};
