import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster, toast } from "sonner";
import { CheckCircle, XCircle, Spinner } from "phosphor-react";

import formSchema from "../utils/formSchema";
import formatDate from "../utils/formatDate";
import events from "../data/events";
import FormButton from "./FormButton";

const Form = () => {
  const [buttonStatus, setButtonStatus] = useState("idle");
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ resolver: zodResolver(formSchema) });

  const onSubmit = async (data) => {
    console.log("enquiry data:", data);
    data.enquiry_date = new Date().toISOString().split("T")[0];
    data.event_date = new Date(data.event_date).toISOString().split("T")[0];
    setButtonStatus("loading");
    try {
      const response = await fetch(
        `https://gardenia-bj8g.onrender.com/api/enquiries`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data }),
        }
      );
      const result = await response.json();
      console.log("response result:", result);
      if (result?.data?.id) {
        setButtonStatus("success");
        toast.success("Enquiry Successfully sent");
        reset();
        setTimeout(() => {
          setButtonStatus("idle");
        }, 1500);
      } else throw new Error(result.error.message);
    } catch (error) {
      setButtonStatus("failed");
      setTimeout(() => {
        setButtonStatus("idle");
      }, 1500);
      console.error("enquiry submittion failed", error);
    }
  };

  return (
    <>
      <Toaster position="top-center" richColors="true" />
      <section className="md:w-[60%] mx-auto lg:w-4/12 lg:self-end h-full space-y-7 md:space-y-8 xl:space-y-10 border border-gray-300 p-6 md:p-6 rounded-[1rem] md:rounded-[.5rem]">
        <div className="space-y-0">
          <h3 className="text-[1rem] md:text-[1.2rem] lg:text-[1.1rem] xl:text-[1.2rem] text-[#0f592e] text-center uppercase font-semibold">
            fill out the form
          </h3>
          <p className="text-[.9rem] md:text-[1.1rem] lg:text-[1rem] xl:text-[1.1rem] text-neutral-700 md:leading-[1.6rem] lg:leading-[1.5rem] xl:leading-[1.6rem] text-center">
            Submit your enquiry below and we'll get back to you shortly.
          </p>
        </div>

        <form
          className="flex flex-col gap-6 md:gap-8 lg:gap-6 h-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="relative">
            <input
              type="text"
              className="form__input"
              placeholder="Enter Name"
              {...register("client_name")}
            />
            {errors.client_name && (
              <p className="error--form__input">{errors.client_name.message}</p>
            )}
          </div>
          <div className="relative">
            <input
              type="tel"
              className="form__input"
              placeholder="Enter Mobile Number"
              {...register("phone_number")}
            />
            {errors.phone_number && (
              <p className="error--form__input">
                {errors.phone_number.message}
              </p>
            )}
          </div>

          <div className="relative">
            <select
              name=""
              id=""
              className="form__input"
              {...register("event_name")}
            >
              <option value="" disabled selected>
                Select the Event
              </option>
              {events.map(({ title }) => (
                <option value={title}>{title}</option>
              ))}
            </select>
            {errors.event_name && (
              <p className="error--form__input">{errors.event_name.message}</p>
            )}
          </div>
          <div className="relative">
            <input
              type="date"
              placeholder="Add Event Date"
              id=""
              className="form__input"
              {...register("event_date")}
            />
            {errors.event_date && (
              <p className="error--form__input">{errors.event_date.message}</p>
            )}
          </div>

          <button
            className={`submit-button text-[.9rem] md:text-[1rem] w-full  self-center flex justify-center items-center font-semibold py-2 md:py-3 mt-5 md:mt-8 text-[#0f592e] border   
            ${
              buttonStatus === "loading"
                ? "cursor-not-allowed border-neutral-800"
                : buttonStatus === "success"
                ? "bg-green-700 text-white cursor-not-allowed"
                : buttonStatus === "failed"
                ? "text-red-800 border-red-800 font-semibold"
                : "bg-white border-[#0f592e] cursor-pointer"
            }
             rounded-[.2rem] md:rounded-[.4rem] capitalize transition`}
            disabled={buttonStatus === "loading" || buttonStatus === "success"}
          >
            {buttonStatus === "success" ? (
              <FormButton icon={CheckCircle} text="Query Submitted" />
            ) : buttonStatus === "loading" ? (
              <FormButton icon={Spinner} anime={"animate-spin"} />
            ) : buttonStatus === "failed" ? (
              <div className="">
                <FormButton icon={XCircle} text="Query failed to submit" />
              </div>
            ) : (
              "submit enquiry"
            )}
          </button>
        </form>
      </section>
    </>
  );
};

export default Form;
