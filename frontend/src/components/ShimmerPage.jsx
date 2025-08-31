import Shimmer from "./Shimmer";

const ShimmerPage = () => {
  return (
    <div className="relative">
      <div className="fixed left-0 top-0 w-full sm:w-[12rem] sm:h-full bg-[#081e10] h-[3rem] z-1000"></div>
      <div className="absolute md:left-[12rem] w-full md:w-[50rem] p-3 mt-[3.2rem] md:mt-[2rem] flex flex-col gap-4">
        <div className="w-full h-[20rem] relative bg-neutral-400 rounded-[.5rem] overflow-x-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent z-200 shimmer--anime"></div>
        </div>
        <div className="w-full h-[10rem] relative bg-neutral-400 rounded-[.5rem] overflow-x-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent z-200 shimmer--anime"></div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerPage;
