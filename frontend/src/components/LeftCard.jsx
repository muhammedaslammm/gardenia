import { ArrowCircleUpRight } from "phosphor-react";
import { Link } from "react-router-dom";

const LeftCard = ({ data }) => {
  return (
    <section className="flex-col space-y-8 ">
      <div className="flex flex-col lg:gap-1">
        <div className="flex items-center justify-between">
          <h3 className="block md:text-[1rem] lg:text-[1.2rem] text-[#0f592e] font-semibold uppercase ">
            {data.id}. {data.name}
          </h3>
          <ArrowCircleUpRight className="text-[1.7rem] text-[#0f592e]" />
        </div>

        <p className="text-[1rem] md:text-[1rem] lg:text-[1.15rem] leading-[1.5rem] lg:leading-[1.65rem]">
          {data.short_description}
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-2 sm:gap-3 md:gap-4">
        <div className="w-full">
          {/*md:w-5/12 xl:w-4/12  */}
          <img
            src={data.image} //{data.image}
            alt={`${data.name} image`}
            className="h-[230px] sm:h-[300px] md:h-[240px] lg:h-[260px] xl:h-[350px] w-full object-cover rounded-[.2rem] sm:rounded-[.5rem] md:rounded-[.3rem] lg:rounded-[.0rem] "
          />
        </div>
        {/* <div className="md:w-7/12 xl:8/12 flex flex-col gap-6 sm:gap-4 md:gap-0 justify-between">
          <p className="text-[1rem] md:text-[1rem] lg:text-[1.2rem] text-neutral-800 leading-[1.5rem] lg:leading-[1.8rem] text-justify ">
            {data.short_description}
          </p>
          <div className="space-y-2 md:space-y-2 self-start md:self-end">
            {data.highlights.map((h, i) => (
              <div
                key={i}
                className="text-start md:text-end text-neutral-600 leading-[1.5rem] md:leading-[1.5rem] lg:leading-[1.7rem]"
              >
                <p className=" text-[.9rem] md:text-[1rem]">{h.label}</p>
                <p
                  className="text-[1rem] md:text-[1rem] lg:text-[1.1rem] text-[#0f592e] font-semibold "
                  // style={{ fontFamily: "Inter Tight, serif" }}
                >
                  {h.data}
                </p>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default LeftCard;
