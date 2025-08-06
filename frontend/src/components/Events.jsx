import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useLayoutEffect, useRef } from "react";
import events from "../data/events";
import useIsMobile from "../customhooks/useIsMobile";

const Events = () => {
  const containerRef = useRef();
  let isMobile = useIsMobile();
  // useLayoutEffect(() => {
  //   if (isMobile) return;
  //   const context = gsap.context(() => {
  //     const onLoad = () => {
  //       const elements = gsap.utils.toArray(".event-fade");
  //       gsap.from(elements, {
  //         opacity: 0,
  //         y: 100,
  //         duration: 1,
  //         stagger: { amount: 0.7 },
  //         scrollTrigger: {
  //           trigger: containerRef.current,
  //           start: "top 80%",
  //           toggleActions: "play none none reverse",
  //         },
  //       });
  //     };

  //     if (document.readyState === "complete") onLoad();
  //     else {
  //       window.addEventListener("load", onLoad);
  //       return () => window.removeEventListener("load", onLoad);
  //     }
  //   }, containerRef);
  //   return () => context.revert();
  // });
  return (
    <section
      id="events"
      className="py-10 lg:py-12 border-t border-[#0f592e] space-y-4 sm:space-y-6 xl:space-y-12"
      ref={containerRef}
    >
      <div className="space-y-1">
        <h2 className="event-fade heading--section">events we host</h2>
        <p className="hidden sm:block event-fade paragraph--section">
          Gardenia Convention Center is thoughtfully designed to accommodate a
          diverse range of gatherings with ease and elegance. Our flexible
          spaces, premium facilities, and attention to detail ensure every event
          hosted here is seamless, memorable, and executed to the highest
          standards.
        </p>
      </div>
      <div className="bottom grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4 w-full mx-auto">
        {events.map(({ title, icon: Icon }) => (
          <div className="event-fade bg-[#0f592e]/10 border border-[#a3c0af] rounded-[.5rem] flex flex-col gap-2 items-center justify-center p-8 h-[10rem]">
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
