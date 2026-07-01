import { useEffect, useState } from "react";

const Gallery = () => {
  let [gallery, setGallery] = useState(null);
  let BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  let IMAGE_URL = import.meta.env.VITE_CLOUDINARY_IMAGE_URL;

  return (
    <main className="min-h-screen pt-[4rem] xl:pt-[6rem] w-[85%] mx-auto">
      <div className="p-3 md:p-6 bg-[#0f592e]/10 rounded-[.3rem] space-y-2 md:space-y-1">
        <div className="text-[1.2rem] lg:text-[1.6rem] font--dm-serif-display text-[#0f592e]">
          Gallery is Empty
        </div>
        <div className="font--inter-tight text-[1rem] md:text-[1.2rem] leading-[1.4rem] text-[#0f592e]">
          Couldn't find any photos so far in gallery.
        </div>
      </div>
    </main>
  );
};

export default Gallery;
