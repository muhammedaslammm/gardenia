import ConventionMap from "./ConventionMap";
import contact from "../data/contact";
import Form from "./Form.jsx";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import useIsMobile from "../customhooks/useIsMobile.js";

const Contact = () => {
  const containerRef = useRef();
  const isMobile = useIsMobile();
  // useLayoutEffect(() => {
  //   if (isMobile) return;
  //   const context = gsap.context(() => {
  //     const onLoad = () => {
  //       gsap.from(containerRef.current, {
  //         y: 100,
  //         opacity: 0,
  //         duration: 1,
  //         scrollTrigger: {
  //           trigger: containerRef.current,
  //           start: "top 85%",
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
      ref={containerRef}
      id="contact"
      className="w-full pt-0 pb-10 md:pb-12 flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-3 border-t-0 border-[#0f592e]"
    >
      <div className="lg:w-8/12 space-y-1">
        <h3 className="heading--section">reach out to us</h3>
        <p className="paragraph--section !text-left">
          We're here to assist you with bookings, inquiries, or any
          event-related support. Reach out to us for more information—we'll be
          happy to help make your event at Gardenia
        </p>
        <div className="mt-5 mb-10 md:my-8 space-y-2 md:space-y-1 lg:space-y-0 xl:space-y-1">
          {contact.map((c, index) => (
            <div
              className="contact-info flex flex-col md:flex-row justify-between text-[.9rem] md:text-[1.1rem] lg:text-[1rem] xl:text-[1rem]"
              key={index}
            >
              <p className="uppercase font-semibold text-[#0f592e]">
                {c.label}
              </p>
              <p>{c.value}</p>
            </div>
          ))}
        </div>
        <ConventionMap />
      </div>
      <Form />
    </section>
  );
};

export default Contact;
