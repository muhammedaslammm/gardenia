import { useEffect, useState } from "react";

const Gallery = () => {
  let [gallery, setGallery] = useState(null);
  let BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  let IMAGE_URL = import.meta.env.VITE_CLOUDINARY_IMAGE_URL;
  useEffect(() => {
    let getGallery = async () => {
      try {
        let response = await fetch(`${BACKEND_URL}/api/client/gallery`, {
          method: "GET",
        });
        let result = await response.json();
        if (!response.ok) throw new Error(result.message);
        setGallery(result.images);
      } catch (error) {
        console.log(error.message);
      }
    };
    getGallery();
  }, []);
  return (
    <main className="min-h-screen pt-[4rem] xl:pt-[6rem] w-[85%] mx-auto">
      {gallery === null ||
        (gallery.length >= 1 && (
          <h1 className="font--dm-serif-display text-[1rem] xl:text-[1.4rem] text-center">
            Event Gallery
          </h1>
        ))}
      {gallery === null && (
        <div className="w-full grid grid-cols-4 gap-4 my-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <div className="animation--container w-full h-[15rem]">
              <div className="animation--mask animation--loading__effect"></div>
            </div>
          ))}
        </div>
      )}
      {gallery && gallery.length === 0 && (
        <div className="p-3 md:p-6 bg-[#0f592e]/10 rounded-[.3rem] space-y-2 md:space-y-1">
          <div className="text-[1.2rem] lg:text-[1.6rem] font--dm-serif-display text-[#0f592e]">
            Gallery is Empty
          </div>
          <div className="font--inter-tight text-[1rem] md:text-[1.2rem] leading-[1.4rem] text-[#0f592e]">
            Couldn't find any photos so far in gallery.
          </div>
        </div>
      )}
      {gallery && (
        <div className="columns-2 lg:columns-4 gap-4 my-2 md:my-4">
          {gallery.map((image, i) => (
            <div>
              <img
                src={`${IMAGE_URL}/${image.public_id}`}
                alt="gallery image"
                className="mb-4"
                key={i}
              />
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Gallery;
