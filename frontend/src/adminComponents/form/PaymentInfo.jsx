import InputLabel from "../InputLabel";

const PaymentInfo = ({ register, errors, id, watch }) => {
  let total_amount = watch("total_amount");
  let paid_amount = watch("paid_amount");
  return (
    <section className="space-y-2">
      <div className="font-medium text-start">Payment Information</div>
      <div className="grid grid-cols-3 gap-x-4 gap-y-2">
        <div>
          <InputLabel title="Total Amount" error={errors.total_amount} />
          <input
            type="number"
            className={`a--input`}
            name="total_amount"
            {...register("total_amount", { required: !id ? true : false })}
          />
        </div>
        <div>
          <InputLabel title="Payment Type" error={errors.payment_type} />
          <select
            name="payment_type"
            id=""
            className={`a--input`}
            {...register("payment_type", { required: !id ? true : false })}
          >
            <option value="" disabled>
              Select Payment Type
            </option>
            {["advance", "partial", "final"].map((p_type) => (
              <option className="capitalize">{p_type}</option>
            ))}
          </select>
        </div>
        <div>
          <InputLabel title="Amount Paid" error={errors.paid_amount} />
          <input
            type="number"
            className={`a--input`}
            name="paid_amount"
            {...register("paid_amount", {
              required: !id ? true : false,
              validate: (amount) =>
                Number(amount) <= Number(watch("total_amount")),
            })}
          />
        </div>
        <div></div>
        <div></div>
        <div className="">
          <label htmlFor="">Remaining Amount</label>
          <input
            type="text"
            className="a--input"
            value={Intl.NumberFormat("en-IN").format(
              (Number(total_amount) || 0) - (Number(paid_amount) || 0)
            )}
            disabled
          />
        </div>
      </div>
    </section>
  );
};

export default PaymentInfo;
