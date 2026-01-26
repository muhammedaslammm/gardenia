import { useEffect, useState } from "react";

const useGallery = () => {
  let [gallery, setGallery] = useState(null);
  let [count, setCount] = useState(null);
  let BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    getGalleyImages();
  }, []);

  const getGalleyImages = async () => {
    try {
      let response = await fetch(`${BACKEND_URL}/api/admin/gallery`, {
        method: "GET",
        credentials: "include",
      });
      let result = await response.json();
      if (!response.ok) throw new Error(result.message);
      setGallery(result.images);
      setCount(result.count);
    } catch (error) {
      console.log(error.message);
    }
  };
  return { gallery, count, refetch: getGalleyImages };
};

export default useGallery;
