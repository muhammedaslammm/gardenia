import {
  ArrowSquareOut,
  CaretRight,
  MinusCircle,
  Spinner,
} from "phosphor-react";
import { Link, useParams } from "react-router-dom";
import useEventData from "../hooks/useEventData";
import dayjs from "dayjs";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { createPortal } from "react-dom";
import NewPaymentModal from "./modals/NewPaymentModal";
import AddonModal from "./modals/AddonModal";
import DiscountModal from "./modals/DiscountModal";
import CancellationModal from "./modals/CancellationModal";

const EventData = () => {
  let { id } = useParams();
  let {
    data = {},
    cancelData,
    dataLoading,
    getEventData,
    sourceData,
  } = useEventData(id);
  let { user } = useContext(AuthContext);

  let isPast = dayjs(data?.date).isBefore(dayjs());

  let getCurrency = (amount) => {
    if (amount == null) return <Spinner className="animate-spin" />;
    return `${Intl.NumberFormat("en-IN").format(amount)} `;
  };
  let [mode, setMode] = useState(null);

  const handleMode = (type) => {
    setMode(type);
  };

  return (
    <main>
      <div className="text-[.9rem]">
        <Link to="/admin/events">Events</Link>
        <CaretRight className="inline-block w-4 h-4 mb-1 mx-1" />
        <span>Event Details</span>
      </div>
      <div className="mt-4 flex flex-col gap-4">
        {dataLoading ? (
          <>
            <div className="animation--container w-full h-[8rem]">
              <div className="animation--mask animation--loading__effect"></div>
            </div>
            <div className="animation--container w-full h-[10rem]">
              <div className="animation--mask animation--loading__effect"></div>
            </div>
            <div className="animation--container w-full h-[15rem]">
              <div className="animation--mask animation--loading__effect"></div>
            </div>
          </>
        ) : (
          // bg-white border border-neutral-400 p-4
          <>
            <div className="space-y-4">
              <div className="flex justify-between">
                <div>
                  <div className="text-[1.3rem] font-medium">
                    {data?.event_name}
                  </div>
                  <div>{`Booking Number : ${data?.booking_number}`}</div>
                </div>
                <div className="text-end">
                  <div className="text-[1.3rem] font-medium">
                    {dayjs(data?.date).format("Do MMMM, YYYY")}
                  </div>
                  <div>{`${dayjs(data?.start_time).format("hh:mm a")} - ${dayjs(
                    data?.end_time,
                  ).format("hh:mm a")}`}</div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <div
                    className={`capitalize px-2 py-1.5 ${cancelData ? "text-red-800 bg-red-100/80" : "text-green-800 bg-green-100/80"} `}
                  >{`Stage : ${data?.stage.split("_").join(" ")}`}</div>
                  <div
                    className={`px-2 py-1.5 ${cancelData ? "text-red-800 bg-red-100/80" : "text-green-800 bg-green-100/80"}`}
                  >{`Event : ${data?.event}`}</div>
                </div>
                <div className="flex items-center gap-2">
                  {sourceData && (
                    <div
                      className={`px-2 py-1.5 text-neutral-800 bg-neutral-200/80`}
                    >
                      Rescheduled Event from booking #{sourceData}
                    </div>
                  )}
                  {cancelData?.reScheduled && cancelData.reScheduledEvent ? (
                    <div className="px-2 py-1.5 text-red-800 bg-red-100/80">
                      Event Rescheduled.{" "}
                      <Link
                        className="underline"
                        to={`/admin/events/${cancelData.reScheduledEvent._id}`}
                      >
                        View event
                      </Link>
                    </div>
                  ) : cancelData?.reScheduled ? (
                    <>
                      <div className="px-2 py-1.5 text-red-800 bg-red-100/80 ">
                        Event Cancelled.
                      </div>
                      <div className="px-2 py-1.5 text-yellow-600 bg-yellow-100/80">
                        Event listed to reschedule
                      </div>
                    </>
                  ) : cancelData ? (
                    <div className="px-2 py-1.5 text-red-800 bg-red-100/80">
                      Event Cancelled.
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
            <section className="w-full space-y-1 mt-4 mb-4">
              <div className="font-medium">Contact Information</div>
              <div className="bg-white border border-neutral-400">
                <div className="grid grid-cols-4 text-center border-b border-neutral-400">
                  {Object.keys(data?.contact_details || {}).map((item, i) => (
                    <div key={i} className="capitalize py-3">
                      {item.split("_").join(" ")}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-4 text-center">
                  {Object.values(data?.contact_details || {}).map((item, i) => (
                    <div key={i} className="py-3">
                      {item ?? "-"}
                    </div>
                  ))}
                </div>
              </div>
            </section>
            <section className="w-full space-y-4">
              <section className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <div className="font-medium">Payment Information</div>
                  {!dataLoading && (
                    <div className="flex gap-4">
                      {!data?.payment.payment_settled && !data?.cancelled && (
                        <div
                          className="text-purple-800 hover:underline cursor-pointer"
                          onClick={() => handleMode("discount")}
                        >
                          Add discount
                        </div>
                      )}
                      {!data?.payment.payment_settled &&
                        data?.payment.remaining_amount > 0 &&
                        !data?.cancelled && (
                          <button
                            className="text-red-700 hover:text-red-500 transition-colors hover:underline cursor-pointer"
                            onClick={() => handleMode("new")}
                          >
                            Add new payment
                          </button>
                        )}
                    </div>
                  )}
                </div>

                <div className="p-4 bg-white border border-neutral-400">
                  <div className="flex justify-between items-end py-2 border-b border-neutral-400 font-medium">
                    <div>Total Amount</div>
                    <div>{getCurrency(data?.payment.total_amount)}</div>
                  </div>
                  {data?.payment.payment_timeline.map((tl) => (
                    <div
                      className="flex justify-between items-start py-2 border-b border-neutral-400"
                      key={tl._id}
                    >
                      <div className="">
                        <div className="capitalize">
                          {`${tl.payment_type} Amount ${tl.payment_mode ? `(${tl.payment_mode})` : ""}`}
                        </div>
                        <div>
                          {tl.timeline.map((tl2) => (
                            <div className="text-[.9rem] flex justify-between items-center gap-2 italic text-neutral-700">
                              <div>
                                {tl2.note
                                  ? tl2.note
                                  : `Recorded by ${tl2.username}`}
                              </div>
                              <div>{`${dayjs(tl2.date).format(
                                "DD-MM-YYYY",
                              )}, ${dayjs(tl2.date).format("hh:mm a")}`}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>{getCurrency(tl.paid_amount)}</div>
                    </div>
                  ))}
                  <div className="flex justify-between items-end font-medium py-2">
                    {data?.payment.payment_settled ? (
                      <>
                        <div className="text-green-800">Amount Settled</div>
                        <div className="text-green-800">
                          {getCurrency(data?.payment.total_amount)}
                        </div>
                      </>
                    ) : (
                      <>
                        <div>Remaining Amount</div>
                        <div>{getCurrency(data?.payment.remaining_amount)}</div>
                      </>
                    )}
                  </div>
                  {cancelData && (
                    <div className="flex items-center justify-between text-red-800 font-medium border-t border-neutral-400 pt-2">
                      <div>Refund Amount</div>
                      <div>{getCurrency(cancelData?.refundAmount)}</div>
                    </div>
                  )}
                </div>
              </section>
              <section className="p-4 border border-neutral-400 bg-white space-y-6">
                <div className="flex justify-between items-end ">
                  <div className="">Add-ons / Supplemental Charges</div>
                  {!data?.cancelled && (
                    <button
                      className="hover:text-violet-800 transition-colors cursor-pointer underline"
                      onClick={() => handleMode("expence")}
                    >
                      Add Returns
                    </button>
                  )}
                </div>

                {data?.addon_charges?.total_amount ? (
                  <div>
                    <div className="flex justify-between pb-1 border-b border-neutral-300 font-medium">
                      <div>Charges</div>
                      <div>Amount</div>
                    </div>
                    <div>
                      {data.addon_charges.items.map((item, i) => (
                        <div className="flex justify-between py-1 border-b border-neutral-300">
                          <div>{item.charge_name}</div>
                          <div>{item.amount}</div>
                        </div>
                      ))}
                      <div className="flex justify-between font-medium py-1">
                        <div>Total Amount</div>
                        <div>{data.addon_charges.total_amount}</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="border border-neutral-400 bg-white p-4">
                    <div className="font-medium">
                      No Add-ons / Supplemental Charges for this event
                    </div>
                    <div>
                      This event haven't cost any add-ons or supplemental
                      charges.
                    </div>
                  </div>
                )}
              </section>
            </section>
            <div className="flex gap-2 self-end mt-8">
              {!isPast && !data?.cancelled && (
                <button
                  className="text-red-800 bg-red-100 font-medium py-2 px-4 cursor-pointer"
                  onClick={() => handleMode("cancellation")}
                >
                  Cancel this Event
                </button>
              )}
              {["owner", "supervisor", "staff"].includes(user?.role) &&
              !data?.cancelled ? (
                <div className="self-end bg-black text-white font-medium py-2 px-4 cursor-pointer">
                  <Link
                    to={`/admin/events/event-management?date=${data?.date}&event=${id}`}
                  >
                    Update this Event
                  </Link>
                </div>
              ) : (
                <></>
              )}
            </div>
          </>
        )}
      </div>
      {mode &&
        createPortal(
          <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-200">
            {mode === "new" && (
              <NewPaymentModal
                handleMode={handleMode}
                remainingAmount={data?.payment.remaining_amount}
                eventId={data?._id}
                refetch={getEventData}
              />
            )}
            {mode === "expence" && (
              <AddonModal
                handleMode={handleMode}
                eventId={data._id}
                refetch={getEventData}
              />
            )}
            {mode === "discount" && (
              <DiscountModal
                eventId={data._id}
                handleMode={handleMode}
                remainingAmount={data?.payment.remaining_amount}
                refetch={getEventData}
              />
            )}
            {mode === "cancellation" && (
              <CancellationModal
                eventId={data._id}
                handleMode={handleMode}
                payment_timeline={data?.payment?.payment_timeline}
                refetch={getEventData}
              />
            )}
          </div>,
          document.getElementById("modal--event"),
        )}
    </main>
  );
};

export default EventData;
