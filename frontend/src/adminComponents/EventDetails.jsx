import { useState } from "react";
import SlideinForm from "./SlideinForm";

import { months } from "../data/days";
import { TrashSimple, PencilSimpleLine } from "phosphor-react";
import { toast } from "sonner";
import convertTo12hour from "../utils/convertTo12hour";

const EventDetails = ({ utils }) => {
  const { dateDetails, eventFormData, eventDelete } = utils;
  const formUtils = { eventFormData };

  const { day, monthname, year, past, events } = dateDetails || {};
  const current_date = `${day} ${monthname}, ${year}`;

  return (
    <div className="sm:w-4/12 flex flex-col gap-1 relative overflow-x-hidden">
      {/* top block */}
      <div className="flex justify-between items-end">
        <div className="font-medium text-[.9rem] sm:text-[1rem]">
          Event Details
        </div>
        <button
          title={past ? "Cannot add events on past date" : ""}
          disabled={past}
          className={`a-button  text-white ${
            past ? "hidden" : "block bg-black"
          }`}
          onClick={eventFormData.handleSlideinform}
        >
          Add Event
        </button>
      </div>

      {/* bottom block */}
      {events && !events.length ? (
        <div className="border border-neutral-300 h-full flex flex-col justify-between">
          <div className=" p-2">
            <p className="font-medium text-[1.1rem]">
              No events found for {current_date}
            </p>
            <p className="text-[.9rem] text-neutral-800">
              There are no events added on this date.
            </p>
          </div>
          <div className="background-image--admin h-[10rem]"></div>
        </div>
      ) : (
        <div className="border border-neutral-300 flex-1 mt-1 p-2">
          <div className="pb-4">
            <div className="font-medium text-[.8rem] sm:text-[1rem]">{`${monthname} ${day}, ${year}`}</div>
            <div className="text-[.8rem] sm:text-[.9rem]">{`Total booking: ${
              events && events.length
            }`}</div>
          </div>
          <div>
            {events &&
              events.map((event) => (
                <div className="space-y-4 py-4 border-t border-neutral-300">
                  <div className="flex justify-between text-[.9rem]">
                    <div className="leading-[1.4rem]">
                      <div className="text-[1.1rem] font-medium">
                        {event.event_title}
                      </div>
                      <div className="text-[.9rem] text-[#4F4F4F]">
                        {event.event}
                      </div>
                    </div>
                    <div>{`#${event.contract_number}`}</div>
                  </div>
                  <div className="space-y-3 text-[.95rem]">
                    <div className="space-y-1">
                      <div>
                        <div className="text-[#4F4F4F]">
                          Venue:{" "}
                          <span className="text-black">{event.stage}</span>
                        </div>
                        <div className="">{`${convertTo12hour(
                          event.event_date.start_time
                        )} - ${convertTo12hour(
                          event.event_date.end_time
                        )}`}</div>
                      </div>
                      <div>
                        <div className="">
                          <div className="text-[#4F4F4F]">Attendee Contact</div>
                          <div>{event.phone_number}</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-[#4F4F4F] text-[.9rem]">
                        Updated By : {event.updated_by}
                      </div>
                      <div className="flex items-end gap-2">
                        <PencilSimpleLine
                          className="cursor-pointer w-4 h-4"
                          onClick={() =>
                            eventFormData.setFormDataforUpdate(event)
                          }
                        />

                        <TrashSimple
                          className="cursor-pointer w-4 h-4 text-red-800"
                          onClick={() => eventDelete.showModal(event)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
      <SlideinForm utils={formUtils} />
    </div>
  );
};

export default EventDetails;
