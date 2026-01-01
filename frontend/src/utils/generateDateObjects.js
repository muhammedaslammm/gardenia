import dayjs from "dayjs";

const generateDateObjects = (year, month, eventDates) => {
  let monthStart = dayjs(new Date(year, month, 1));
  let monthEnd = dayjs(new Date(year, month + 1, 0));

  let calendarStart = monthStart.startOf("week");
  let calendarEnd = monthEnd.endOf("week");

  let dates = [];
  let current = calendarStart;

  while (current <= calendarEnd) {
    let currentISO = current.format("YYYY-MM-DD");
    const matching_date = eventDates.find(
      (e) => dayjs(e.date).format("YYYY-MM-DD") === currentISO
    );

    dates.push({
      date: dayjs(currentISO),
      events: matching_date?.events || 0,
      block: matching_date?.block || false,
    });

    current = current.add(1, "day");
  }

  return dates;
};

export default generateDateObjects;
