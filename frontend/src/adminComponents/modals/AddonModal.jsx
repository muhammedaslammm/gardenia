import { X } from "phosphor-react";
import ModalLabel from "./ModalLabel";
import { useState } from "react";
import { useForm } from "react-hook-form";

const AddonModal = ({ handleMode }) => {
  let [expenses, setExpenses] = useState([]);
  let [totalAmount, setTotalAmount] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { return_name: "", amount: "" } });

  const addExpense = (values) => {
    console.log("submitted values:", values);
    setExpenses((prev) => [...prev, values]);
    setTotalAmount((prev) => Number(prev) + Number(values.amount));
    reset();
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
            <ModalLabel title="Return Name" error={errors?.return_name} />
            <input
              type="text"
              className="modal--input placeholder:!text-neutral-500 "
              placeholder="Eg: Additional A/C"
              {...register("return_name", { required: true })}
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
          {!expenses.length ? (
            <div className="space-y-1">
              <div className="font-medium uppercase">
                Add-ons / Supplemental Charges
              </div>
              <div className="text-neutral-900">
                Miscellaneous expenses are not added so far. If any expenses
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
                  {expenses.map((expense) => (
                    <div className="flex justify-between py-1 border-b border-neutral-300 last:border-0">
                      <div>{expense.return_name}</div>
                      <div>{expense.amount}</div>
                    </div>
                  ))}
                  <div className="flex justify-between py-1 mt-auto">
                    <div>Total</div>
                    <div className="font-medium">{totalAmount}</div>
                  </div>
                </div>
              </div>
              <button className="p-3 bg-black text-white font-medium cursor-pointer self-end">
                Submit this return
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
