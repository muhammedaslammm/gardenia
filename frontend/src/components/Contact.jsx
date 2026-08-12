import ConventionMap from "./ConventionMap";
import contact from "../data/contact";

const Contact = () => {
  return (
    <section
      id="contact"
      className="w-full pt-0 pb-10 md:pb-12 flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-3 border-t-0 border-[#0f592e] section--contact"
    >
      <div className="space-y-1">
        <h3 className="heading--section">reach out to us</h3>
        <p className="paragraph--section !text-left">
          We're here to assist you with bookings, inquiries, or any
          event-related support. Reach out to us for more information—we'll be
          happy to help make your event at Gardenia
        </p>
        <div className="mt-5 mb-10 md:my-8 space-y-2 md:space-y-1 lg:space-y-0 xl:space-y-1">
          <div className="contact-info flex flex-col md:flex-row justify-between text-[.9rem] md:text-[1.1rem] lg:text-[1rem] xl:text-[1rem]">
            <div className="uppercase font-semibold text-[#0f592e]">
              Contact Us
            </div>
            <div className="flex items-center gap-2">
              <a href="tel:+918891813666">+91 8891813666</a>
              <a href="tel:+918891813555">+91 8891813555</a>
            </div>
          </div>
          <div className="contact-info flex flex-col md:flex-row justify-between text-[.9rem] md:text-[1.1rem] lg:text-[1rem] xl:text-[1rem]">
            <div className="uppercase font-semibold text-[#0f592e]">
              Location
            </div>
            <div>Njekkad, Kallambalam, Trivandrum</div>
          </div>
          <div className="contact-info flex flex-col md:flex-row justify-between text-[.9rem] md:text-[1.1rem] lg:text-[1rem] xl:text-[1rem]">
            <div className="uppercase font-semibold text-[#0f592e]">Email</div>
            <a href="mailto:gardeniaconventioncenter@gmail.com">
              gardeniaconventioncenter@gmail.com
            </a>
          </div>
        </div>
        <ConventionMap />
      </div>
    </section>
  );
};

export default Contact;
