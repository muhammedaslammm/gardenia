import { Spinner } from "phosphor-react";

const LoadingPage = () => {
  return (
    <div className="flex  justify-center items-center w-full h-screen font--inter-tight">
      <div className="flex flex-col items-center mb-[5rem]">
        <Spinner className="animate-spin w-[1.5rem] h-[1.5rem]" />
        <div>Data Loading...</div>
      </div>
    </div>
  );
};

export default LoadingPage;
