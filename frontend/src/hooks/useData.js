import { useParams } from "react-router-dom";
import convention_spaces from "../data/spaces";

const useData = () => {
  const { id } = useParams();
  const getSpace = () => {
    return convention_spaces.find((space) => space.id == Number(id));
  };
  return { getSpace };
};

export default useData;
