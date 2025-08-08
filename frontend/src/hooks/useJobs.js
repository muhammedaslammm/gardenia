import { useEffect, useState } from "react";
import { toast } from "sonner";

const useJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [errors, setErrors] = useState({});
  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    job_type: "",
    enquiry_email: "gardeniaconventioncenter@gmail.com",
    enquiry_phone: "",
  });
  const [updateChild, setUpdateChild] = useState(null);
  const [buttonState, setButtonState] = useState("idle");
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/admin/jobs`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        if (!response.ok)
          throw new Error(data.message || "failed to fetch jobs");
        setJobs(data.jobs);
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobs();
  }, []);

  const handleEntry = (event) => {
    const { name, value } = event.target;
    if (value.trim().length)
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));

    setNewJob((prev) => {
      const newEntry = { ...prev };
      if (name === "enquiry_phone") {
        newEntry[name] = value.slice(0, 10);
      } else newEntry[name] = value;
      return newEntry;
    });
  };

  // job updation
  const updateJob = (id) => {
    const match = jobs.find((job) => job._id === id);
    if (match)
      setNewJob({
        title: match.title,
        description: match.description,
        job_type: match.job_type,
      });
    setUpdateChild(id);
    setButtonState("update");
  };

  // delete job
  const deleteJob = async (id) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/admin/jobs/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setJobs(data.jobs);
      toast.success("job deleted");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // job submission
  const submitNewJob = async () => {
    let errors = {};
    Object.entries(newJob).forEach(([key, value]) => {
      if (key === "job_type" && !value.trim().length) {
        errors[key] = "Select one job type";
      } else if (
        key === "enquiry_email" &&
        value.trim() &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      )
        errors[key] = "Invalid Email";
      else if (key === "enquiry_phone" && value.trim().length < 10)
        errors[key] = "Must have 10 characters";
      else if (!value.trim().length) errors[key] = "This field cannot be empty";
    });
    if (
      newJob.title.trim() && updateChild
        ? jobs
            .filter((job) => job._id !== updateChild)
            .find((job) => job.title === newJob.title)
        : jobs.find((job) => job.title === newJob.title)
    )
      errors.title = "Name already taken";
    if (Object.keys(errors).length) {
      return setErrors((prevErrors) => {
        let newErrors = { ...prevErrors };
        Object.entries(errors).forEach(([key, value]) => {
          newErrors[key] = value;
        });
        return newErrors;
      });
    }

    try {
      setButtonState("loading");
      let response;
      if (updateChild) {
        response = await fetch(`${BACKEND_URL}/api/admin/jobs/${updateChild}`, {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newJob),
        });
      } else {
        response = await fetch(`${BACKEND_URL}/api/admin/jobs`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newJob),
        });
      }
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      else {
        setJobs(data.jobs);
        setUpdateChild(null);
        setNewJob({ title: "", description: "", job_type: "" });
        setButtonState("success");
        setTimeout(() => {
          setButtonState("idle");
          window.scrollTo(0, 0);
        }, 2000);
      }
    } catch (error) {
      console.log("error:", error.message);
      setButtonState("error");
      setTimeout(() => {
        setButtonState("idle");
        window.scrollTo(0, 0);
      }, 2000);
    }
  };

  return {
    jobs,
    newJob,
    handleEntry,
    submitNewJob,
    updateJob,
    deleteJob,
    updateChild,
    buttonState,
    errors,
  };
};

export default useJobs;
