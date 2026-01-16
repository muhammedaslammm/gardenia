import { useState, useEffect } from "react";
import generateDateObjects from "../utils/generateDateObjects.js";
import { toast } from "sonner";
import dayjs from "dayjs";

const useEvents = () => {
  const [eventDates, setEventDates] = useState([]);
  const [selectedDate, setselectedDate] = useState(dayjs());
  const [year, setYear] = useState(selectedDate.year());
  const [month, setMonth] = useState(selectedDate.month());
  const [selectedDateDetails, setselectedDateDetails] = useState({});

  const dates = generateDateObjects(year, month, eventDates);

  const [modal, setModal] = useState(false);
  const [modalButtonStat, setModalButtonStat] = useState("idle");
  const [deleteData, setDeleteData] = useState({});

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  let [datesLoading, setDatesLoading] = useState(false);
  let [detailsLoading, setDetailsLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setDatesLoading(true);
        const response = await fetch(
          `${BACKEND_URL}/api/event-dates?month=${month + 1}&year=${year}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        setDatesLoading(false);
        const result = await response.json();
        if (!response.ok) throw new Error(result.message);
        setEventDates(result.dates);
      } catch (error) {
        console.error(error.message);
        toast.error("Events failed to load.");
      }
    };
    fetchEvents();
  }, [month, year]);

  // useEffect(() => {
  //   getDateDetails();
  // }, [eventDates]);

  useEffect(() => {
    setMonth(selectedDate.month());
    setYear(selectedDate.year());
    getDateDetails();
  }, [selectedDate]);

  let getDateDetails = async () => {
    try {
      setDetailsLoading(true);
      let response = await fetch(
        `${BACKEND_URL}/api/events-dates/${dayjs(selectedDate).format(
          "YYYY-MM-DD"
        )}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      setDetailsLoading(false);
      let result = await response.json();
      if (!response.ok) throw new Error(result.message);
      let data = result.data;

      let details = {
        date: data?.date ? dayjs(data?.date) : dayjs(selectedDate),
        events: data?.events || [],
        block: data?.block || null,
        mainhall_stat: data?.mainhall_stat ?? 1,
        minihall_stat: data?.minihall_stat ?? 1,
        block_stat: data?.block_stat ?? 1,
      };
      console.log("details:", details);
      setselectedDateDetails(details);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDate = (d) => {
    setYear(d.date.year());
    setMonth(d.date.month());
    setselectedDate(d.date);
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
    datesLoading,
    detailsLoading,
    selectedDate,
    setselectedDate,
    handleDate,
    date: {
      month,
      year,
      setMonth,
      setYear,
    },
    month: {
      incrementMonth,
      decrementMonth,
    },
    dateDetails: selectedDateDetails,
    refetchData: getDateDetails,
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
