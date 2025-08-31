const getMinutes = (timeString) => {
  const [hour, minutes] = timeString.split(":").map(Number);
  return hour * 60 + minutes;
};

const getEventSlot = (
  newevent_start,
  newevent_end,
  newevent_iso_date,
  newstage,
  events,
  id = null
) => {
  const neweventstart_minutes = getMinutes(newevent_start);
  const neweventend_minutes = getMinutes(newevent_end);

  const match = events.find((event) => {
    let { start_time, end_time, iso_date } = event.event_date;
    let eventstartminutes = getMinutes(start_time);
    let eventendminutes = getMinutes(end_time);

    if (event._id === id) return false;
    if (
      iso_date === newevent_iso_date &&
      event.stage === newstage &&
      neweventstart_minutes < eventendminutes &&
      neweventend_minutes > eventstartminutes
    )
      return event;
  });
  console.log("matching event:", match);

  return match;
};

export default getEventSlot;
