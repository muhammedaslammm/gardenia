import { CaretRight } from "phosphor-react";
import { Link, useParams } from "react-router-dom";
import useEventData from "../hooks/useEventData";

const EventData = () => {
  let { id } = useParams();
  let { data = {}, loading } = useEventData(id);
  return (
    <main>
      <div className="text-[.9rem]">
        <Link to="/admin/events">Events</Link>
        <CaretRight className="inline-block w-4 h-4 mb-1 mx-1" />
        <span>Event Details</span>
      </div>
      <div className="mt-8 flex flex-col min-h-[20rem]">
        {/* general data */}
        <div>
          <div>{data?.event_name}</div>
        </div>
        <div className="mt-auto self-end">
          <Link
            to={`/admin/events/event-management?type=update&date=${data?.date}&event=${id}`}
          >
            Update this Event
          </Link>
        </div>
      </div>
    </main>
  );
};

export default EventData;
