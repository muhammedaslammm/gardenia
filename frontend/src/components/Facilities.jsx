import convention_facilities from "../data/facilities";
import NormalCard from "./NormalCard";

const Facilities = () => {
  return (
    <section
      id="facilities"
      className="py-10 lg:py-12 border-t border-[#0f592e] space-y-4 md:space-y-8 xl:space-y-4"
    >
      <div className="space-y-1">
        <h2 className=" heading--section">Our supporting facilities</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-8 lg:gap-6 space-y-4 xl:space-y-4">
        {convention_facilities.map((facility, index) => (
          <div key={index}>
            <NormalCard data={facility} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Facilities;
