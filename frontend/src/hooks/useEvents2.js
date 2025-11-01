import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const useEvents2 = () => {
  let [generalData, setGeneralData] = useState({
    booking_number: "",
    stage: "",
    event: "",
    event_name: "",
    start_time: "",
    end_time: "",
  });
  let [contactData, setContactData] = useState({
    booker_name: "",
    address: "",
    phone_number_1: "",
    phone_number_2: "",
  });
  let [paymentData, setPaymentData] = useState({
    total_amount: "",
    payment_type: "",
    paid_amount: "",
  });
  let [stat, setStat] = useState("idle");
  let navigate = useNavigate();
  let BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleInputField = (event) => {
    const { name, value } = event.target;
    if (
      [
        "booking_number",
        "stage",
        "event",
        "event_name",
        "start_time",
        "end_time",
      ].includes(name)
    ) {
      return setGeneralData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    if (
      ["booker_name", "address", "phone_number_1", "phone_number_2"].includes(
        name
      )
    ) {
      return setContactData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    if (["total_amount", "payment_type", "paid_amount"].includes(name)) {
      setPaymentData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const submitEvent = async (event, date) => {
    event.preventDefault();
    try {
      setStat("loading");
      let response = await fetch(`${BACKEND_URL}/api/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date,
          ...generalData,
          ...contactData,
          ...paymentData,
        }),
        credentials: "include",
      });
      let result = await response.json();
      if (response.status == 409) {
        toast.error(
          "Event Creation Failed : An event is already booked on this date"
        );
      } else if (!response.ok) throw new Error(result.message);
      else {
        toast.success("Event Created");
        setGeneralData({
          booking_number: "",
          stage: "",
          event: "",
          event_name: "",
          start_time: "",
          end_time: "",
        });
        setContactData({
          booker_name: "",
          address: "",
          phone_number_1: "",
          phone_number_2: "",
        });
        setPaymentData({
          total_amount: "",
          payment_type: "",
          paid_amount: "",
        });
        navigate("/admin/events");
      }
    } catch (error) {
      console.log("error:", error.message);
    }
  };

  return {
    handleInputField,
    generalData,
    contactData,
    paymentData,
    submitEvent,
  };
};

export default useEvents2;
