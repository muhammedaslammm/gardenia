import { X } from "phosphor-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ModalLabel from "./ModalLabel";
import ButtonLoading from "./ButtonLoading";

const NewPaymentModal = ({ handleMode, remainingAmount, eventId, refetch }) => {
  let BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  let [preview, setPreview] = useState(remainingAmount);
  let [loading, setLoading] = useState(false);
  let {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { payment_type: "", paid_amount: "" },
  });

  const handlePreview = (value) => {
    setPreview(remainingAmount - value);
  };

  const submitPayment = async (values) => {
    try {
      setLoading(true);
      let response = await fetch(
        `${BACKEND_URL}/api/events/${eventId}/payments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
          credentials: "include",
        }
      );
      setLoading(false);
      let result = await response.json();
      if (!response.ok) throw new Error(result.message);
      reset();
      handleMode(null);
      refetch();
    } catch (error) {
      console.log("new payment add error:", error.message);
    }
  };

  return (
    <div className="w-[40rem] bg-white space-y-8 py-4 px-6 mb-[2rem] relative">
      <div className="text-[1.6rem] font-medium font--dm-serif-display">
        Add new payment
      </div>
      <form
        className="font--inter-tight flex flex-col gap-4"
        onSubmit={handleSubmit(submitPayment)}
      >
        <div className="flex gap-2">
          <div className="w-full flex flex-col gap-1">
            <ModalLabel title="Payment Type" error={errors?.payment_type} />
            <select
              name=""
              id=""
              className="modal--input"
              {...register("payment_type", { required: true })}
            >
              <option value="" selected disabled>
                Select Payment Type
              </option>
              <option value="partial">Partial</option>
              <option value="final">Final</option>
            </select>
          </div>
          <div className="w-full flex flex-col gap-1">
            <ModalLabel title="Paid Amount" error={errors?.paid_amount} />
            <input
              type="number"
              className="modal--input"
              {...register("paid_amount", {
                required: true,
                onChange: (e) => handlePreview(e.target.value),
                validate: (v) => Number(v) <= remainingAmount,
              })}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-1 overflow-hidden">
            <label htmlFor="">Remaining Amount</label>
            <div className="p-2 bg-green-100">
              {Intl.NumberFormat("en-IN").format(preview)}
            </div>
          </div>
          <div></div>
        </div>
        <button
          className={`p-3 bg-black text-white font-medium mt-8  ${
            loading ? "cursor-not-allowed opacity-70" : "cursor-pointer"
          }`}
          disabled={loading}
          type="submit"
        >
          {loading ? <ButtonLoading /> : "Submit Payment"}
        </button>
      </form>
      <div
        className="absolute right-6 top-6 cursor-pointer"
        onClick={() => handleMode(null)}
      >
        <X className="w-[1.3rem] h-[1.3rem] text-red-700" weight="bold" />
      </div>
    </div>
  );
};

export default NewPaymentModal;
