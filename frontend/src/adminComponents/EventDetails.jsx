import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { Link } from "react-router-dom";
import getEventMessage from "../utils/getEventMessage";
import { PencilSimple } from "phosphor-react";

dayjs.extend(advancedFormat);

const EventDetails = ({ utils }) => {
  const { dateDetails = {} } = utils;
  let {
    events = [],
    date = null,
    mainhall_stat = 1,
    minihall_stat = 1,
  } = dateDetails;
  let message = getEventMessage(mainhall_stat, minihall_stat, events);

  const formatted_date = date ? date.format("Do MMMM, YYYY - dddd") : "";
  const date_string = date ? date.format("YYYY-MM-DD") : "";

  return (
    <div className="pt-6  border-t border-neutral-300 sm:border-t-0 sm:pt-0 lg:w-4/12 flex flex-col gap-2 sm:gap-1 relative overflow-x-hidden">
      {/* top block */}
      <div className="flex justify-between items-end">
        <div className="font-medium sm:text-[1rem]">Event Details</div>
      </div>

      {/* bottom block */}
      <div className="border border-neutral-300 h-full flex flex-col gap-2 p-2">
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
          <div>
            <div className="pb-2 sm:pb-2">
              <div className="text-[.8rem] sm:text-[.9rem]">{`Total booking: ${events.length}`}</div>
            </div>
            <div className="space-y-4">
              {events.map((event) => (
                <Link
                  className="space-y-4 sm:space-y-4 p-2 flex justify-between cursor-pointer border border-neutral-200"
                  to={`/admin/events/event-data/${event._id}`}
                >
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
                        event.start_time
                      ).format("hh:mm a")} - ${dayjs(event.end_time).format(
                        "hh:mm a"
                      )}`}</div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between">
                    <div className="text-[1rem] font-medium">
                      # {event.booking_number}
                    </div>
                    <div onClick={() => window.alert()} className="z-100">
                      <PencilSimple className="w-[1rem] h-[1rem] text-neutral-700" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
        <div className="mt-auto flex flex-col gap-4">
          <div
            className=" p-4"
            style={{ color: message.color, backgroundColor: message.bg }}
          >
            {message.text}
          </div>
          {(mainhall_stat !== 0 || minihall_stat !== 0) && (
            <Link
              to={`/admin/events/event-management?date=${date_string}`}
              className="w-full py-2 px-3 bg-green-900 text-white text-[.9rem] font-medium text-center hover:bg-green-800 transition-colors cursor-pointer uppercase"
            >
              Add Event
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
