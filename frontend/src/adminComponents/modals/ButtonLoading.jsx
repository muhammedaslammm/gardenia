import { Spinner } from "phosphor-react";

const ButtonLoading = () => {
  return (
    <div className="flex items-center justify-center gap-2">
      <div>Submitting</div>
      <Spinner className="animate-spin w-[1.2rem] h-[1.2rem]" />
    </div>
  );
};

export default ButtonLoading;
