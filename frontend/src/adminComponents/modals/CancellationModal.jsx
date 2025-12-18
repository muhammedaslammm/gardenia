import { X } from "phosphor-react";
import { useState } from "react";

const CancellationModal = ({ handleMode, payment_timeline }) => {
  let [reschedule, setReschedule] = useState(false);
  let payable_amount = payment_timeline.reduce(
    (amt, { payment_type, paid_amount }) => {
      if (payment_type !== "discount") amt += paid_amount;
      return amt;
    },
    0
  );
  const [refundAmount, setRefundAmount] = useState(payable_amount);

  const handleReschedule = () => {
    setReschedule((prev) => !prev);
    setRefundAmount(payable_amount);
  };

  const handleRefundAmount = (e) => {
    console.log(e.target.value);
    let value = e.target.value;
    if (Number(value) <= payable_amount) setRefundAmount(e.target.value);
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
      <div className="my-4 space-y-4">
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
          <div>Refund Amount</div>
          <input
            type="number"
            className={`modal--input ${
              reschedule && "cursor-not-allowed opacity-70"
            }`}
            value={refundAmount}
            onChange={handleRefundAmount}
            disabled={reschedule}
          />
        </div>
      </div>
    </div>
  );
};

export default CancellationModal;
