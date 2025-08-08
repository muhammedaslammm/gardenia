const NormalCard = ({ data }) => {
  return (
    <div className="space-y-1 sm:space-y-2 xl:space-y-3">
      <h2 className="text-[#0f592e] font-medium sm:text-[1.1rem] lg:text-[1.2rem] xl:font-semibold xl:uppercase ">
        {data.index_number}. {data.name}
      </h2>
      <div className="overflow-hidden">
        <img
          src={data.image}
          alt=""
          className="image-fade h-[10rem] lg:h-[12rem] xl:h-[13rem] w-full object-cover"
        />
      </div>

      <div
        className="xl:text-end text-[#0f592e] space-y-0 mt-2 sm:space-y-0 lg:space-y-1"
        style={{ fontFamily: "Inter Tight, serif" }}
      >
        <p className="text-[.95rem] sm:text-[1rem] lg:text-[1rem]  font-medium xl:uppercase xl:font-semibold ">
          {data.highlight}
        </p>
        <p className="text-[.95rem] sm:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] leading-[1rem] xl:leading-[1.3rem]">
          {data.short_description}
        </p>
      </div>
    </div>
  );
};

export default NormalCard;
