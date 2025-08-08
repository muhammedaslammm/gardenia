import About from "../components/About";
import Banner from "../components/Banner";
import Images from "../components/Images";
import Spaces from "../components/Spaces";
import Events from "../components/Events";
import Facilities from "../components/Facilities";
import Contact from "../components/Contact";
import ChooseUs from "../components/ChooseUs";
import TermsBanner from "../components/TermsBanner";

const Home = () => {
  return (
    <main>
      <Banner />
      <div className="relative z-100">
        <div className="w-[95%] sm:w-[90%] xl:w-[85%] px-2 mx-auto ">
          <About />
          <Spaces />
          <Facilities />
          <Events />
          <Images />
          <ChooseUs />
          <TermsBanner />
          <Contact />
        </div>
      </div>
    </main>
  );
};
export default Home;
