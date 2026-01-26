import { useState } from "react";

const useGallery = () => {
  let [gallery, setGallery] = useState([]);
  return { gallery };
};

export default useGallery;
