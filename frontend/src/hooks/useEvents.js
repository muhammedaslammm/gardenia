import { useState } from "react";
import { months, weekDays } from "../data/days";

const useEvents = () => {
  const today = new Date();
  const [events, setEvents] = useState([]);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [monthName, setMonthName] = useState(months[currentMonth]);
  const currentDate = `${monthName.head} ${currentYear}, ${today.getDate()} ${
    weekDays[today.getDay()]
  }`;

  const isCurrentDate = (date1, date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const handleMonth = (action) => {};

  return { events, isCurrentDate, currentYear, currentMonth, currentDate };
};

export default useEvents;
