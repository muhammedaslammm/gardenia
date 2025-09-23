import {
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
} from "../utils/images";

const Images = () => {
  return (
    <section className="py-10 lg:py-12 border-t border-[#0f592e] space-y-4 sm:space-y-6 xl:space-y-12">
      <div className="heading--section text-[#0f592e] uppercase !text-center">
        Images
      </div>
      <div className="space-y-3 md:space-y-6 lg:space-y-4">
        <div className="flex flex-col lg:flex-row gap-3 md:gap-6 lg:gap-4">
          <div className="relative w-full lg:w-3/6 h-[20rem] sm:h-[25rem]">
            <img
              src={image1}
              alt=""
              className="w-full h-full object-cover rounded-[.0rem] lg:bg-bottom"
            />
          </div>
          <div className="w-full lg:w-3/6 h-[20rem] sm:h-[25rem] md:h-[23rem] lg:h-[25rem] flex gap-3 md:gap-6 lg:gap-4 md:px-30 lg:px-0 overflow-x-hidden">
            <img
              src={image2}
              alt=""
              className="w-[50%] h-full object-cover rounded-[.0rem]"
            />
            <img
              src={image3}
              alt=""
              className="w-[50%] h-full object-cover rounded-[.0rem]"
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-3 md:gap-6 lg:gap-4">
          <div className="w-full xl:w-3/6 h-[18rem] sm:h-[25rem] md:h-[23rem] lg:h-[25rem] flex gap-3 md:gap-6 lg:gap-4 md:px-30 lg:px-0 overflow-x-hidden">
            <img
              src={image4}
              alt=""
              className="w-1/2 h-full object-cover rounded-[.0rem]"
            />
            <img
              src={image5}
              alt=""
              className="w-1/2 h-full object-cover rounded-[.0rem]"
            />
          </div>
          <div className="w-full xl:w-3/6 h-[20rem] sm:h-[25rem]">
            <img
              src={image6}
              alt=""
              className="w-full h-full object-cover rounded-[.0rem]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Images;
