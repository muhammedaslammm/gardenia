import { Spinner, X } from "phosphor-react";
import { events, stages } from "../data/admin";
const SlideinForm = ({ utils }) => {
  const { eventFormData } = utils;
  return (
    <div
      className={`absolute inset-0 bg-[#fffef7] ${
        eventFormData.showForm ? "translate-x-0" : "translate-x-full"
      } transition space-y-2 p-2 z-100`}
    >
      <div className="flex justify-between items-center">
        <div className="font-medium">Event Form</div>
        <div
          className="text-red-900 font-semibold mr-4 mt-1 cursor-pointer"
          onClick={() => eventFormData.setShowForm(false)}
        >
          <X weight="bold" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <div className="space-y-1 w-1/2">
            <div className="admin_form--label">
              <div>Event</div>
              {eventFormData.errors.event && (
                <div className="admin_form--error">
                  {eventFormData.errors.event}
                </div>
              )}
            </div>
            <select
              name="event"
              id=""
              className="a--input"
              onChange={eventFormData.handleEventForm}
            >
              <option
                value=""
                selected={!eventFormData.eventTitle.event}
                disabled
              >
                Select One Field
              </option>
              {events.map((event) => (
                <option
                  value={event}
                  selected={eventFormData.eventTitle.event === event}
                >
                  {event}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1 w-1/2">
            <div className="admin_form--label">
              <div>Stage</div>
              {eventFormData.errors.stage && (
                <div className="admin_form--error">
                  {eventFormData.errors.stage}
                </div>
              )}
            </div>

            <select
              name="stage"
              id="event"
              className="a--input"
              onChange={eventFormData.handleEventForm}
            >
              <option
                value=""
                disabled
                selected={!eventFormData.eventTitle.stage}
              >
                Select one stage space
              </option>
              {stages.map((stage) => (
                <option
                  value={stage}
                  selected={eventFormData.eventTitle.stage === stage}
                >
                  {stage}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="space-y-1">
          <div className="admin_form--label">
            <div>Event Title</div>
            {eventFormData.errors.event_title && (
              <div className="admin_form--error">
                {eventFormData.errors.event_title}
              </div>
            )}
          </div>
          <input
            type="text"
            name="event_title"
            className="a--input"
            placeholder="Eg: Aabce Weds Yeefg"
            value={eventFormData.eventTitle.event_title}
            onChange={eventFormData.handleEventForm}
          />
        </div>
        <div className="flex gap-2">
          <div className="w-1/2 space-y-1">
            <div className="admin_form--label">
              <div>Start Time</div>
              {eventFormData.errors.start_time && (
                <div className="admin_form--error">
                  {eventFormData.errors.start_time}
                </div>
              )}
            </div>
            <input
              type="time"
              name="start_time"
              className="a--input"
              value={eventFormData.eventTime.start_time}
              onChange={eventFormData.handleEventForm}
            />
          </div>
          <div className="w-1/2 space-y-1">
            <div className="admin_form--label">
              <div>End Time</div>
              {eventFormData.errors.end_time && (
                <div className="admin_form--error">
                  {eventFormData.errors.end_time}
                </div>
              )}
            </div>
            <input
              type="time"
              name="end_time"
              className="a--input"
              value={eventFormData.eventTime.end_time}
              onChange={eventFormData.handleEventForm}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="space-y-1 w-4/6">
            <div className="admin_form--label">
              <div>Phone Number</div>
              {eventFormData.errors.phone_number && (
                <div className="admin_form--error">
                  {eventFormData.errors.phone_number}
                </div>
              )}
            </div>
            <input
              type="tel"
              name="phone_number"
              id="contact"
              placeholder="Eg: 9099989787"
              className="a--input"
              value={eventFormData.contact.phone_number}
              onChange={eventFormData.handleEventForm}
            />
          </div>
          <div className="space-y-1 w-2/6">
            <div className="admin_form--label">
              <div>CN</div>
              {eventFormData.errors.contract_number && (
                <div className="admin_form--error">
                  {eventFormData.errors.contract_number}
                </div>
              )}
            </div>

            <input
              type="number"
              name="contract_number"
              placeholder="Eg: 234"
              className="a--input"
              value={eventFormData.contact.contract_number}
              onChange={eventFormData.handleEventForm}
            />
          </div>
        </div>

        <button
          disabled={eventFormData.buttonState === "loading"}
          className={`bg-[#0f592e] text-white mt-4 py-2 w-full ${
            eventFormData.buttonState === "loading"
              ? "cursor-not-allowed opacity-60"
              : "cursor-pointer"
          }`}
          onClick={eventFormData.submitEvent}
        >
          {eventFormData.update ? (
            "Update Event"
          ) : eventFormData.buttonState === "loading" ? (
            <Spinner className="w-5 h-5 animate-spin" />
          ) : (
            "Create Event"
          )}
        </button>
      </div>
    </div>
  );
};

export default SlideinForm;
