const GalleryGrid = ({ gallery }) => {
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
        <div>Gallery is Empty!</div>
        <div>You have not added any images in gallery so far. Add images</div>
      </div>
    );
};

export default GalleryGrid;
