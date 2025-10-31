const PaymentInfo = () => {
  return (
    <section className="space-y-2">
      <div className="font-medium text-start">Payment Information</div>
      <div className="grid grid-cols-3 gap-x-4 gap-y-2">
        <div>
          <label htmlFor="">Total Amount</label>
          <input type="number" className="a--input" />
        </div>
        <div>
          <label htmlFor="">Payment Type</label>
          <select name="" id="" className="a--input">
            <option value="" disabled selected>
              Select Payment Type
            </option>
            {["Advance", "Partial", "Final"].map((p_type) => (
              <option>{p_type}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="">Amount Paid</label>
          <input type="number" className="a--input" />
        </div>
        <div></div>
        <div></div>
        <div className="ml-auto">
          <label htmlFor="">Remaining Amount</label>
          <input type="text" className="a--input" value={""} disabled />
        </div>
      </div>
    </section>
  );
};

export default PaymentInfo;
