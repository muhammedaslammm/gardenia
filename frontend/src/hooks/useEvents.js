import { useEffect, useState } from "react";
import { months, weekDays } from "../data/days";
import generateDateObjects from "../utils/generateDateObjects.js";

const useEvents = () => {
  const today = new Date();
  const [events, setEvents] = useState([]);
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const [selectedDate, setSelectedDate] = useState(null);
  const dateString = `${months[month].head} ${year}, ${today.getDate()} ${
    weekDays[today.getDay()]
  }`;
  const dates = generateDateObjects(year, month, events);

  useEffect(() => {
    let match = dates.find((d) => {
      if (d.isoDate === today.toISOString().split("T")[0]) {
        console.log(d.isoDate);
        return d;
      }
    });
    setSelectedDate((prev) => match);
  }, []);

  return {
    dates,
    selectedDate,
    dateString,
  };
};

export default useEvents;
