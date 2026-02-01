import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate, useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";

const useEvents2 = (eventId = null) => {
  let {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
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
  let [cancelledEvents, setCancelledEvents] = useState(null);
  let [selected, setSelected] = useState(null);

  let [crossedMidnight, setCrossedMidnight] = useState(null);
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
          },
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
    if (!eventId) {
      let getCancelledEvents = async () => {
        try {
          let response = await fetch(`${BACKEND_URL}/api/events/cancel`, {
            method: "GET",
            credentials: "include",
          });
          let result = await response.json();
          if (!response.ok) throw new Error(result.message);
          console.log("cancelled events:", result.events);
          setCancelledEvents(result.events);
        } catch (error) {
          console.log(error.message);
        }
      };
      getCancelledEvents();
    }
  }, []);

  useEffect(() => {
    let getUpdateInfo = async () => {
      try {
        let response = await fetch(
          `${BACKEND_URL}/api/events/${eventId}?date=${date}`,
          {
            method: "GET",
            credentials: "include",
          },
        );
        let result = await response.json();
        if (!response.ok) throw new Error(result.message);
        setCrossedMidnight(result.event.crossedMidnight);
        result.event.start_time = dayjs(result.event.start_time).format(
          "HH:mm",
        );
        result.event.end_time = dayjs(result.event.end_time).format("HH:mm");
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
        let { total_amount, payment_type, paid_amount } = values;
        if (
          payment_type === "full" &&
          Number(paid_amount) !== Number(total_amount)
        ) {
          setError("paid_amount", {
            type: "required",
            message: "error",
          });
          toast.warning(
            "Paid amount and Total amount should be same under payment type full",
          );
          return;
        }
        if (Number(paid_amount) > Number(total_amount)) {
          setError("paid_amount", {
            type: "required",
            message: "error",
          });
          toast.warning("Paid amount cannot be more than total amount");
          return;
        }
        values.start_time = dayjs(
          `${date} ${values.start_time}`,
          "YYYY-MM-DD HH:mm",
        ).format();
        values.end_time = dayjs(
          `${date} ${values.end_time}`,
          "YYYY-MM-DD HH:mm",
        ).format();
        values.date = date;

        if (selected) values.selected = selected.event._id;

        setStat("loading");
        let response = await fetch(`${BACKEND_URL}/api/events`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
          credentials: "include",
        });
        setStat("idle");

        let result = await response.json();

        if (response.status === 400) {
          setError("payment_type", {
            type: "manual",
            message: result.message || "Failed : Detected payment type error",
          });
          toast.warning(result.message);
          return;
        } else if (response.status == 409) {
          setError("booking_number", {
            type: "manual",
            message: "Booking number already taken",
          });
          toast.warning(result.message);
          return;
        } else if (!response.ok) throw new Error(result.message);
        else {
          toast.success(result.message);
          navigate("/admin/events");
        }
      } else {
        let update_data = {};
        let flag = false;
        console.log("dirty fields:", dirtyFields);
        for (let key in dirtyFields) {
          if (!flag) flag = true;
          if (key === "start_time" || key === "end_time") {
            update_data[key] = dayjs(
              `${date} ${values[key]}`,
              "YYYY-MM-DD HH:mm",
            ).format();
          } else {
            update_data[key] = values[key];
          }
        }
        if (flag) {
          setStat("loading");
          let response = await fetch(
            `${BACKEND_URL}/api/events/${eventId}?date=${date}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(update_data),
              credentials: "include",
            },
          );
          setStat("idle");
          let result = await response.json();

          if (response.status === 401) {
            toast.error(
              "Event Updation Restricted : Failed to authenticate the user.",
            );
            return navigate("/admin-login");
          } else if (response.status === 404) {
            return toast.warning(result.message);
          } else if (response.status === 409) {
            return toast.error(result.message);
          } else if (!response.ok) throw new Error(result.message);

          toast.success(result.message);
          navigate(`/admin/events/${eventId}`);
        } else
          toast.warning(
            "Update Dismissed : No fields found with an updated value.",
          );
      }
    } catch (error) {
      console.log("create or update error:", error.message);
    }
  };

  return {
    dateInfo,
    reSchedule: {
      cancelledEvents,
      selected,
      setSelected,
    },
    register,
    watch,
    handleSubmit,
    errors,
    submitEvent,
    stat,
    crossedMidnight,
  };
};

export default useEvents2;
