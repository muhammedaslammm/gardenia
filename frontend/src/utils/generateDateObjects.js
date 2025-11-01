import { weekDays, months } from "../data/days";
import getDateString from "./getDateString";

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
    let current_timeStart = new Date(current);
    current_timeStart.setHours(0, 0, 0, 0);
    let current_timeEnd = new Date(current);
    current_timeEnd.setHours(23, 59, 59, 999);

    const dateEvents = events.filter(
      (event) =>
        event.date >= current_timeStart && event.date <= current_timeEnd
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
      past: current < today,
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
