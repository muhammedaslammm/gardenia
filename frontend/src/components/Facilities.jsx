import LeftCard from "./LeftCard";
import convention_facilities from "../data/facilities";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef, useLayoutEffect } from "react";
import NormalCard from "./NormalCard";
import useIsMobile from "../customhooks/useIsMobile";

const Facilities = () => {
  const containerRef = useRef();
  const isMobile = useIsMobile();
  // useLayoutEffect(() => {
  //   if (isMobile) return;
  //   const context = gsap.context(() => {
  //     const onLoad = () => {
  //       const elements = gsap.utils.toArray(".facility-fade");
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
  // }, [isMobile]);
  return (
    <section
      id="facilities"
      className="py-10 lg:py-12 border-t border-[#0f592e] space-y-4 md:space-y-8 xl:space-y-4"
      ref={containerRef}
    >
      <div className="space-y-1">
        <h2 className="facility-fade heading--section">
          Our supporting facilities
        </h2>
        {/* <p className="hidden sm:block facility-fade paragraph--section">
          At Gardenia Convention Center, we prioritize comfort, convenience, and
          class. Our facilities are designed to support smooth event execution
          and enhance guest experience
        </p> */}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-8 lg:gap-6 space-y-4 xl:space-y-4">
        {convention_facilities.map((facility, index) => (
          <div className="facility-fade" key={index}>
            <NormalCard data={facility} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Facilities;
