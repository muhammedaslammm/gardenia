import { X } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const GalleryModal = ({ close, folderId, refetch }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleInputs = (event) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    const selected = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: `${file.name}-${file.size}-${Date.now()}`,
    }));

    setImages((prev) => [...prev, ...selected]);
    event.target.value = null;
  };

  const removeFile = (id) => {
    setImages((prev) => prev.filter((file) => file.id !== id));
  };

  const submitImages = async () => {
    if (!folderId) {
      toast.error("Missing gallery folder information");
      return;
    }

    if (images.length === 0) {
      toast.error("Please select at least one image");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      images.forEach((image) => formData.append("file", image.file));

      const response = await fetch(
        `${BACKEND_URL}/api/gallery-folders/${folderId}/images`,
        {
          method: "PATCH",
          body: formData,
          credentials: "include",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to upload images");
      }

      toast.success(data.message || "Images uploaded successfully");
      refetch?.();
      close();
    } catch (error) {
      toast.error(error.message || "Failed to upload images");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      images.forEach((image) => URL.revokeObjectURL(image.preview));
    };
  }, [images]);

  return (
    <div className="bg-white w-[70%] h-[80vh] rounded-[.5rem] flex flex-col">
      <div className="flex justify-between items-center relative p-4 border-b border-neutral-300">
        <div className="font--dm-serif-display text-[1.2rem]">
          Handle Images
        </div>
        <X
          onClick={close}
          className="w-5 h-5 hover:text-red-800 transition-colors cursor-pointer"
        />
      </div>
      <div className="flex flex-col gap-8 font--inter-tight h-full overflow-y-scroll p-4">
        <div className="flex flex-col gap-2">
          <div>Select Images</div>
          <div className="w-[20rem] border border-neutral-400 rounded-[.5rem] p-1">
            <button
              className="bg-green-800 hover:bg-green-900 active:bg-green-800 transition-colors text-white py-1.5 px-3 rounded-[.5rem] cursor-pointer"
              onClick={() => inputRef.current.click()}
            >
              Click here to select images
            </button>
            <input
              type="file"
              multiple
              className="hidden"
              ref={inputRef}
              onChange={handleInputs}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div>Selected Images</div>
          {images.length === 0 ? (
            <div className="text-center bg-neutral-200 p-[6rem] rounded-[.5rem]">
              No images selected
            </div>
          ) : (
            <div className="grid grid-cols-5 gap-3">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="border border-neutral-300 rounded-[.5rem] overflow-hidden relative"
                >
                  <img
                    src={image.preview}
                    alt={image.file.name}
                    className="w-full h-28 object-cover"
                  />
                  <div className="bg-white flex flex-col gap-2 text-[.8rem] p-2">
                    <div className="text-neutral-800 truncate">
                      {image.file.name}
                    </div>
                    <div>{`${(image.file.size / (1024 * 1024)).toFixed(2)} MB`}</div>
                  </div>
                  <button
                    className="bg-neutral-300/30 absolute top-2 right-2 p-1 rounded-full cursor-pointer hover:bg-neutral-300 transition-colors"
                    onClick={() => removeFile(image.id)}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center justify-end gap-2 mt-auto">
          <button
            className="bg-neutral-300 hover:bg-neutral-200 transition-colors py-2 px-6 rounded-[.2rem] cursor-pointer"
            type="button"
            onClick={() => close()}
          >
            Cancel
          </button>
          <button
            className="bg-green-800 hover:bg-green-900 transition-colors text-white py-2 px-6 rounded-[.2rem] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            type="button"
            onClick={submitImages}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GalleryModal;
