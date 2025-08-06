import { useLayoutEffect, useRef } from "react";
import chooseusSection from "../data/chooseusSection";
import gsap from "gsap";
import ScrollTrigger from "gsap/all";
import useIsMobile from "../customhooks/useIsMobile";

const ChooseUs = () => {
  const containerRef = useRef();
  const isMobile = useIsMobile();
  // useLayoutEffect(() => {
  //   if (isMobile) return;
  //   const context = gsap.context(() => {
  //     const onLoad = () => {
  //       const elements = gsap.utils.toArray(".fade");
  //       gsap.from(elements, {
  //         y: 100,
  //         opacity: 0,
  //         duration: 1,
  //         stagger: { amount: 0.7 },
  //         scrollTrigger: {
  //           trigger: containerRef.current,
  //           start: "top 75%",
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
  // }, []);
  return (
    <section
      className="py-10 lg:py-12 border-t border-[#0f592e] space-y-4 sm:space-y-6 lg:space-y-8 xl:space-y-12"
      ref={containerRef}
    >
      <div className="space-y-1">
        <h2 className="fade heading--section">{chooseusSection.title}</h2>
        <p className="hidden sm:block fade paragraph--section">
          {chooseusSection.description}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {chooseusSection.features.map(({ icon: Icon, ...rest }) => (
          <div className="fade bg-[#0f592e]/10 border border-[#a3c0af] rounded-[.5rem] flex flex-col gap-4 xl:gap-3 items-start p-6">
            <Icon weight="regular" color="#0f592e" className="w-8 h-8" />
            <div className="sm:space-y-1">
              <p
                className="text-[1.1rem] lg:text-[1.2rem] xl:text-[1.2rem] font-medium text-[#0f592e] tracking-[.03rem]"
                style={{ fontFamily: "Inter Tight, serif" }}
              >
                {rest.title}
              </p>
              <p className="text-[1rem] leading-[1.5rem] xl:text-[1.15rem] xl:leading-[1.75rem]">
                {rest.brief_note}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ChooseUs;
