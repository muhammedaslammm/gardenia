import { XSquare } from "phosphor-react";
import GalleryImage from "./GalleryImage";

const GalleryGrid = ({ gallery, count, refetch }) => {
  if (gallery === null)
    return (
      <div className="grid grid-cols-4 gap-4 w-4/6">
        {Array.from({ length: 9 }).map((_, i) => (
          <div className="animation--container h-[10rem]">
            <div className="animation--mask animation--loading__effect"></div>
          </div>
        ))}
      </div>
    );
  if (gallery && gallery.length === 0)
    return (
      <div className="w-4/6 border border-neutral-300 p-4 space-y-1 self-start">
        <div className="text-[1.4rem] font-medium font--dm-serif-display ">
          Gallery is Empty!
        </div>
        <div>You have not added any images in gallery so far. Add images</div>
      </div>
    );
  return (
    <div className="w-4/6 space-y-2">
      <div>Total Images : {count}</div>
      <div className="grid grid-cols-4 gap-4">
        {gallery.map((image) => (
          <GalleryImage image={image} refetch={refetch} key={image._id} />
        ))}
      </div>
    </div>
  );
};

export default GalleryGrid;
