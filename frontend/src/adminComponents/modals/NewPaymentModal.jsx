const NewPaymentModal = () => {
  return (
    <div className="w-[40rem] bg-white space-y-8 p-6 mb-[7rem]">
      <div className="text-[1.6rem] font-medium font--dm-serif-display">
        Add new payment
      </div>
      <form className="font--inter-tight">
        <div className="flex gap-2">
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="">Payment Type</label>
            <select name="" id="" className="modal--input">
              <option value="partial">Partial</option>
              <option value="final">Final</option>
            </select>
          </div>
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="">Amount Paid</label>
            <input type="number" className="modal--input" />
          </div>
        </div>
        <div></div>
      </form>
    </div>
  );
};

export default NewPaymentModal;
