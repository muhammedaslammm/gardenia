import { useState, useEffect } from "react";
import generateDateObjects from "../utils/generateDateObjects.js";
import { toast } from "sonner";
import dayjs from "dayjs";

const useEvents = () => {
  const [eventDates, setEventDates] = useState([]);
  const [selectedDate, setselectedDate] = useState(dayjs);
  const [year, setYear] = useState(selectedDate.year());
  const [month, setMonth] = useState(selectedDate.month());
  const [selectedDateDetails, setselectedDateDetails] = useState({});

  const dates = generateDateObjects(year, month, eventDates);

  const [modal, setModal] = useState(false);
  const [modalButtonStat, setModalButtonStat] = useState("idle");
  const [deleteData, setDeleteData] = useState({});

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/api/event-dates?month=${
            selectedDate.month() + 1
          }&year=${selectedDate.year()}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const result = await response.json();
        if (!response.ok) throw new Error(result.message);
        setEventDates(result.dates);
      } catch (error) {
        console.error(error.message);
        toast.error("Events failed to load.");
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    let match = dates.find((d) => dayjs(d.date).isSame(selectedDate, "day"));
    console.log("match:", match);
    setselectedDateDetails(match);
  }, [eventDates]);

  useEffect(() => {
    setMonth(selectedDate.month());
    setYear(selectedDate.year());
  }, [selectedDate]);

  const handleDate = (d) => {
    setYear(d.date.year());
    setMonth(d.date.month());
    setselectedDate(d.date);
    setselectedDateDetails(d);
    setShowForm(false);
  };

  const incrementMonth = () => {
    setselectedDate((prev) => prev.add(1, "month"));
  };

  const decrementMonth = () => {
    setselectedDate((prev) => prev.subtract(1, "month"));
  };

  const showModal = (event) => {
    setDeleteData(event);
    setModal(true);
  };
  const cancelModal = () => {
    setDeleteData({});
    setModal(false);
  };

  const deleteEvent = async (id) => {
    try {
      setModalButtonStat("loading");
      const response = await fetch(`${BACKEND_URL}/api/events/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) throw new Error();
      setModalButtonStat("idle");
      setModal(false);
      toast.success("Event Successfully Deleted");
      setEventDates((prev) => {
        return prev.filter((event) => event._id !== id);
      });
    } catch (error) {
      toast.error("Failed to Delete the event");
      setModalButtonStat("idle");
      setModal(false);
      console.log(error.message);
    }
  };

  return {
    dates,
    selectedDate,
    handleDate,
    month: {
      incrementMonth,
      decrementMonth,
    },
    dateDetails: selectedDateDetails,
    eventDelete: {
      modal,
      showModal,
      modalButtonStat,
      cancelModal,
      deleteEvent,
      deleteData,
    },
  };
};

export default useEvents;
