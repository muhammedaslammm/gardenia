import Event from "../models/eventModel.js";
import User from "../models/userModel.js";

export const createEvent = async (req, res) => {
  try {
    let { date, start_time, end_time, ...rest } = req.body;
    start_time = new Date(`${date}T${start_time}:00`);
    end_time = new Date(`${date}T${end_time}:00`);
    date = new Date(date);

    let daystart = new Date(date.setHours(0, 0, 0, 0));
    let dayend = new Date(date.setHours(23, 59, 59, 999));
    let existing_events = await Event.find({
      date: { $gte: daystart, $lte: dayend },
    });
    if (existing_events.length) {
      return res.status(409).json({
        message:
          "This event cannot be booked. An event is already available on this date",
      });
    }
    let current_user = await User.findOne({ _id: req.userId }); // be cautious - user data
    let remaining_amount = rest.total_amount - rest.paid_amount;
    let dateString = new Date(date).toISOString().split("T")[0];
    let data = {
      booking_number: rest.booking_number,
      date,
      dateString,
      stage: rest.stage,
      event: rest.event,
      start_time,
      end_time,
      event_name: rest.event_name,
      contact_details: {
        booker_name: rest.booker_name,
        address: rest.address,
        phone_number_1: rest.phone_number_1,
        phone_number_2: rest.phone_number_2,
      },
      payment: {
        total_amount: rest.total_amount,
        payment_timeline: [
          {
            payment_type: rest.payment_type,
            paid_amount: rest.paid_amount,
          },
        ],
        remaining_amount,
      },
      timeline: [
        {
          author: current_user.username,
          date: new Date(),
        },
      ],
    };
    let new_event = await Event.create(data);
    console.log("new event:", new_event);
    return res.json({ message: "new event created" });
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
