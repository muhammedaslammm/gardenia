import { useEffect, useState } from "react";

const useEnquiries = () => {
  let [enquiries, setEnquiries] = useState(null);
  let [sort, setSort] = useState("all");
  let [sortedResult, setSortedResult] = useState(null);
  let [updateId, setUpdateId] = useState(null);
  let BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    let getEnquiries = async () => {
      try {
        let response = await fetch(`${BACKEND_URL}/api/enquiries?filter=all`, {
          method: "GET",
          credentials: "include",
        });
        let result = await response.json();
        if (!response.ok) throw new Error(result.message);
        setEnquiries(result.enquiries);
      } catch (error) {
        console.log("enquiry fetch error:", error.message);
      }
    };
    getEnquiries();
  }, []);

  useEffect(() => {
    let result = [];
    switch (sort) {
      case "all":
        result = [...(enquiries || [])].sort((a, b) => b.read - a.read);
        break;
      case "read":
        result = [...enquiries].sort((a, b) => b.read - a.read);
        break;
      case "un-read":
        result = [...enquiries].sort((a, b) => a.read - b.read);
        break;
      default:
        break;
    }
    setSortedResult(result);
  }, [enquiries, sort]);

  const handleSort = (e) => {
    setSort(e.target.value);
  };

  const handleRead = async (id, value) => {
    try {
      setUpdateId(id);
      let response = await fetch(`${BACKEND_URL}/api/enquiries/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ read: value }),
        credentials: "include",
      });
      setUpdateId(null);
      let result = await response.json();
      if (!response.ok) throw new Error(result.message);
      setEnquiries((prev) =>
        prev.map((enq) => (enq._id === id ? result.updated_enquiry : enq))
      );
    } catch (error) {
      console.log("error:", error.message);
    }
  };

  return { sortedResult, handleRead, updateId, handleSort };
};

export default useEnquiries;
