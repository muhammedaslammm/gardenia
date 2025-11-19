import { CaretRight } from "phosphor-react";
import { Link, useParams } from "react-router-dom";
import useEventData from "../hooks/useEventData";
import dayjs from "dayjs";

const EventData = () => {
  let { id } = useParams();
  let { data = {}, loading } = useEventData(id);

  let green_style = "font-medium px-4 py-2";

  return (
    <main>
      <div className="text-[.9rem]">
        <Link to="/admin/events">Events</Link>
        <CaretRight className="inline-block w-4 h-4 mb-1 mx-1" />
        <span>Event Details</span>
      </div>
      <div className="mt-8 flex flex-col gap-4 min-h-[20rem]">
        {/* general data */}
        <div className="flex justify-between">
          <div>
            <div className="text-[1.4rem] font-medium">{data?.event_name}</div>
            <div>{`Booking Number : ${data?.booking_number}`}</div>
          </div>
          <div className="text-end">
            <div className="text-[1.4rem] font-medium">
              {dayjs(data?.date).format("Do MMMM, YYYY")}
            </div>
            <div>{`${dayjs(data?.start_time).format("hh:mm a")} - ${dayjs(
              data?.end_time
            ).format("hh:mm a")}`}</div>
          </div>
        </div>
        <div className="flex gap-2">
          <div
            className={`capitalize ${green_style} bg-green-100 text-green-800`}
          >{`Stage : ${data?.stage.split("_").join(" ")}`}</div>
          <div
            className={`${green_style} bg-orange-100 text-orange-800`}
          >{`Event : ${data?.event}`}</div>
        </div>
        <div className="flex gap-4 my-4">
          <section className="w-1/2 p-2 border border-neutral-200 space-y-4">
            <div>Contact Information</div>
            <div>
              {Object.entries(data?.contact_details || {}).map(
                ([key, value], i) => (
                  <div key={i} className="flex justify-between items-end">
                    <div className="capitalize">{key.split("_").join(" ")}</div>
                    <div className="font-medium">{value}</div>
                  </div>
                )
              )}
            </div>
          </section>
          <section className="w-full p-2 border border-neutral-200">
            <div>Payment Information</div>
          </section>
        </div>
        {/* <div className="mt-8 self-end bg-black text-white font-medium py-2 px-4">
          <Link
            to={`/admin/events/event-management?type=update&date=${data?.date}&event=${id}`}
          >
            Update this Event
          </Link>
        </div> */}
      </div>
    </main>
  );
};

export default EventData;
