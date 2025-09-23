import { ArrowCircleUpRight } from "phosphor-react";

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
          <img
            src={data.image}
            alt={`${data.name} image`}
            className="h-[230px] sm:h-[300px] md:h-[240px] lg:h-[260px] xl:h-[350px] w-full object-cover rounded-[.2rem] sm:rounded-[.5rem] md:rounded-[.3rem] lg:rounded-[.0rem] "
          />
        </div>
      </div>
    </section>
  );
};

export default LeftCard;
