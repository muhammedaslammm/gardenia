import { useMemo, useState } from "react";
import generateDateObjects from "../utils/generateDateObjects";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useCalendar = () => {
  let [bookedDates, setBookedDates] = useState([]);
  let [selectedDate, setSelectedDate] = useState(dayjs);
  let [dateDetails, setDateDetails] = useState({});
  let [month, setMonth] = useState(selectedDate.month());
  let [year, setYear] = useState(selectedDate.year());

  let dates = generateDateObjects(year, month, bookedDates);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  let {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "", email: "", contact_number: "" },
  });

  useEffect(() => {
    const getBookedDates = async () => {
      try {
        let response = await fetch(
          `${BACKEND_URL}/api/event-dates?month=${
            selectedDate.month() + 1
          }&year=${selectedDate.year()}&destination=home`
        );
        let result = await response.json();
        if (!response.ok) throw new Error(result.message);
        setBookedDates(result.dates);
      } catch (error) {
        console.log("calendar date error:", error.message);
      }
    };

    getBookedDates();
  }, [month, year]);

  useEffect(() => {
    let match = dates.find((d) => dayjs(d.date).isSame(selectedDate, "day"));
    setDateDetails(match);
  }, [bookedDates]);

  useEffect(() => {
    setMonth(selectedDate.month());
    setYear(selectedDate.year());
  }, [selectedDate]);

  let daysInMonth = useMemo(() => {
    return dayjs().year(year).month(month).daysInMonth();
  }, [month, year]);

  const incrementMonth = () => setSelectedDate((prev) => prev.add(1, "month"));
  const decrementMonth = () =>
    setSelectedDate((prev) => prev.subtract(1, "month"));

  const selectDate = (d) => {
    setSelectedDate(d.date);
    setDateDetails(d);
    setMonth(d.date.month());
    setYear(d.date.year());
  };

  let [loading, setLoading] = useState(false);

  const submitForm = async (values) => {
    try {
      setLoading(true);
      let response = await fetch(`${BACKEND_URL}/api/enquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values, event_date: selectedDate }),
        credentials: "include",
      });
      setLoading(false);
      let result = await response.json();
      if (!response.ok) throw new Error(result.message);
      toast.success(result.message);
      reset();
    } catch (error) {
      console.log("enquiry creation error:", error.message);
    }
  };

  return {
    dates,
    selectedDate,
    dateDetails,
    incrementMonth,
    decrementMonth,
    selectDate,
    daysInMonth,
    form: {
      register,
      handleSubmit,
      submitForm,
      errors,
      loading,
    },
  };
};

export default useCalendar;
