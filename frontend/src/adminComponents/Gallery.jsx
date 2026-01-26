import GalleryGrid from "./GalleryGrid";
import GalleryUpload from "./GalleryUpload";
import useGallery from "../hooks/useGallery.js";

const Gallery = () => {
  let { gallery } = useGallery();
  return (
    <main className="space-y-4">
      <div>Gallery Management</div>
      <div className="flex gap-4">
        <GalleryGrid gallery={gallery} />
        <GalleryUpload />
      </div>
    </main>
  );
};

export default Gallery;
