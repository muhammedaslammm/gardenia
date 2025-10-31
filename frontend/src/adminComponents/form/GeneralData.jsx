import { events, stages } from "../../data/admin.js";

const GeneralData = () => {
  return (
    <section className="space-y-2">
      <div className="font-medium text-start">General Information</div>
      <div className="flex gap-4">
        <div className="w-[10rem]">
          <label htmlFor="">Booking Number</label>
          <input type="text" className="a--input" placeholder="Eg: 0001" />
        </div>
        <div className="flex-1">
          <label htmlFor="">Stage</label>
          <select name="" id="" className="a--input">
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
          <select name="" id="" className="a--input">
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
          />
        </div>

        <div className="w-[10rem]">
          <label htmlFor="">Start Time</label>
          <input type="time" className="a--input" />
        </div>
        <div className="w-[10rem]">
          <label htmlFor="">End Time</label>
          <input type="time" className="a--input" />
        </div>
      </div>
    </section>
  );
};

export default GeneralData;
