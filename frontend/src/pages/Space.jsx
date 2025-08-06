import useData from "../hooks/useData";
import TermsBanner from "../components/TermsBanner.jsx";

const Space = () => {
  const { getSpace } = useData();
  const {
    name,
    main_description,
    short_description,
    inner_image,
    images,
    features,
  } = getSpace();
  return (
    <main className="min-h-screen pt-[3.5rem] md:pt-[3.5rem] lg:pt-[4.5rem] w-[90%] xl:w-[85%] mx-auto space-y-8">
      <div className="space-y-4 md:space-y-3">
        <div className="flex flex-col lg:flex-row items-baseline lg:items-baseline-last  lg:justify-between">
          <h1 className="text-[1.4rem] lg:text-[2rem] lg:leading-[2.3rem] xl:text-[2.5rem] text-[#0f592e] uppercase font-semibold font--marriweather">
            {name}
          </h1>
          <p className="hidden md:block w-full lg:max-w-[50rem] sm:text-[1.2rem] text-[#364e40] sm:leading-[1.5rem] sm:text-justify">
            {main_description}
          </p>
          <p className="md:hidden text-[1.05rem]">{short_description}</p>
        </div>
        <div className="relative h-[20rem] md:h-[25rem] mx-auto rounded-[1.5rem]">
          <img
            src={inner_image}
            alt=""
            width={600}
            height={400}
            className="w-full h-full rounded-[.5rem] md:rounded-[.8rem] object-bottom object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
        </div>
      </div>
      <div className="my-[3rem] flex flex-col md:flex-row justify-between space-y-4">
        <div className="w-2/12 text-[1.2rem] xl:text-[1.4rem] text-[#0f592e] font-semibold leading-[1.7rem] md:leading-[1.6rem] font-marriweather uppercase">
          Our Offerings
        </div>
        <div className="w-full md:w-9/12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 self-end gap-3">
          {features?.map(({ icon: Icon, ...f }) => (
            <div
              className={`${f.class} border border-neutral-400 text-[#081e10]  relative min-h-32 rounded-[.5rem]`}
            >
              <div className=" flex flex-col gap-1 items-center justify-center h-full ">
                {f.value ? (
                  <div className="text-[1.2rem] sm:text-[1.4rem] font--inter-tight font-medium">
                    {f.value}
                  </div>
                ) : (
                  <Icon className="w-7 sm:w-8 h-7 sm:h-8" weight="regular" />
                )}
                <div className="font--inter-tight sm:text-[1.1rem] lg:text-[1.2rem] text-center font-medium">
                  {f.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="my-[3rem] flex flex-col md:flex-row justify-between space-y-4">
        <div className="w-2/12 text-[1.2rem] xl:text-[1.4rem] text-[#0f592e] font-semibold leading-[1.7rem] sm:leading-[2.5rem] font-marriweather uppercase">
          Images
        </div>
        <div className="w-full md:w-9/12 flex flex-col gap-4 lg:gap-5">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 lg:gap-5 w-full ">
            <img
              src={images.image1}
              alt="gardenia image 1"
              className="h-[15rem] sm:h-[18rem] md:h-[20rem] w-full object-cover object-bottom lg:rounded-[.8rem]"
            />
            <img
              src={images.image2}
              alt="gardenia image 2"
              className="h-[15rem] sm:h-[18rem] md:h-[20rem] w-full object-cover object-bottom lg:rounded-[.8rem]"
            />
          </div>
          <div className="h-[15rem] sm:h-[18rem] md:h-[20rem] w-full object-cover object-bottom ">
            <img
              src={images.image3}
              alt="gardenia image 3"
              className="h-full w-full object-cover lg:rounded-[.8rem]"
            />
          </div>
        </div>
      </div>
      <TermsBanner />
    </main>
  );
};

export default Space;
