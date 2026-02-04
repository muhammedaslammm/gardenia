import { ArrowSquareOut } from "phosphor-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main>
      <Link
        to="/"
        className="bg-green-900 w-[7rem] lg:w-[10rem] pt-[.0rem] lg:pt-[1rem] mx-auto flex items-center justify-center rounded-b-[1.5rem]"
      >
        <img src="/logo/gardenia-logo-2.png" alt="gardenia logo" className="" />
      </Link>
      <div className="w-[80%] md:w-[40%] mx-auto mt-[4rem] font--inter-tight shadow-xl shadow-green-900/50 border border-green-800/20 px-4 py-[3rem] flex flex-col items-center text-[.9rem] md:text-[1rem]">
        <div className="text-[3rem] lg:text-[4rem] font-medium text-green-900">
          404
        </div>
        <div className="mt-[2rem] md:mt-[3rem] text-red-800 font-medium">
          Page Not found
        </div>
        <div className="py-2 text-center leading-[1.2rem] md:leading-[1.5rem]">
          This page might have been removed or you might have typed a wrong URL
        </div>
        <Link
          to="/"
          className="mt-8 flex items-center gap-1 hover:text-green-800"
        >
          Back to home <ArrowSquareOut weight="bold" />
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
