import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { Link } from "react-router-dom";
import getEventMessage from "../utils/getEventMessage";
import getBlockMessage from "../utils/getBlockMessage";
import { useState } from "react";
import { createPortal } from "react-dom";
import BlockModal from "./modals/BlockModal";

dayjs.extend(advancedFormat);

const EventDetails = ({ dateDetails, refetchData, fetchEvents, loading }) => {
  const [blockModal, setBlockModal] = useState(false);
  let {
    events = [],
    blocks = [],
    date = null,
    mainhall_stat = 1,
    minihall_stat = 1,
    mainhall_block_stat = 1,
    minihall_block_stat = 1,
  } = dateDetails;

  blocks = blocks.filter((b) => b.status !== "freeze");
  let message = getEventMessage(mainhall_stat, minihall_stat, events, date);
  let block_message = getBlockMessage(
    events,
    blocks,
    mainhall_block_stat,
    minihall_block_stat,
    date,
  );

  let isPast = date ? date.isBefore(dayjs(), "day") : false;
  let isToday = date ? date.isSame(dayjs(), "day") : false;

  const formatted_date = date ? date.format("Do MMMM, YYYY - dddd") : "";
  const date_string = date ? date.format("YYYY-MM-DD") : "";
  const not_available = mainhall_block_stat === 0 && minihall_block_stat === 0;

  return (
    <div className="pt-6 border-t border-neutral-400 sm:border-t-0 sm:pt-0 lg:w-4/12 flex flex-col gap-2 sm:gap-1 relative overflow-x-hidden">
      {/* top block */}
      <div className="flex justify-between items-end">
        <div className="font-medium sm:text-[1rem]">Event Details</div>
      </div>

      {/* bottom block */}
      <div className="border bg-white border-neutral-400 h-full flex flex-col gap-2 p-2">
        {loading ? (
          <div className="flex flex-col h-full gap-2 py-1">
            <div className="animation--container w-[10rem] h-[2rem] !rounded-[0rem]">
              <div className="animation--mask animation--loading__effect"></div>
            </div>
            <div className="space-y-4">
              <div className="animation--container w-full h-[9rem] !rounded-[0rem]">
                <div className="animation--mask animation--loading__effect"></div>
              </div>
            </div>
            <div className="animation--container w-full h-[3rem] !rounded-[0rem] mt-auto">
              <div className="animation--mask animation--loading__effect"></div>
            </div>
          </div>
        ) : (
          <>
            <div className="font-medium text-[1rem] sm:text-[1.1rem]">
              {formatted_date}
            </div>
            {!events.length ? (
              <div className=" flex flex-col h-full">
                <div className="text-[.9rem] bg-green-800/5 p-2">
                  <div className="text-[1rem] font-medium">
                    No Events added on this date
                  </div>
                  <p className=" text-neutral-800">
                    Click "add event" button to add a new event on this date.
                  </p>
                </div>
              </div>
            ) : (
              <div className="mb-[2rem]">
                <div className="pb-2 sm:pb-2">
                  <div className="text-[.8rem] sm:text-[.9rem]">{`Total booking: ${events.length}`}</div>
                </div>
                <div className="space-y-2">
                  {events.map((event) => (
                    <Link
                      className={`space-y-4 sm:space-y-4 p-2 flex justify-between cursor-pointer border border-neutral-400/80 hover:-translate-y-[.2rem] transition-transform z-10 ${
                        event.cancelled && "opacity-70 relative"
                      }`}
                      to={`/admin/events/${event._id}`}
                    >
                      {event.cancelled && (
                        <div className="absolute left-[50%] top-[50%] -translate-y-[50%] -translate-x-[50%] text-red-800 z-10">
                          This Event is Cancelled
                        </div>
                      )}
                      <div className="space-y-8 my-0">
                        <div className="leading-[1.4rem]">
                          <div className="text-[1rem] uppercase font-medium">
                            {event.event_name}
                          </div>
                          <div className="text-[.9rem] text-neutral-600">
                            {event.event}
                          </div>
                        </div>
                        <div>
                          <div className="text-[.9rem] capitalize">
                            Stage: {event.stage.split("_").join(" ")}
                          </div>
                          <div className="text-[.9rem]">{`${dayjs(
                            event.start_time,
                          ).format("hh:mm a")} - ${dayjs(event.end_time).format(
                            "hh:mm a",
                          )}`}</div>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between">
                        <div className="text-[1rem] font-medium">
                          # {event.booking_number}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-auto flex flex-col gap-2">
              {blocks.length > 0 &&
                blocks.map(
                  ({
                    requester_name,
                    stage,
                    start_time,
                    end_time,
                    ...rest
                  }) => (
                    <div className="p-4 bg-blue-100 text-blue-900 space-y-4 mt-auto">
                      Client{" "}
                      <span className="font-medium">{requester_name}</span> has
                      blocked the{" "}
                      <span className="font-medium capitalize">
                        {stage.replace("_", " ")}
                      </span>{" "}
                      on this date from{" "}
                      <span className="font-medium">
                        {dayjs(start_time).format("hh:mm a")}
                      </span>{" "}
                      to{" "}
                      <span className="font-medium">
                        {dayjs(end_time).format("hh:mm a")}
                      </span>
                      . Proceed only after verification.
                    </div>
                  ),
                )}
              {!isPast && !isToday && (
                <div
                  className="p-4"
                  style={{
                    color: block_message.color,
                    backgroundColor: block_message.bg,
                  }}
                >
                  {block_message.text}{" "}
                  {!not_available && (
                    <span
                      className="underline cursor-pointer"
                      onClick={() => setBlockModal(true)}
                    >
                      Block an event
                    </span>
                  )}
                </div>
              )}
              <div
                className="p-4"
                style={{ color: message.color, backgroundColor: message.bg }}
              >
                {message.text}{" "}
              </div>
              {(mainhall_stat !== 0 || minihall_stat !== 0) &&
                !isPast &&
                !isToday && (
                  <Link
                    to={`/admin/events/event-management?date=${date_string}`}
                    className="w-full py-2 px-3 bg-green-900 text-white text-[.9rem] font-medium text-center hover:bg-green-800 transition-colors cursor-pointer uppercase"
                  >
                    Add Event
                  </Link>
                )}
            </div>{" "}
          </>
        )}
      </div>
      {blockModal &&
        createPortal(
          <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-100">
            <BlockModal
              setModal={setBlockModal}
              dateDetails={dateDetails}
              fetchEvents={fetchEvents}
            />
          </div>,
          document.getElementById("modal--event"),
        )}
    </div>
  );
};

export default EventDetails;
