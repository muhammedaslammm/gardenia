import dayjs from "dayjs";
import getEventMessage from "../utils/getEventMessage";
import InputLabel from "../adminComponents/InputLabel";

const CalendarForm = ({ util }) => {
  let { dateDetails, form } = util;
  let {
    date = null,
    events = [],
    minihall_stat = 1,
    mainhall_stat = 1,
  } = dateDetails;
  let message = getEventMessage(mainhall_stat, minihall_stat, events, date);

  let { register, handleSubmit, submitForm, errors } = form;
  return (
    <div className="w-3/6 self-start border border-neutral-500 p-4 font--inter-tight">
      <div className="leading-[1.8rem]">
        <div className="font--dm-serif-display text-[1.4rem]">Enquiry Form</div>
      </div>
      <div
        className="p-2 my-2"
        style={{ color: message.color, backgroundColor: message.bg }}
      >
        {message.text}
      </div>
      <form
        className="my-4 flex flex-col gap-2"
        onSubmit={handleSubmit(submitForm)}
      >
        <div className="space-y-1">
          <InputLabel title="User Name" error={errors.username} />
          <input
            type="text"
            className="form__input placeholder:!text-neutral-500"
            placeholder="Eg: George"
            {...register("username", { required: true })}
          />
        </div>
        <div>
          <InputLabel title="Email" error={errors.email} />
          <input
            type="email"
            className="form__input placeholder:!text-neutral-500"
            placeholder="george@gmail.com"
            {...register("email", { required: true })}
          />
        </div>
        <div>
          <InputLabel title="Contact Number" error={errors.contact_number} />
          <input
            type="tel"
            className="form__input placeholder:!text-neutral-500"
            placeholder="+91"
            {...register("contact_number", { required: true })}
          />
        </div>
        <button
          type="submit"
          className="mt-8 bg-green-800 form__input text-white font-semibold cursor-pointer hover:bg-green-900 transition-colors"
        >
          Submit Enquiry
        </button>
      </form>
    </div>
  );
};

export default CalendarForm;
