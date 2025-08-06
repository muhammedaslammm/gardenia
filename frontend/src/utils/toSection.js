import { ScrollSmoother } from "gsap/all";

const toSection = (id) => {
  const section = document.getElementById(id);
  if (section) {
    const smoother = ScrollSmoother.get();
    smoother.scrollTo(section, true, "top 5%");
  }
};

export default toSection;
