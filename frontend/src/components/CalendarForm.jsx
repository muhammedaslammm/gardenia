import dayjs from "dayjs";
import getEventMessage from "../utils/getEventMessage";
import InputLabel from "../adminComponents/InputLabel";
import { Spinner } from "phosphor-react";

const CalendarForm = ({ util, details_loading }) => {
  let { dateDetails, form } = util;
  let {
    date = null,
    events = [],
    minihall_stat = 1,
    mainhall_stat = 1,
  } = dateDetails;
  let message = getEventMessage(mainhall_stat, minihall_stat, events, date);

  let { register, handleSubmit, submitForm, errors, loading } = form;
  return (
    <div className="w-3/6 self-start border border-neutral-500 p-4 font--inter-tight">
      <div className="leading-[1.8rem]">
        <div className="font--dm-serif-display text-[1.4rem]">Enquiry Form</div>
      </div>
      {details_loading ? (
        <div className="animation--container w-full h-[5rem] !rounded-[0rem] my-2">
          <div className="animation--mask animation--loading__effect"></div>
        </div>
      ) : (
        <div
          className="p-2 my-2"
          style={{ color: message.color, backgroundColor: message.bg }}
        >
          {message.text}
        </div>
      )}
      <form
        className="my-4 flex flex-col gap-2"
        onSubmit={handleSubmit(submitForm)}
      >
        <div className="space-y-1">
          <InputLabel title="Name" error={errors?.name?.message} />
          <input
            type="text"
            className="form__input placeholder:!text-neutral-500"
            placeholder="Eg: George"
            {...register("name", { required: "Name Required" })}
          />
        </div>
        <div>
          <InputLabel title="Email" error={errors?.email?.message} />
          <input
            type="email"
            className="form__input placeholder:!text-neutral-500"
            placeholder="george@gmail.com"
            {...register("email", {
              required: "Email Required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid Email Address",
              },
            })}
          />
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

        <button
          type="submit"
          className={`mt-8 bg-green-800 form__input text-white font-semibold cursor-pointer hover:bg-green-900 transition-colors ${
            loading && "opacity-70 !cursor-not-allowed"
          } ${message.blocked && "opacity-40 !cursor-not-allowed"}`}
          disabled={loading || message.blocked}
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
      </form>
    </div>
  );
};

export default CalendarForm;
