import { useLocation } from "react-router-dom";
import sidebar from "../data/sidebar";

const useSideBar = (role) => {
  const getSideBarContents = () => {
    return sidebar.filter((item) => {
      if (role && role === "staff")
        return item.sidebar && item.slug !== "staffs";
      return item.sidebar;
    });
  };

  const getPageInfo = () => {
    const { pathname } = useLocation();
    return sidebar.find((data) => data.path === pathname);
  };

  return { getSideBarContents, getPageInfo };
};
export default useSideBar;
