import { Asterisk } from "phosphor-react";

const InputLabel = ({ title, error }) => {
  console.log("error type", typeof error);
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-1 items-center">
        <label htmlFor="">{title}</label>
        {error && <Asterisk className="text-red-700 w-[.8rem] h-[.8rem]" />}
      </div>
      {typeof error === "string" && <div className="text-red-700">{error}</div>}
    </div>
  );
};

export default InputLabel;
