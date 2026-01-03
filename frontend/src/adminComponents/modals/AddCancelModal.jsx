import { CheckCircle, X } from "phosphor-react";

const AddCancelModal = ({ open, reSchedule }) => {
  const { cancelledEvents, selected, setSelected } = reSchedule;
  return (
    <div className="w-[40rem] bg-white py-4 px-6 mb-[2rem] font--inter-tight">
      <div className="flex justify-between items-center">
        <div className="text-[1.6rem] font-medium font--dm-serif-display">
          ReSchedule Cancelled Event
        </div>
        <X
          className="w-[1.3rem] h-[1.3rem] text-red-700 cursor-pointer"
          onClick={() => open(false)}
        />
      </div>
      <div className="space-y-4">
        <div>
          Cancelled events with reschedule options are available. You may link
          this event to any one cancelled rescheduled event below, if
          applicable.
        </div>
        <div className="space-y-2">
          {cancelledEvents.map((event) => (
            <div
              className="p-2 border border-neutral-400 space-y-2 cursor-pointer hover:border-green-800 transition-colors relative"
              onClick={() => setSelected(event)}
            >
              <div>
                <div>
                  Event's Booking Number :{" "}
                  <span className="font-medium">
                    {event.event.booking_number}
                  </span>
                </div>
                <div>
                  Event Type :{" "}
                  <span className="font-medium">{event.event.event}</span>
                </div>
              </div>
              <div>
                <div>
                  Booker Name :{" "}
                  <span className="font-medium">{event.booker_name}</span>
                </div>
                <div>
                  Phone Numbers :{" "}
                  <span className="font-medium">{`${event.number_1}, ${event.number_2}`}</span>
                </div>
              </div>
              {selected && selected._id === event._id && (
                <CheckCircle
                  className="absolute top-2 right-2 w-[1.1rem] h-[1.1rem] text-blue-800"
                  weight="fill"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddCancelModal;
