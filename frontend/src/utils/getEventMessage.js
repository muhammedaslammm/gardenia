import dayjs from "dayjs";

const getEventMessage = (mainhall_stat, minihall_stat, events, date) => {
  let message = { text: "", color: "#C79A00", bg: "#fef9c2" };
  let isPast = date && date.isBefore(dayjs(), "day");
  let isToday = date && date.isSame(dayjs(), "day");

  if (!mainhall_stat && !minihall_stat) {
    message.text =
      "Booking not available : Main hall and Mini hall not available on this date.";
    message.color = "#9f0712";
    message.bg = "#ffe2e2";
  } else if (mainhall_stat === 1 && minihall_stat === 1) {
    message.text =
      "Booking Available : Main hall and Mini hall available on this date";
    message.color = "#016630";
    message.bg = "#dcfce7";
  } else if (!mainhall_stat && minihall_stat === 3) {
    let time = dayjs(events[0].end_time).add(120, "minutes").format("hh:mm a");
    message.text = `Booking Available : Only Mini Hall - after ${time}`;
  } else if (!mainhall_stat && minihall_stat === 2) {
    let time = dayjs(events[0].start_time)
      .subtract(120, "minutes")
      .format("hh:mm a");
    message.text = `Booking Available : Only Mini Hall - before ${time}`;
  } else if (mainhall_stat === 2 && minihall_stat === 2) {
    let time = dayjs(events[0].start_time)
      .subtract(120, "minutes")
      .format("hh:mm a");
    message.text = `Booking Available : Main Hall or Mini Hall - before ${time}`;
  } else if (mainhall_stat === 3 && minihall_stat === 3) {
    let time = dayjs(events[0].end_time).add(120, "minutes").format("hh:mm a");
    message.text = `Booking Available : Main Hall or Mini Hall - after ${time}`;
  }

  return message;
};

export default getEventMessage;
