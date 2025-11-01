const PaymentInfo = ({ data, change }) => {
  return (
    <section className="space-y-2">
      <div className="font-medium text-start">Payment Information</div>
      <div className="grid grid-cols-3 gap-x-4 gap-y-2">
        <div>
          <label htmlFor="">Total Amount</label>
          <input
            type="number"
            className="a--input"
            name="total_amount"
            value={data.total_amount}
            onChange={change}
          />
        </div>
        <div>
          <label htmlFor="">Payment Type</label>
          <select
            name="payment_type"
            id=""
            className="a--input"
            value={data.payment_type}
            onChange={change}
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
          <label htmlFor="">Amount Paid</label>
          <input
            type="number"
            className="a--input"
            name="paid_amount"
            value={data.paid_amount}
            onChange={change}
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
