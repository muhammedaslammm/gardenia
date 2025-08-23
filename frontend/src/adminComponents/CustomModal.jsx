import { createPortal } from "react-dom";

const CustomModal = ({ stat, cancelModal, deleteEvent, event }) => {
  return createPortal(
    <div className="fixed inset-0 bg-black/50 ">
      <div className="absolute w-[40rem] left-[50%] -translate-x-[50%] top-[1rem] bg-white rounded-[.2rem] p-4 font--inter-tight space-y-8">
        <div className="">
          Are you sure you want to delete
          <span className="font-medium italic">{` "${event.event_title}" - ${event.event} event ?`}</span>
        </div>
        <div className="flex justify-end gap-2">
          <button onClick={cancelModal} className="a-button bg-neutral-200">
            Cancel
          </button>
          <button
            disabled={stat === "loading"}
            className={`a-button ${
              stat === "loading" ? "!cursor-not-allowed opacity-60" : ""
            } bg-red-800/90 text-white`}
            onClick={() => deleteEvent(event._id)}
          >
            Delete Event
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal--error_prompt")
  );
};

export default CustomModal;
