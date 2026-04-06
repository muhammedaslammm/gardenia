import dayjs from "dayjs";

const getBlockMessage = (
  events,
  blocks,
  mainhall_block_stat,
  minihall_block_stat,
  date,
) => {
  let existing_item = [...events.filter((ev) => !ev.cancelled), ...blocks][0];

  let message = { text: "", color: "#1c398e", bg: "#dbeafe" };
  let isPast = date && date.isBefore(dayjs(), "day");
  let isToday = date && date.isSame(dayjs(), "day");

  console.log("existing item:", existing_item);
  if (
    isToday ||
    isPast ||
    (mainhall_block_stat === 0 && minihall_block_stat === 0)
  ) {
    message.blocked = true;
    message.text =
      "Holding stage for events not available for any halls on this date.";
    message.bg = "#ffe2e2";
    message.color = "#9f0712";
  } else if (mainhall_block_stat === 1 && minihall_block_stat === 1) {
    message.text =
      "Holding stage for events available for both Main and Mini Hall.";
  } else if (!mainhall_block_stat && minihall_block_stat === 2) {
    message.text = `Holding stage for events available only in Mini hall before ${dayjs(existing_item?.start_time).subtract(120, "minutes").format("hh:mm a")}`;
  } else if (!mainhall_block_stat && minihall_block_stat === 3) {
    message.text = `Holding stage for events only available in Mini hall after ${dayjs(existing_item?.end_time).add(120, "minutes").format("hh:mm a")}`;
  } else if (mainhall_block_stat === 2 && minihall_block_stat === 2) {
    message.text = `Holding stage for events in both Main hall and Mini Hall available - before ${dayjs(existing_item?.start_time).subtract(120, "minutes").format("hh:mm a")}`;
  } else if (mainhall_block_stat === 3 && minihall_block_stat === 3) {
    message.text = `Holding stage for events in both Main hall and Mini Hall available - after ${dayjs(existing_item?.end_time).add(120, "minutes").format("hh:mm a")}`;
  }

  return message;
};

export default getBlockMessage;
