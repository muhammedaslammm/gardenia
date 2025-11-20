import InputLabel from "../InputLabel";

const PaymentInfo = ({ register, errors }) => {
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
            {...register("total_amount", { required: true })}
          />
        </div>
        <div>
          <InputLabel title="Payment Type" error={errors.payment_type} />
          <select
            name="payment_type"
            id=""
            className={`a--input`}
            {...register("payment_type", { required: true })}
          >
            <option value="" disabled>
              Select Payment Type
            </option>
            {["advance", "partial", "final"].map((p_type) => (
              <option>{p_type}</option>
            ))}
          </select>
        </div>
        <div>
          <InputLabel title="Amount Paid" error={errors.paid_amount} />
          <input
            type="number"
            className={`a--input`}
            name="paid_amount"
            {...register("paid_amount", { required: true })}
          />
        </div>
        <div></div>
        <div></div>
        <div className="">
          <label htmlFor="">Remaining Amount</label>
          <input type="text" className="a--input" value={""} disabled />
        </div>
      </div>
    </section>
  );
};

export default PaymentInfo;
