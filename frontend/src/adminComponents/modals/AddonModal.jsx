import { Spinner, X } from "phosphor-react";
import ModalLabel from "./ModalLabel";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import ButtonLoading from "./ButtonLoading";

const AddonModal = ({ handleMode, eventId, refetch }) => {
  let [items, setItems] = useState([]);
  let [totalAmount, setTotalAmount] = useState(0);
  let [dataLoading, setDataLoading] = useState(true);
  let [loading, setLoading] = useState(false);
  let BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { charge_name: "", amount: "" } });

  const addExpense = (values) => {
    setItems((prev) => [...prev, values]);
    setTotalAmount((prev) => Number(prev) + Number(values.amount));
    reset();
  };

  useEffect(() => {
    let getItems = async () => {
      try {
        setDataLoading(true);
        let response = await fetch(
          `${BACKEND_URL}/api/events/${eventId}/add-ons`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        let result = await response.json();
        setDataLoading(false);
        if (!response.ok) throw new Error(result.message);
        console.log("event extra charges:", result.charges);
        setItems(result.charges.addon_charges.items);
        setTotalAmount(result.charges.addon_charges.total_amount || 0);
      } catch (error) {
        console.log("add on fetch errors:", error.message);
      }
    };
    getItems();
  }, []);

  const submitItems = async () => {
    try {
      let data = { total_amount: totalAmount, items };
      setLoading(true);
      let response = await fetch(
        `${BACKEND_URL}/api/events/${eventId}/add-ons`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
        }
      );
      setLoading(false);
      let result = await response.json();
      if (!response.ok) throw new Error(result.message);
      console.log(result.message);
      handleMode(null);
      refetch();
    } catch (error) {
      console.log("add on post failed:", error.message);
    }
  };

  return (
    <div className="relative w-[40rem] bg-white space-y-8 mb-[2rem] p-4">
      <div className="font--dm-serif-display font-medium text-[1.6rem]">
        Add-ons / Supplemental Charges
      </div>
      <div className="mb-8">
        <form
          className="flex gap-2 font--inter-tight"
          onSubmit={handleSubmit(addExpense)}
        >
          <div className="space-y-1">
            <ModalLabel title="Return Name" error={errors?.charge_name} />
            <input
              type="text"
              className="modal--input placeholder:!text-neutral-500 "
              placeholder="Eg: Additional A/C"
              {...register("charge_name", { required: true })}
            />
          </div>
          <div className="space-y-1">
            <ModalLabel title="Amount" error={errors?.amount} />
            <input
              type="number"
              className="modal--input"
              {...register("amount", { required: true })}
            />
          </div>
          <button
            className="underline self-end w-full cursor-pointer hover:text-purple-800 transition-colors"
            type="submit"
          >
            Add This Expense
          </button>
        </form>
        <div className="mt-8 py-6 border-t border-neutral-400 font--inter-tight">
          {dataLoading ? (
            <div className="flex flex-col items-center p-2 bg-neutral-200">
              <Spinner className="w-[1.2rem] h-[1.2rem] animate-spin" />
              <div>Loading existing returns...</div>
            </div>
          ) : !items.length ? (
            <div className="space-y-1">
              <div className="font-medium uppercase">
                Add-ons / Supplemental charges
              </div>
              <div className="text-neutral-900">
                Miscellaneous charges are not added so far. If any charges
                incurred, fill them above and submit.
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              <div>
                <div className="flex justify-between font-medium">
                  <div>Return Type</div>
                  <div>Amount</div>
                </div>
                <div className="">
                  {items.map((expense) => (
                    <div className="flex justify-between py-1 border-b border-neutral-300 last:border-0">
                      <div>{expense.charge_name}</div>
                      <div>{expense.amount}</div>
                    </div>
                  ))}
                  <div className="flex justify-between py-1 mt-auto">
                    <div>Total</div>
                    <div className="font-medium">{totalAmount}</div>
                  </div>
                </div>
              </div>
              <button
                className={`p-3 bg-black text-white font-medium self-end ${
                  loading ? "cursor-not-allowed opacity-70" : "cursor-pointer"
                }`}
                onClick={submitItems}
                disabled={loading}
              >
                {loading ? <ButtonLoading /> : "Submit this return"}
              </button>
            </div>
          )}
        </div>
      </div>
      <div
        className="absolute right-6 top-6 cursor-pointer"
        onClick={() => handleMode(null)}
      >
        <X className="w-[1.3rem] h-[1.3rem] text-red-700" weight="bold" />
      </div>
    </div>
  );
};

export default AddonModal;
