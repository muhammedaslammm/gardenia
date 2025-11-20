import { events, stages } from "../../data/admin.js";
import InputLabel from "../InputLabel.jsx";

const GeneralData = ({ register, watch, errors }) => {
  let start_time = watch("start_time");
  let end_time = watch("end_time");
  return (
    <section className="space-y-2">
      <div className="font-medium text-start">General Information</div>
      <div className="flex gap-4">
        <div className="w-[10rem]">
          <InputLabel title="Booking Number" error={errors.booking_number} />
          <input
            type="number"
            className={`a--input`}
            placeholder="Eg: 0001"
            name="booking_number"
            {...register("booking_number", {
              required: true,
            })}
          />
        </div>
        <div className="flex-1">
          <InputLabel title="Stage" error={errors.stage} />
          <select
            name="stage"
            id=""
            className={`a--input`}
            {...register("stage", { required: true })}
          >
            <option value="" selected disabled>
              Select a Stage
            </option>
            {[
              ["main_hall", "Main Hall"],
              ["mini_hall", "Mini Hall"],
            ].map(([key, value]) => (
              <option value={key}>{value}</option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <InputLabel title="Event" error={errors.event} />
          <select
            name="event"
            id=""
            className={`a--input`}
            {...register("event", { required: true })}
          >
            <option value="" disabled selected>
              Select an Event
            </option>
            {events.map((event) => (
              <option>{event}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <InputLabel title="Event Name" error={errors.event_name} />
          <input
            type="text"
            className={`a--input`}
            placeholder="Eg: Zami and Laya"
            name="event_name"
            {...register("event_name", { required: true })}
          />
        </div>

        <div className="w-[10rem]">
          <InputLabel title="Start Time" error={errors.start_time} />
          <input
            type="time"
            name="start_time"
            className={`a--input`}
            {...register("start_time", { required: true })}
          />
        </div>
        <div className="w-[10rem]">
          <InputLabel title="End Time" error={errors.end_time} />
          <input
            type="time"
            name="end_time"
            className={`a--input`}
            {...register("end_time", {
              required: true,
              validate: {
                func: (value) => {
                  return value > start_time;
                },
              },
            })}
          />
        </div>
      </div>
    </section>
  );
};

export default GeneralData;
