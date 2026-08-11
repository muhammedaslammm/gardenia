import { useEffect, useState } from "react";
import { buildGallerySlides } from "../utils/galleryUtils";
import { CaretLeft, CaretRight, X } from "phosphor-react";

const Gallery = () => {
  const [gallery, setGallery] = useState(null);
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const IMAGE_URL = import.meta.env.VITE_CLOUDINARY_IMAGE_URL;

  const slides = buildGallerySlides(gallery || [], IMAGE_URL);
  const slideLookup = new Map();

  slides.forEach((slide, index) => {
    slideLookup.set(`${slide.folderIndex}-${slide.imageIndex}`, index);
  });

  const currentSlide = slides[selectedSlideIndex] || null;

  useEffect(() => {
    const getGallery = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/client/gallery`, {
          method: "GET",
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message);
        setGallery(result.folders);
      } catch (error) {
        console.log(error.message);
      }
    };

    getGallery();
  }, [BACKEND_URL]);

  useEffect(() => {
    if (!isPreviewOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsPreviewOpen(false);
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        setSelectedSlideIndex((current) => {
          if (current === null) return 0;
          return (current + 1) % slides.length;
        });
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setSelectedSlideIndex((current) => {
          if (current === null) return slides.length - 1;
          return (current - 1 + slides.length) % slides.length;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPreviewOpen, slides.length]);

  const openPreview = (index) => {
    setSelectedSlideIndex(index);
    setIsPreviewOpen(true);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
  };

  const showNextSlide = () => {
    setSelectedSlideIndex((current) => {
      if (current === null) return 0;
      return (current + 1) % slides.length;
    });
  };

  const showPreviousSlide = () => {
    setSelectedSlideIndex((current) => {
      if (current === null) return slides.length - 1;
      return (current - 1 + slides.length) % slides.length;
    });
  };

  return (
    <main className="min-h-screen pt-[4.2rem] lg:pt-[5rem] xl:pt-[6rem] w-[85%] mx-auto">
      {gallery === null && (
        <div className="w-full grid grid-cols-4 gap-4 my-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="animation--container w-full h-[15rem]">
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

      {gallery && gallery.length > 0 && (
        <div className="flex flex-col gap-8 md:gap-12 xl:gap-16">
          {gallery.map((folder, folderIndex) => (
            <section
              key={folder._id}
              className="flex flex-col gap-1 md:gap-1 xl:gap-2"
            >
              <h2 className="font--inter-tight text-[.9rem] sm:text-[1.2rem] lg:text-[1.4rem] lg:leading-[2.3rem] xl:text-[1.6rem] text-[#0f592e] text-center font-semibold uppercase">
                {`${folder.folder_name} images`}
              </h2>
              <div className="columns-2 sm:columns-2 md:columns-3 xl:columns-4 gap-2 lg:gap-3">
                {folder.images.map((obj, imageIndex) => {
                  const slideIndex = slideLookup.get(
                    `${folderIndex}-${imageIndex}`,
                  );

                  return (
                    <button
                      type="button"
                      key={obj._id || `${folder._id}-${imageIndex}`}
                      onClick={() => openPreview(slideIndex)}
                      className="mb-2 lg:mb-3 w-full cursor-zoom-in overflow-hidden"
                    >
                      <img
                        src={`${IMAGE_URL}/${obj.public_id}`}
                        alt={`${folder.folder_name} image ${imageIndex + 1}`}
                        className="w-full h-auto object-cover transition duration-300 hover:scale-[1.07]"
                        loading="lazy"
                      />
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}

      {isPreviewOpen && currentSlide && (
        <div className="fixed inset-0 z-500 flex items-center justify-center bg-black/85 backdrop-blur-sm p-2">
          <button
            type="button"
            onClick={closePreview}
            className="absolute right-4 top-4 z-10 cursor-pointer"
            aria-label="Close preview"
          >
            <X
              className="w-[1.2rem] h-[1.2rem] sm:w-[1.3rem] sm:h-[1.3rem] lg:w-[1.5rem] lg:h-[1.5rem] text-neutral-400 hover:text-white transition-colors"
              weight="bold"
            />
          </button>
          <div className="relative flex w-full flex-col overflow-hidden">
            <div className="relative flex items-center justify-center p-3 sm:p-6">
              <button
                type="button"
                onClick={showPreviousSlide}
                className="absolute left-8 cursor-pointer text-neutral-200 hover:text-white transition-colors z-10"
              >
                <CaretLeft className="w-[1.8rem] h-[1.8rem] sm:w-[2.1rem] sm:h-[2.1rem] lg:w-[2.5rem] lg:h-[2.5rem] mix-blend-multiply" />
              </button>
              <img
                src={currentSlide.src}
                alt={currentSlide.alt}
                className="max-h-[70vh] max-w-3xl w-full object-contain"
              />
              <button
                type="button"
                onClick={showNextSlide}
                className="absolute right-8 cursor-pointer text-neutral-200 hover:text-white transition-colors z-10"
              >
                <CaretRight className="w-[1.8rem] h-[1.8rem] sm:w-[2.1rem] sm:h-[2.1rem] lg:w-[2.5rem] lg:h-[2.5rem]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Gallery;
