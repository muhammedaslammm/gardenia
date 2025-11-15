import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { Link } from "react-router-dom";

dayjs.extend(advancedFormat);

const EventDetails = ({ utils }) => {
  const { dateDetails = {} } = utils;
  let { events = [], date = null } = dateDetails;

  const formatted_date = date ? date.format("Do MMMM, YYYY - dddd") : "";
  const date_string = date ? date.format("YYYY-MM-DD") : "";

  return (
    <div className="pt-6  border-t border-neutral-300 sm:border-t-0 sm:pt-0 lg:w-4/12 flex flex-col gap-2 sm:gap-1 relative overflow-x-hidden">
      {/* top block */}
      <div className="flex justify-between items-end">
        <div className="font-medium sm:text-[1rem]">Event Details</div>
      </div>

      {/* bottom block */}
      {!events.length ? (
        <div className="border border-neutral-300 h-full flex flex-col justify-between gap-4">
          <div className="p-2 leading-[1.3rem] flex flex-col h-full">
            <p className="font-medium text-[1rem] sm:text-[1.1rem]">
              {formatted_date}
            </p>
            <div className="text-[.9rem] mt-4">
              <div className="text-[1rem]">No Events added on this date</div>
              <p className=" text-neutral-800">
                Click "add event" button to add a new event on this date.
              </p>
            </div>
            <Link
              to={`/admin/events/event-management?date=${date_string}`}
              className="py-1 px-3 bg-green-800 text-white text-[.9rem] mt-8 self-end hover:bg-green-900 transition-colors cursor-pointer"
            >
              Add Event
            </Link>
          </div>
        </div>
      ) : (
        <div className="border border-neutral-300 flex-1 mt-1 p-2">
          <div className="pb-2 sm:pb-4">
            <div className="font-medium text-[.9rem] sm:text-[1rem]">{``}</div>
            <div className="text-[.8rem] sm:text-[.9rem]">{`Total booking: ${events.length}`}</div>
          </div>
          <div>
            {events.map(
              (
                event //limit the event data
              ) => (
                <Link
                  className="space-y-4 sm:space-y-4 p-2 flex justify-between bg-[#0f592e]/9 cursor-pointer hover:-translate-y-1 transition-transform"
                  to={`/admin/events/event-data/${event._id}`}
                >
                  <div className="space-y-8">
                    <div className="leading-[1.4rem]">
                      <div className="text-[1.1rem] font-medium">
                        {event.event_name}
                      </div>
                      <div className="text-[.9rem] text-neutral-600">
                        {event.event}
                      </div>
                    </div>
                    <div>
                      <div className="text-[.9rem]">
                        Stage:{" "}
                        <span className="font-medium">{event.stage}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-end leading-[1.1rem]">
                      <div className="text-[1.2rem] font-medium">
                        # {event.booking_number}
                      </div>
                    </div>
                  </div>
                </Link>
              )
            )}
          </div>
          {events.length > 0 && (
            <div className="p-4 bg-red-50 text-red-900 mt-[17rem] font-medium">
              Note: No events can be added on this date. Already a booking found
              on this date
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EventDetails;
