import { X } from "phosphor-react";

const DiscountModal = ({ handleMode }) => {
  return (
    <div className="relative w-[40rem] bg-white space-y-8 mb-[2rem] p-4">
      <div className="font--dm-serif-display font-medium text-[1.6rem]">
        Add Discount
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

export default DiscountModal;
