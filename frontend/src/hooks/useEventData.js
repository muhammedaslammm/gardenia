import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const useEventData = (id) => {
  let [data, setData] = useState(null);
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    getEventData();
  }, []);

  useEffect(() => {
    if (data && data.cancelled) {
      console.log("cancellation ahead!");
      getEventCancelData();
    }
  }, [data?.cancelled]);

  let getEventData = async () => {
    try {
      setLoading(true);
      let response = await fetch(`${BACKEND_URL}/api/events/${id}`, {
        method: "GET",
        credentials: "include",
      });
      setLoading(false);
      let result = await response.json();
      if (!response.ok) throw new Error(result.message);
      setData(result.event);
    } catch (error) {
      console.log(
        "event data fetch error in useEventData.js page:",
        error.message
      );
      toast.error("Error : Attempt to Open Unknown Event");
      navigate("/admin/events");
    }
  };

  const getEventCancelData = async () => {
    try {
      let response = "";
    } catch (error) {
      console.log(error.message);
    }
  };

  return { data, loading, getEventData };
};
export default useEventData;
