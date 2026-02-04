import ConventionMap from "./ConventionMap";
import contact from "../data/contact";

const Contact = () => {
  return (
    <section
      id="contact"
      className="w-full pt-0 pb-10 md:pb-12 flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-3 border-t-0 border-[#0f592e] section"
    >
      <div className="space-y-1">
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
    </section>
  );
};

export default Contact;
