import dayjs from "dayjs";

const getBlockModalMessage = (block_stat, events) => {
  let element = undefined;
  events = events.filter((ev) => !ev.cancelled);

  const getElement = (time = "") => (
    <div>
      This date has a slot available{" "}
      {time && <span className="font-semibold">{time}</span>} to hold for a
      potential booking.
    </div>
  );

  const getNoElement = () => (
    <div>Couldn't hold any time slot for a potential booking on this date.</div>
  );

  if (block_stat === 0) element = getNoElement();
  else if (block_stat === 1) element = getElement();
  else if (block_stat === 2 || block_stat === 3) {
    if (block_stat === 2) {
      let time = dayjs(events[0].start_time)
        .subtract(120, "minutes")
        .format("hh:mm a");
      element = getElement(`before ${time}`);
    } else if (block_stat === 3) {
      let time = dayjs(events[0].end_time)
        .add(120, "minutes")
        .format("hh:mm a");
      element = getElement(`after ${time} `);
    }
  }
  return element;
};

export default getBlockModalMessage;
