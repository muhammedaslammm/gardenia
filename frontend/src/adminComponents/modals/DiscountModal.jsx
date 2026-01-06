import { X } from "phosphor-react";
import ModalLabel from "./ModalLabel";
import { useForm } from "react-hook-form";
import { useState } from "react";
import ButtonLoading from "./ButtonLoading";

const DiscountModal = ({ handleMode, eventId, remainingAmount, refetch }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { paid_amount: "", payment_type: "discount" } });

  let [loading, setLoading] = useState(false);

  let BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const submitDiscount = async (values) => {
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
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      reset();
      handleMode(null);
      refetch();
    } catch (error) {
      console.log("discount creation failure:", error.message);
    }
  };

  return (
    <div className="relative w-[40rem] font--inter-tight bg-white space-y-8 mb-[2rem] p-4">
      <div className="font--dm-serif-display font-medium text-[1.6rem]">
        Add Discount
      </div>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(submitDiscount)}
      >
        <div className="flex gap-4">
          <div className="w-full space-y-1">
            <div>Remaining Amount</div>
            <div className="bg-yellow-50 border p-2">
              {Intl.NumberFormat("en-IN").format(remainingAmount)}
            </div>
          </div>
          <div className="w-full space-y-1">
            <ModalLabel title="Discount Amount" error={errors.paid_amount} />
            <input
              type="number"
              className="modal--input w-full"
              {...register("paid_amount", {
                required: true,
                validate: (v) => Number(v) <= Number(remainingAmount),
              })}
            />
          </div>
        </div>
        <button
          className={`p-3 bg-black text-white font-medium self-end mt-8 ${
            loading ? "cursor-not-allowed opacity-70" : "cursor-pointer"
          }`}
          type="submit"
          disabled={loading}
        >
          {loading ? <ButtonLoading /> : "Add Discount"}
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

export default DiscountModal;
