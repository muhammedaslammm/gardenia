import { CaretRight } from "phosphor-react";
import { Link, useParams } from "react-router-dom";
import useEventData from "../hooks/useEventData";
import dayjs from "dayjs";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const EventData = () => {
  let { id } = useParams();
  let { data = {}, loading } = useEventData(id);
  let { user } = useContext(AuthContext);

  let green_style = "font-medium px-4 py-2";
  let isPast = dayjs(data?.date).isBefore(dayjs());

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
          <section className="w-1/2 p-2 border border-neutral-300 space-y-4">
            <div>Contact Information</div>
            <div className="space-y-2">
              {Object.entries(data?.contact_details || {}).map(
                ([key, value], i) => (
                  <div key={i} className="flex justify-between items-start">
                    <div className="capitalize font-medium">
                      {key.split("_").join(" ")}
                    </div>
                    <div className="w-[65%]">{value}</div>
                  </div>
                )
              )}
            </div>
          </section>
          <section className="w-full p-2 border border-neutral-300 space-y-4">
            <div>Payment Information</div>
            <div>
              <div className="flex justify-between items-end p-2 border-b border-neutral-300">
                <div>Total Amount</div>
                <div>{data?.payment.total_amount}</div>
              </div>
              {data?.payment.payment_timeline.map((tl) => (
                <div
                  className="flex justify-between items-start p-2 border-b border-neutral-300"
                  key={tl._id}
                >
                  <div className="">
                    <div className="capitalize">{`${tl.payment_type} Amount`}</div>
                    <div>
                      {tl.timeline.map((tl2) => (
                        <div className="text-[.9rem] flex justify-between gap-4 italic text-neutral-700">
                          <div>
                            {tl2.note ? tl2.note : `Created by ${tl2.user}`}
                          </div>
                          <div>{`${dayjs(tl2.date).format(
                            "DD-MM-YYYY"
                          )}, ${dayjs(tl2.date).format("hh:mm a")}`}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>{tl.paid_amount}</div>
                </div>
              ))}
              <div className="flex justify-between items-end p-2">
                {data?.payment.payment_settled ? (
                  <div
                    className={`ml-auto ${green_style} bg-green-100 text-green-800`}
                  >
                    Amount Settled
                  </div>
                ) : (
                  <>
                    <div>Remaining Amount</div>
                    <div>{data?.payment.remaining_amount}</div>
                  </>
                )}
              </div>
            </div>
          </section>
        </div>
        {(user?.role === "md" ||
          (user?.role === "staff" && !data?.restricted)) &&
          !isPast && (
            <div className="mt-8 self-end bg-black text-white font-medium py-2 px-4">
              <Link
                to={`/admin/events/event-management?date=${data?.date}&event=${id}`}
              >
                Update this Event
              </Link>
            </div>
          )}
      </div>
    </main>
  );
};

export default EventData;
