import { FileImage } from "phosphor-react";
import { useRef, useState } from "react";

const Gallery = () => {
  let [images, setImages] = useState([]);
  let inputRef = useRef(null);

  const handleImages = (e) => {
    let files = Array.from(e.target.files);
    let file_data = files.map((file) => ({
      file: file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...file_data]);
  };

  return (
    <main className="space-y-4">
      <div>
        <h1>Image Gallery</h1>
        <div className="my-4 p-4 bg-yellow-50">
          Add image here to list then on client side interface. You can later
          delete an already added image and upload a new one.
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-4/6">
          {images.length ? (
            <div></div>
          ) : (
            <div className="border border-neutral-300 space-y-1 p-4">
              <div className="text-[1.2rem] font-medium">No images found</div>
              <div>
                Couldn't find any images. Add few from the form in the right
                section of this page.
              </div>
            </div>
          )}
        </div>
        <div className="w-2/6 border border-neutral-300 space-y-4 p-4">
          <div className="font--dm-serif-display text-[1.2rem]">
            Add images here
          </div>
          <div>
            <input
              type="file"
              multiple
              className="hidden"
              ref={inputRef}
              onChange={handleImages}
            />
            <div
              className="border-4 border-dashed border-neutral-300 inline-block p-4 cursor-pointer"
              onClick={() => inputRef.current.click()}
            >
              <FileImage className="w-[5rem] h-[5rem] text-neutral-400" />
            </div>
          </div>
          <div className="py-2 border-t border-neutral-300 space-y-2">
            <div className="font-medium">Image previews</div>
            {images.length ? (
              <div
                className="grid grid-cols-4 auto-rows-[5rem] gap-2
              "
              >
                {images.map((image, i) => (
                  <div className="h-full border border-neutral-300 p-2">
                    <img
                      src={image.preview}
                      alt="preview image"
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div>No preview images to display</div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Gallery;
