import useEvents from "../hooks/useEvents";

const generateDateObjects = (year, month, events) => {
  let dates = [];
  let today = new Date();
  let monthFirstDate = new Date(year, month, 1);
  let monthLastDate = new Date(year, month + 1, 0);
  let { isCurrentDate } = useEvents();
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let calendarStart = new Date(monthFirstDate);
  calendarStart.setDate(calendarStart.getDate() - calendarStart.getDay());

  let calendarEnd = new Date(monthLastDate);
  calendarEnd.setDate(calendarEnd.getDate() + (6 - calendarEnd.getDay()));

  let current = new Date(calendarStart);

  while (current <= calendarEnd) {
    const iso = current.toISOString().split("T")[0];
    const dateEvents = events.filter((event) => event.date === iso);
    dates.push({
      fullDate: new Date(current),
      isoDate: iso,
      day: current.getDate(),
      month: current.getMonth(),
      year: current.getFullYear(),
      weekday: weekdays[current.getDay()],
      isToday: isCurrentDate(today, current),
      isMonth: current.getMonth() === month,
      isPast:
        current <
        new Date(today.getFullYear(), today.getMonth(), today.getDate()),
      isFuture:
        current >
        new Date(today.getFullYear(), today.getMonth(), today.getDate()),
      events: dateEvents,
    });
    current.setDate(current.getDate() + 1);
  }
  return dates;
};

export default generateDateObjects;
