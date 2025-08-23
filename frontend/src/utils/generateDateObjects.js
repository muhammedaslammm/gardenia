import { weekDays, months } from "../data/days";
import getDateString from "./getDateString";
import getDatestring from "./getDateString";

const generateDateObjects = (year, month, events) => {
  let dates = [];
  let today = new Date();
  let monthFirstDate = new Date(year, month, 1);
  let monthLastDate = new Date(year, month + 1, 0);

  let calendarStart = new Date(monthFirstDate);
  calendarStart.setDate(calendarStart.getDate() - calendarStart.getDay());

  let calendarEnd = new Date(monthLastDate);
  calendarEnd.setDate(calendarEnd.getDate() + (6 - calendarEnd.getDay()));

  let current = new Date(calendarStart);

  while (current <= calendarEnd) {
    const current_iso_date = getDateString(current);

    const dateEvents = events.filter(
      (event) => current_iso_date === event.event_date.iso_date
    );

    dates.push({
      date: new Date(current),
      iso_date: current_iso_date,
      day: current.getDate(),
      month: current.getMonth(),
      year: current.getFullYear(),
      weekday: weekDays[current.getDay()],
      monthname: months[current.getMonth()].head,
      isToday: isCurrentDate(today, current),
      isMonth: current.getMonth() === month,
      past:
        current.toLocaleDateString("en-US") < today.toLocaleDateString("en-US"),
      events: dateEvents,
    });
    current.setDate(current.getDate() + 1);
  }

  function isCurrentDate(d1, d2) {
    return (
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    );
  }
  return dates;
};

export default generateDateObjects;
