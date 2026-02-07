import { XSquare } from "phosphor-react";
import GalleryImage from "./GalleryImage";
import Empty from "./Empty";

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
      <div className="w-4/6">
        <Empty
          head={"Gallery is Empty!"}
          note={"You have not added any images in gallery so far. Add images."}
        />
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
