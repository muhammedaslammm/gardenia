import LeftCard from "./LeftCard";
import convention_spaces from "../data/spaces";
import { Link } from "react-router-dom";

const Spaces = () => {
  return (
    <section
      id="spaces"
      className="py-10 lg:py-12 border-t border-[#0f592e] space-y-4 sm:space-y-8 xl:space-y-4 section"
    >
      <div className="space-y-1">
        <h2
          className="heading--section"
          style={{ fontFamily: "Inter Tight,sans-serif" }}
        >
          our event spaces
        </h2>
      </div>

      <div className="grid  md:grid-cols-2 gap-10">
        {convention_spaces.map((space) => (
          <Link to={`/spaces/${space.id}`}>
            <LeftCard data={space} />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Spaces;
