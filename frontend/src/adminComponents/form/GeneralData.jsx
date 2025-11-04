import { events, stages } from "../../data/admin.js";

const GeneralData = ({ data, change }) => {
  return (
    <section className="space-y-2">
      <div className="font-medium text-start">General Information</div>
      <div className="flex gap-4">
        <div className="w-[10rem]">
          <label htmlFor="">Booking Number</label>
          <input
            type="number"
            className="a--input"
            placeholder="Eg: 0001"
            name="booking_number"
            value={data.booking_number}
            onChange={change}
          />
        </div>
        <div className="flex-1">
          <label htmlFor="">Stage</label>
          <select
            name="stage"
            id=""
            className="a--input"
            value={data.stage}
            onChange={change}
          >
            <option value="" selected disabled>
              Select a Stage
            </option>
            {stages.map((stage) => (
              <option>{stage}</option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label htmlFor="">Event</label>
          <select
            name="event"
            id=""
            className="a--input"
            value={data.event}
            onChange={change}
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
          <label htmlFor="">Couple Name</label>
          <input
            type="text"
            className="a--input"
            placeholder="Eg: Zami and Laya"
            name="event_name"
            value={data.event_name}
            onChange={change}
          />
        </div>

        <div className="w-[10rem]">
          <label htmlFor="">Start Time</label>
          <input
            type="time"
            name="start_time"
            className="a--input"
            value={data.start_time}
            onChange={change}
          />
        </div>
        <div className="w-[10rem]">
          <label htmlFor="">End Time</label>
          <input
            type="time"
            name="end_time"
            className="a--input"
            value={data.end_time}
            onChange={change}
          />
        </div>
      </div>
    </section>
  );
};

export default GeneralData;
