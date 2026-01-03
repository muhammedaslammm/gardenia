import dayjs from "dayjs";

const getBlockMessage = (block_stat, events, date) => {
  events = events.filter((ev) => !ev.cancelled);
  let message = { text: "", color: "#1c398e", bg: "#dbeafe" };
  let isPast = date && date.isBefore(dayjs(), "day");
  let isToday = date && date.isSame(dayjs(), "day");

  if (isToday || isPast || block_stat === 0) {
    message.blocked = true;
    message.text = "Holding Blocked : Date is not available for any holdings.";
    message.bg = "#ffe2e2";
    message.color = "#9f0712";
  } else if (block_stat === 1) {
    message.text = "This date is available for holding a potential booking.";
  } else {
    message.text =
      "This date has a slot available to hold a potential booking.";
  }

  return message;
};

export default getBlockMessage;
