import { useState } from "react";
import SlideinForm from "./SlideinForm";

import { months } from "../data/days";
import { TrashSimple, PencilSimpleLine } from "phosphor-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import convertTo12hour from "../utils/convertTo12hour";

const EventDetails = ({ utils }) => {
  const { dateDetails, eventFormData, eventDelete } = utils;
  const formUtils = { eventFormData };

  const { day, monthname, year, past, events } = dateDetails || {};
  const current_date = `${monthname} ${day}, ${year}`;

  return (
    <div className="pt-6  border-t border-neutral-300 sm:border-t-0 sm:pt-0 lg:w-4/12 flex flex-col gap-2 sm:gap-1 relative overflow-x-hidden">
      {/* top block */}
      <div className="flex justify-between items-end">
        <div className="font-medium sm:text-[1rem]">Event Details</div>
        {/* <button
          className={
            "a-button !text-[.9rem] sm:!text-[.9rem] block text-green-700 underline hover:text-violet-700"
          }
          onClick={eventFormData.handleSlideinform}
        >
          Add Event
        </button> */}
      </div>

      {/* bottom block */}
      {events && !events.length ? (
        <div className="border border-neutral-300 h-full flex flex-col justify-between gap-4">
          <div className="p-2 leading-[1.3rem] flex flex-col h-full">
            <p className="font-medium text-[1rem] sm:text-[1.1rem]">
              {current_date}
            </p>
            <div className="text-[.9rem] mt-4">
              <div className="text-[1rem]">No Events added on this date</div>
              <p className=" text-neutral-800">
                Click "add event" button to add a new event on this date.
              </p>
            </div>
            <Link
              to={`/admin/events/event-management?date=${dateDetails?.iso_date}`}
              className="py-1 px-3 bg-green-800 text-white text-[.9rem] mt-auto  self-end hover:bg-green-900 transition-colors cursor-pointer"
            >
              Add Event
            </Link>
          </div>
          <div className="background-image--admin h-[20rem]"></div>
        </div>
      ) : (
        <div className="border border-neutral-300 flex-1 mt-1 p-2">
          <div className="pb-2 sm:pb-4">
            <div className="font-medium text-[.9rem] sm:text-[1rem]">{`${monthname} ${day}, ${year}`}</div>
            <div className="text-[.8rem] sm:text-[.9rem]">{`Total booking: ${
              events && events.length
            }`}</div>
          </div>
          <div>
            {events &&
              events.map(
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
          {events && events.length > 0 && (
            <div className="p-4 bg-red-50 text-red-900 mt-[17rem] font-medium">
              Note: No events can be added on this date. Already a booking found
              on this date
            </div>
          )}
        </div>
      )}
      <SlideinForm utils={formUtils} />
    </div>
  );
};

export default EventDetails;
