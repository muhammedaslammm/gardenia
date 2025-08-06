import { Link } from "react-router-dom";

const TermsBanner = () => {
  return (
    <section id="terms" className="py-10 lg:py-12 border-t border-[#0f592e]">
      <div className="bg-green-100 p-4 sm:p-8 flex flex-col gap-12 rounded-[.5rem]">
        <div className="space-y-3 sm:space-y-1">
          <h1 className="font--dm-serif-display text-[#081e10] text-[1.3rem] sm:text-[1.6rem] leading-[1.6rem] capitalize">
            Event hall terms & conditions
          </h1>
          <p className="text-[1rem] sm:text-[1.2rem] leading-[1.5rem] text-neutral-800">
            Please review our key guidelines including advance payments,
            cancellation policy, usage limits, and more.
          </p>
        </div>

        <Link
          to="/terms"
          className="sm:text-[1.15rem] text-neutral-600 font--inter-tight underline hover:text-green-700"
        >{`View full terms & conditon ->`}</Link>
      </div>
    </section>
  );
};

export default TermsBanner;
