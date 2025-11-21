import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate, useSearchParams } from "react-router-dom";
import inputValidation from "../utils/inputValidation";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";

const useEvents2 = (eventId = null) => {
  let {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { dirtyFields, errors },
  } = useForm({
    defaultValues: {
      booking_number: "",
      stage: "",
      event: "",
      event_name: "",
      start_time: "",
      end_time: "",
      booker_name: "",
      address: "",
      phone_number_1: "",
      phone_number_2: "",
      total_amount: "",
      payment_type: "",
      paid_amount: "",
    },
  });
  let [searchParams] = useSearchParams();
  let date = dayjs(searchParams.get("date")).format("YYYY-MM-DD");
  let [dateInfo, setDateInfo] = useState(null);

  let [stat, setStat] = useState("idle");
  let navigate = useNavigate();
  let BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    let getData = async () => {
      try {
        let response = await fetch(
          `${BACKEND_URL}/api/event-dates?date=${date}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        let result = await response.json();
        if (!response.ok) throw new Error(result.message);
        setDateInfo(result.date_result);
      } catch (error) {
        console.log("event management fetch error:", error.message);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    let getUpdateInfo = async () => {
      try {
        let response = await fetch(
          `${BACKEND_URL}/api/events/${eventId}?date=${date}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        let result = await response.json();
        if (!response.ok) throw new Error(result.message);
        reset({
          ...result.event,
          total_amount: "",
          payment_type: "",
          paid_amount: "",
        });
      } catch (error) {
        console.log("error:", error.message);
      }
    };
    if (eventId) {
      getUpdateInfo();
    }
  }, []);

  const submitEvent = async (values) => {
    try {
      if (!eventId) {
        values.start_time = dayjs(
          `${date} ${values.start_time}`,
          "YYYY-MM-DD HH:mm"
        ).format();
        values.end_time = dayjs(
          `${date} ${values.end_time}`,
          "YYYY-MM-DD HH:mm"
        ).format();
        values.date = date;

        setStat("loading");
        let response = await fetch(`${BACKEND_URL}/api/events`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
          credentials: "include",
        });
        let result = await response.json();
        setStat("idle");
        if (response.status == 409) {
          toast.error(result.message);
        } else if (!response.ok) throw new Error(result.message);
        else {
          toast.success(result.message);
          navigate("/admin/events");
        }
      }
    } catch (error) {
      console.log("create or update error:", error.message);
    }
  };

  return {
    dateInfo,
    register,
    watch,
    handleSubmit,
    errors,
    submitEvent,
    stat,
  };
};

export default useEvents2;
