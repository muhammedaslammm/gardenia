import { Asterisk, Spinner, X } from "phosphor-react";
import { useState } from "react";

const CancellationModal = ({
  eventId,
  handleMode,
  payment_timeline,
  refetch,
}) => {
  let payable_amount = payment_timeline.reduce(
    (amt, { payment_type, paid_amount }) => {
      if (payment_type !== "discount") amt += paid_amount;
      return amt;
    },
    0
  );

  const [reScheduled, setRescheduled] = useState(false);
  const [refundAmount, setRefundAmount] = useState(payable_amount);
  const [reasonNote, setReasonNote] = useState("");
  const [amountError, setAmountError] = useState(false);

  const [loading, setLoading] = useState(false);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleReschedule = () => {
    setRescheduled((prev) => !prev);
    setRefundAmount(payable_amount);
  };

  const handleRefundAmount = (e) => {
    setAmountError(false);
    let value = e.target.value;
    if (Number(value) <= payable_amount) setRefundAmount(e.target.value);
  };

  const cancelEvent = async () => {
    if (!refundAmount.toString().trim()) setAmountError(true);
    try {
      setLoading(true);
      const response = await fetch(
        `${BACKEND_URL}/api/events/${eventId}/cancel`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reScheduled, refundAmount, reasonNote }),
        }
      );
      const result = await response.json();
      setLoading(false);
      if (!response.ok) throw new Error(result.message);
      console.log(result.message);
      refetch();
      handleMode(null);
    } catch (error) {
      console.log("cancellation error:", error.message);
    }
  };

  return (
    <div className="w-[40rem] bg-white py-4 px-6 mb-[2rem] font--inter-tight">
      <div className="flex justify-between items-center">
        <div className="text-[1.6rem] font-medium font--dm-serif-display">
          Cancel this event
        </div>
        <X
          className="w-[1.3rem] h-[1.3rem] text-red-700 cursor-pointer"
          onClick={() => handleMode(null)}
        />
      </div>
      <div className="py-2 text-neutral-700 italic">
        Events could be cancelled; however, only rescheduled events are eligible
        for a full refund, while all other refunds are subject to demand.
      </div>
      <div className="my-4 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="schedule">Schedule this event on another date</label>
          <input
            type="checkbox"
            name="schedule"
            id="schedule"
            className="w-[1rem] h-[1rem]"
            onChange={handleReschedule}
          />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <div>Refund Amount</div>
            {amountError && (
              <Asterisk className="w-[.8rem] h-[.8rem] text-red-700" />
            )}
          </div>

          <input
            type="number"
            className={`modal--input ${
              reScheduled && "cursor-not-allowed opacity-70"
            }`}
            value={refundAmount}
            onChange={handleRefundAmount}
            disabled={reScheduled}
          />
        </div>
        <div className="flex flex-col gap-1">
          <div>{`Cancellation Reason (Optional)`}</div>
          <textarea
            name=""
            id=""
            rows={10}
            className="modal--input w-full"
            value={reasonNote}
            onChange={(e) => setReasonNote(e.target.value)}
          ></textarea>
        </div>
        <button
          className={`mt-4 bg-black text-white font-medium hover:-translate-y-[.1rem] transition-transform p-2 ${
            loading ? "cursor-not-allowed hover:opacity-80" : "cursor-pointer"
          } transition-colors`}
          onClick={cancelEvent}
          disabled={loading}
        >
          {loading ? (
            <div className="flex justify-center items-center gap-2">
              Cancelling Event{" "}
              <Spinner className="animate-spin w-[1.3rem] h-[1.3rem]" />
            </div>
          ) : (
            "Cancel This Event"
          )}
        </button>
      </div>
    </div>
  );
};

export default CancellationModal;
