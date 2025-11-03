import { CaretRight } from "phosphor-react";
import { Link } from "react-router-dom";

const EventData = () => {
  return (
    <main>
      <div className="text-[.9rem]">
        <Link to="/admin/events">Events</Link>
        <CaretRight className="inline-block w-4 h-4 mb-1 mx-1" />
        <span>Event Details</span>
      </div>
      <div className="mt-8 border border-neutral-300 bg-neutral-800/20 h-[30rem] w-full rounded-[1.5rem] flex flex-col justify-center items-center">
        <div className="text-center mb-[4.5rem] leading-[2.5rem]">
          <div className="text-[2.4rem] font-medium text-neutral-700">
            Under Maintenance!
          </div>
          <div className="text-[1.3rem] text-neutral-600">
            This page is under maintenance.{" "}
          </div>
        </div>
      </div>
    </main>
  );
};

export default EventData;
