import dayjs from "dayjs";

const generateDateObjects = (year, month, eventDates) => {
  let monthStart = dayjs(new Date(year, month, 1));
  let calendarStart = monthStart.startOf("week");

  let dates = [];
  let current = calendarStart;
  let totalCells = 42;

  for (let i = 0; i < totalCells; i++) {
    let currentISO = current.format("YYYY-MM-DD");
    const matching_date = eventDates.find(
      (e) => dayjs(e.date).format("YYYY-MM-DD") === currentISO
    );

    dates.push({
      date: dayjs(currentISO),
      events: matching_date?.events || 0,
      cancelled: matching_date?.cancelled || 0,
      block: matching_date?.block || false,
    });

    current = current.add(1, "day");
  }

  return dates;
};

export default generateDateObjects;
