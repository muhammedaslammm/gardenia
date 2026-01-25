import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const useEventData = (id) => {
  let [data, setData] = useState(null);
  let [cancelData, setCancelData] = useState(null);
  let [dataLoading, setDataLoading] = useState(true);
  let [cancelDataLoading, setCancelDataLoading] = useState(false);
  let navigate = useNavigate();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    getEventData();
  }, [id]);

  useEffect(() => {
    if (data && data?.cancelled) {
      getEventCancelData();
    }
  }, [data, id]);

  let getEventData = async () => {
    try {
      setDataLoading(true);
      let response = await fetch(`${BACKEND_URL}/api/events/${id}`, {
        method: "GET",
        credentials: "include",
      });
      setDataLoading(false);
      let result = await response.json();
      if (!response.ok) throw new Error(result.message);
      setData(result.event);
    } catch (error) {
      console.log(
        "event data fetch error in useEventData.js page:",
        error.message,
      );
      toast.error("Error : Attempt to Open Unknown Event");
      navigate("/admin/events");
    }
  };

  const getEventCancelData = async () => {
    try {
      setCancelDataLoading(true);
      let response = await fetch(`${BACKEND_URL}/api/events/${id}/cancel`, {
        method: "GET",
        credentials: "include",
      });
      setCancelDataLoading(false);
      let result = await response.json();
      if (response.status === 404) {
        toast.error(result.message);
        setCancelData(null);
        return;
      } else if (!response.ok) throw new Error(result.message);
      console.log("cancel data:", result.data);
      setCancelData(result.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return { data, cancelData, dataLoading, cancelDataLoading, getEventData };
};
export default useEventData;
