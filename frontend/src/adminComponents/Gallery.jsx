import GalleryGrid from "./GalleryGrid";
import GalleryUpload from "./GalleryUpload";
import useGallery from "../hooks/useGallery.js";

const Gallery = () => {
  let { gallery, count, refetch } = useGallery();
  return (
    <main className="space-y-2">
      <div>Gallery</div>
      <div className="flex gap-4">
        <GalleryGrid gallery={gallery} count={count} refetch={refetch} />
        <GalleryUpload refetch={refetch} />
      </div>
    </main>
  );
};

export default Gallery;
