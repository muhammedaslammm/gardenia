import About from "../components/About";
import Banner from "../components/Banner";
import Spaces from "../components/Spaces";
import Events from "../components/Events";
import Facilities from "../components/Facilities";
import Contact from "../components/Contact";
import ChooseUs from "../components/ChooseUs";
import TermsBanner from "../components/TermsBanner";
import { useOutletContext } from "react-router-dom";

const Home = () => {
  const { func } = useOutletContext();
  return (
    <main>
      <Banner func={func} />
      <div className="relative z-100">
        <div className="w-[90%] sm:w-[90%] xl:w-[85%]  mx-auto ">
          <About />
          <Spaces />
          <Facilities />
          <Events />
          <ChooseUs />
          <TermsBanner />
          <Contact />
        </div>
      </div>
    </main>
  );
};
export default Home;
