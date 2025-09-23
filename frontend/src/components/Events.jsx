import events from "../data/events";

const Events = () => {
  return (
    <section
      id="events"
      className="py-10 lg:py-12 border-t border-[#0f592e] space-y-4 sm:space-y-6 xl:space-y-12"
    >
      <div className="space-y-1">
        <h2 className="heading--section">events we host</h2>
        <p className="hidden sm:block paragraph--section">
          Gardenia Convention Center is thoughtfully designed to accommodate a
          diverse range of gatherings with ease and elegance. Our flexible
          spaces, premium facilities, and attention to detail ensure every event
          hosted here is seamless, memorable, and executed to the highest
          standards.
        </p>
      </div>
      <div className="bottom grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4 w-full mx-auto">
        {events.map(({ title, icon: Icon }) => (
          <div className="bg-[#0f592e]/10 border border-[#a3c0af] rounded-[.0rem] flex flex-col gap-2 items-center justify-center p-8 h-[10rem]">
            <Icon
              weight="regular"
              color="#0f592e"
              className="w-8 lg:w-9 h-8 lg:h-9"
            />
            <p
              className="text-[.9rem] font-medium leading-[1rem] xl:leading-[1.5rem] lg:text-[.9rem] xl:text-[1.2rem] text-center text-neutral-700"
              style={{ fontFamily: "Inter Tight, serif" }}
            >
              {title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Events;
