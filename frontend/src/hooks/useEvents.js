import { useContext, useEffect, useState } from "react";
import { months, weekDays } from "../data/days";
import generateDateObjects from "../utils/generateDateObjects.js";
import { toast } from "sonner";
import getDateString from "../utils/getDateString.js";
import { AuthContext } from "../contexts/AuthContext.jsx";
import getEventSlot from "../utils/getEventSlot.js";

const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [eventID, setEventID] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentDateDetails, setCurrentDateDetails] = useState(null);
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth());

  const dates = generateDateObjects(year, month, events);
  
  const initialEventTitle = { event: "", stage: "", event_title: "" };
  const initialEventTime = {
    iso_date: currentDateDetails?.iso_date,
    start_time: "",
    end_time: "",
  };
  const initialContact = {
    contract_number: "",
    phone_number: "",
  };

  const dateString = `${months[month].head} ${year}`;

  const [eventTitle, setEventTitle] = useState(initialEventTitle);
  const [eventTime, setEventTime] = useState(initialEventTime);
  const [contact, setContact] = useState(initialContact);
  const [showForm, setShowForm] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalButtonStat, setModalButtonStat] = useState("idle");
  const [deleteData, setDeleteData] = useState({});
  const [update, setUpdate] = useState(false);
  const [buttonState, setButtonState] = useState("idle");
  const [errors, setErrors] = useState({});

  const { user } = useContext(AuthContext);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/events`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        setEvents(data.events);
      } catch (error) {
        console.error(error.message);
        toast.error("Events failed to load.");
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    let match = dates.find((d) => d.iso_date === getDateString(currentDate));
    console.log("match:", match);
    setCurrentDate(match.date);
    setCurrentDateDetails(match);
  }, [events]);

  useEffect(() => {
    if (currentDateDetails) {
      setEventTime((prev) => ({
        ...prev,
        iso_date: currentDateDetails.iso_date,
      }));
    }
  }, [currentDateDetails]);

  useEffect(() => {
    setMonth(currentDate.getMonth());
    setYear(currentDate.getFullYear());
  }, [currentDate]);

  const handleDate = (date) => {
    setYear(date.year);
    setMonth(date.month);
    setCurrentDate(date.date);
    setCurrentDateDetails(date);
    setShowForm(false);
  };

  const incrementMonth = () => {
    setCurrentDate((prevDate) => {
      let new_date = new Date(prevDate);
      new_date.setMonth(new_date.getMonth() + 1);
      return new_date;
    });
  };

  const decrementMonth = () => {
    setCurrentDate((prevDate) => {
      let new_date = new Date(prevDate);
      new_date.setMonth(new_date.getMonth() - 1);
      return new_date;
    });
  };

  const handleSlideinform = () => {
    if (update) {
      setEventTitle(initialEventTitle);
      setEventTime(initialEventTime);
      setContact(initialContact);
      setEventID(null);
      setUpdate(false);
    }
    setShowForm(true);
  };

  const setFormDataforUpdate = (event) => {
    setUpdate(true);
    setEventID(event._id);
    setErrors({});
    setEventTitle((prev) => ({
      ...prev,
      event: event.event,
      stage: event.stage,
      event_title: event.event_title,
    }));
    setEventTime((prev) => ({
      ...prev,
      iso_date: event.event_date.iso_date,
      start_time: event.event_date.start_time,
      end_time: event.event_date.end_time,
    }));
    setContact((prev) => ({
      ...prev,
      contract_number: event.contract_number,
      phone_number: event.phone_number,
    }));
    setShowForm(true);
  };

  const handleEventForm = (event) => {
    let { name, value } = event.target;
    if (["event", "stage", "event_title"].includes(name)) {
      setEventTitle((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else if (["start_time", "end_time"].includes(name)) {
      setEventTime((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else if (["contract_number", "phone_number"].includes(name)) {
      setContact((prev) => {
        if (name === "phone_number" && value.trim().length > 10)
          value = value.slice(0, -1);
        return {
          ...prev,
          [name]: value,
        };
      });
    }
    if (["stage", "start_time", "end_time"].includes(name)) {
      setErrors((prev) => {
        console.log("prev errors:", prev);
        let { slot, ...rest } = prev;
        return rest;
      });
    }
    setErrors((prevErrors) => {
      const { [name]: bin, ...rest } = prevErrors;
      return rest;
    });
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
      setEvents((prev) => {
        return prev.filter((event) => event._id !== id);
      });
    } catch (error) {
      toast.error("Failed to Delete the event");
      setModalButtonStat("idle");
      setModal(false);
      console.log(error.message);
    }
  };

  const submitEvent = async () => {
    const formErrors = {};
    let formData = {
      ...eventTitle,
      ...eventTime,
      ...contact,
      updated_by: user.userName,
    };
    console.log("form data:", formData);
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "end_time" && value < formData.start_time)
        formErrors[key] = "Invalid Time";
      else if (key === "phone_number" && value.trim().length < 10)
        formErrors[key] = "Invalid Number";
      else if (key === "contract_number") {
        if (!value.trim()) formErrors[key] = "Required";
        if (eventID) {
          const matching_event = events.find((event) => {
            if (event._id !== eventID && event.contract_number === value)
              return event;
          });
          if (matching_event) formErrors[key] = "CN Taken";
        } else {
          let matching_event = events.find(
            (event) => event.contract_number === value
          );
          if (matching_event) formErrors[key] = "CN taken";
        }
      } else if (!value.trim()) formErrors[key] = "Required";
      else setErrors({});
    });

    let { start_time, end_time, iso_date, stage } = formData;
    let matching_slot = getEventSlot(
      start_time,
      end_time,
      iso_date,
      stage,
      events,
      eventID
    );

    if (matching_slot)
      formErrors.slot = `Time slot already taken by contract "${matching_slot.contract_number}" for "${matching_slot.event}" in the selected hall.`;
    if (Object.keys(formErrors).length) {
      return setErrors((prevErrors) => {
        let newErrors = { ...prevErrors };
        Object.entries(formErrors).forEach(([key, value]) => {
          newErrors[key] = value;
        });
        return newErrors;
      });
    }
    try {
      let response;
      setButtonState("loading");
      if (update) {
        response = await fetch(`${BACKEND_URL}/api/events/${eventID}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        });
      } else {
        response = await fetch(`${BACKEND_URL}/api/events`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        });
      }

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      if (data?.update) {
        setEvents((prev) => {
          return prev.map((event) => {
            if (event._id === data.event._id) return data.event;
            return event;
          });
        });
        setUpdate(false);
        setEventID(null);
      } else setEvents((prev) => [...prev, data.event]);

      setButtonState("idle");
      setEventTitle(initialEventTitle);
      setEventTime(initialEventTime);
      setContact(initialContact);
      setShowForm(false);
    } catch (error) {
      console.error(error.message);
      toast.error("Event Creation Failed");
    }
  };

  return {
    dates,
    currentDate,
    dateString,
    handleDate,
    month: {
      incrementMonth,
      decrementMonth,
    },
    dateDetails: currentDateDetails,
    eventFormData: {
      showForm,
      setShowForm,
      eventTitle,
      eventTime,
      contact,
      handleEventForm,
      submitEvent,
      buttonState,
      errors,
      setFormDataforUpdate,
      handleSlideinform,
      update,
    },
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
