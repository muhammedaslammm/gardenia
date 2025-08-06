import { useLocation } from "react-router-dom";
import headerConfig from "../data/headerConfig";

const getHeaderContent = () => {
  let { pathname } = useLocation();
  let currentPath = pathname.split("/").filter(Boolean)[0];
  let headerContent = headerConfig[currentPath] || [];
  return { currentPath, headerContent };
};
export default getHeaderContent;
