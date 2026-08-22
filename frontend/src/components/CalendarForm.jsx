import dayjs from "dayjs";
import getEventMessage from "../utils/getEventMessage";
import InputLabel from "../adminComponents/InputLabel";
import { Spinner, X } from "phosphor-react";
import getBlockMessage from "../utils/getBlockMessage";
import { useEffect, useRef } from "react";
import advancedFormat from "dayjs/plugin/advancedFormat.js";

dayjs.extend(advancedFormat);

const CalendarForm = ({ util, details_loading, open }) => {
  let { dateDetails, selectedDate, form } = util;
  let {
    date = null,
    events = [],
    blocks = [],
    minihall_stat = 1,
    mainhall_stat = 1,
    mainhall_block_stat = 1,
    minihall_block_stat = 1,
  } = dateDetails;
  let message = getEventMessage(mainhall_stat, minihall_stat, events, date);
  let block_message = getBlockMessage(
    events,
    blocks,
    mainhall_block_stat,
    minihall_block_stat,
    date,
  );

  let { register, handleSubmit, submitForm, errors, loading, reset } = form;
  const isPastOrCurrentDate =
    selectedDate.isBefore(dayjs(), "day") ||
    selectedDate.isSame(dayjs(), "day");

  const formRef = useRef(null);
  useEffect(() => {
    const trackClick = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        reset();
        open(false);
      }
    };
    document.addEventListener("mousedown", trackClick);
    return () => document.removeEventListener("mousedown", trackClick);
  }, []);

  return (
    <div
      className="w-[90%] md:w-3/6 bg-white shadow-md border border-neutral-500 font--inter-tight p-2 md:p-4 space-y-2 md:space-y-4"
      ref={formRef}
    >
      <div className="leading-[1.8rem] flex justify-between items-center">
        <div className="font--inter-tight text-[.95rem] lg:text-[1.15rem] font-medium">
          {selectedDate.format("dddd, Do MMMM, YYYY")}
        </div>
        <X
          className="text-red-700 w-[1.3rem] h-[1.3rem] cursor-pointer"
          weight="bold"
          onClick={() => {
            reset();
            open(false);
          }}
        />
      </div>
      {details_loading ? (
        <div className="animation--container w-full h-[5rem] !rounded-[0rem] my-2">
          <div className="animation--mask animation--loading__effect"></div>
        </div>
      ) : (
        <>
          <div className=" p-1 md:p-2 text-[.8rem] lg:text-[1.1rem] leading-[1.2rem] lg:leading-[1.7rem] bg-neutral-200 text-neutral-800">
            Note : This enquiry is not treated as a confirmed booking or slot
            blocking for you in any way. Confirmation is made only after further
            verification.
          </div>
          <div
            className=" p-1 md:p-2 my-2 text-[.8rem] lg:text-[1.1rem] leading-[1.2rem] lg:leading-[1.7rem]"
            style={{ color: message.color, backgroundColor: message.bg }}
          >
            {message.text}
          </div>
          <div
            className=" p-1 md:p-2 text-[.8rem] lg:text-[1.1rem] leading-[1.2rem] lg:leading-[1.7rem]"
            style={{
              color: block_message.color,
              backgroundColor: block_message.bg,
            }}
          >
            {block_message.text}
          </div>
        </>
      )}
      <form
        className="my-4 flex flex-col gap-2"
        onSubmit={handleSubmit(submitForm)}
      >
        <div className="flex flex-col md:flex-row items-center gap-2">
          <div className="w-full flex flex-col gap-1">
            <InputLabel title="Name" error={errors?.name?.message} />
            <input
              type="text"
              className="form__input placeholder:!text-neutral-500"
              placeholder="Eg: George"
              {...register("name", { required: "Name Required" })}
            />
          </div>
          <div className="w-full flex flex-col gap-1">
            <InputLabel title="Email" error={errors?.email?.message} />
            <input
              type="email"
              className="form__input placeholder:!text-neutral-500"
              placeholder="george@gmail.com"
              {...register("email")}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-full flex flex-col gap-1">
            <InputLabel title="Stage" error={errors?.stage?.message} />
            <select
              className="form__input"
              {...register("stage", { required: "Stage Required" })}
            >
              <option value="" disabled selected>
                Select Stage
              </option>
              {[
                ["Main Hall", "main_hall"],
                ["Mini Hall", "mini_hall"],
              ].map(([key, value]) => (
                <option value={value}>{key}</option>
              ))}
            </select>
          </div>
          <div className="w-full flex flex-col gap-1">
            <InputLabel title="Event" error={errors?.event?.message} />
            <select
              className="form__input"
              {...register("event", { required: "Event Required" })}
            >
              <option value="" selected disabled>
                Select Event
              </option>
              {[
                "Wedding",
                "Reception",
                "Engagements",
                "Conference & Seminar",
                "Meetings & Workshops",
                "Product Launch",
                "Award Functions",
                "Exhibitions and Trade fairs",
                "Training Sessions",
              ].map((event) => (
                <option>{event}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <InputLabel
            title="Contact Number"
            error={errors?.contact_number?.message}
          />
          <input
            type="tel"
            className="form__input placeholder:!text-neutral-500"
            placeholder="+91"
            {...register("contact_number", {
              required: "Contact Number Required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Invalid Phone Number",
              },
            })}
          />
        </div>

        {!isPastOrCurrentDate && (
          <button
            type="submit"
            className={`mt-8 bg-green-800 form__input text-white font-semibold cursor-pointer hover:bg-green-900 transition-colors ${
              loading && "opacity-70 !cursor-not-allowed"
            } ${message.blocked && "opacity-40 !cursor-not-allowed"}`}
            disabled={loading || message.blocked || isPastOrCurrentDate}
          >
            {loading ? (
              <div className="flex justify-center gap-2">
                <div>Submitting</div>
                <Spinner className="animate-spin w-[1.5rem] h-[1.5rem]" />
              </div>
            ) : (
              "Submit Enquiry"
            )}
          </button>
        )}
      </form>
    </div>
  );
};

export default CalendarForm;
