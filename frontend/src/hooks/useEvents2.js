import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import inputValidation from "../utils/inputValidation";
import dayjs from "dayjs";

const useEvents2 = () => {
  let generalSchema = {
    booking_number: "",
    stage: "",
    event: "",
    event_name: "",
    start_time: "",
    end_time: "",
  };
  let contactSchema = {
    booker_name: "",
    address: "",
    phone_number_1: "",
    phone_number_2: "",
  };
  let paymentSchema = {
    total_amount: "",
    payment_type: "",
    paid_amount: "",
  };
  let [generalData, setGeneralData] = useState(generalSchema);
  let [contactData, setContactData] = useState(contactSchema);
  let [paymentData, setPaymentData] = useState(paymentSchema);
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
    let { errors } = inputValidation(generalData, contactData, paymentData);
    let start_time = dayjs(
      `${date} ${generalData.start_time}`,
      "YYYY-MM-DD HH:mm"
    ).format();
    let end_time = dayjs(
      `${date} ${generalData.end_time}`,
      "YYYY-MM-DD HH:mm"
    ).format();
    generalData.start_time = start_time;
    generalData.end_time = end_time;
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
        toast.error(result.message);
      } else if (!response.ok) throw new Error(result.message);
      else {
        console.log(result.message);
        toast.success(result.message);
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
