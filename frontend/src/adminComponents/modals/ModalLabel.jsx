import { Asterisk } from "phosphor-react";

const ModalLabel = ({ title, error }) => {
  return (
    <div className="flex items-center gap-1">
      <label htmlFor="">{title}</label>
      {error && <Asterisk className="text-red-700 w-[.8rem] h-[.8rem]" />}
    </div>
  );
};

export default ModalLabel;
