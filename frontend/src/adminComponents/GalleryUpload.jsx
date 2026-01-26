import { Spinner, Trash, X } from "phosphor-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const GalleryUpload = ({ refetch }) => {
  let [images, setImages] = useState([]);
  let [imagePreviews, setImagePreviews] = useState([]);
  let [loading, setLoading] = useState(false);
  let inputRef = useRef(null);

  let BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleFileInputs = (e) => {
    let files = Array.from(e.target.files);
    if (!files.length) return;
    setImages((prev) => [...prev, ...files]);
    setImagePreviews((prev) => [
      ...prev,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const removeFileInput = (i) => {
    setImages((prev) => prev.filter((_, index) => i !== index));
    setImagePreviews((prev) => {
      URL.revokeObjectURL(prev[i]);
      return prev.filter((_, index) => i !== index);
    });
  };

  const submitGalleryImages = async () => {
    try {
      if (!images.length) return;
      let formData = new FormData();
      images.forEach((image) => formData.append("image", image));

      setLoading(true);
      let response = await fetch(`${BACKEND_URL}/api/admin/gallery`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      setLoading(false);

      let result = await response.json();
      if (response.status === 400) return toast.warning(result.message);
      if (!response.ok) throw new Error(result.message);
      toast.success(result.message);
      setImages([]);
      setImagePreviews([]);
      refetch();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section className="w-2/6 h-[38rem] border border-neutral-300 flex flex-col p-4">
      <div className="space-y-1">
        <div className="font--dm-serif-display text-[1.2rem]">Add Images</div>
        <div>
          Images selecting from you file would be listed below as previews.{" "}
          <span
            className="underline text-purple-800 hover:text-purple-900 transition-colors cursor-pointer"
            onClick={() => inputRef.current.click()}
          >
            Add Images
          </span>
        </div>
        <input
          type="file"
          className="hidden"
          multiple
          ref={inputRef}
          onChange={handleFileInputs}
        />
      </div>
      {images.length >= 1 && (
        <div className="my-4 space-y-2 overflow-y-hidden">
          <div>Total Images : {images.length}</div>
          <div className="space-y-2 h-full overflow-y-scroll">
            {imagePreviews.map((image, i) => (
              <div className="group relative cursor-pointer" key={i}>
                <img
                  src={image}
                  alt="selected image preview"
                  className="border border-neutral-300 w-full h-[10rem] object-contain cursor-pointer"
                />
                <X
                  className="absolute right-2 top-2 text-[.9rem] text-red-500 underline"
                  onClick={() => removeFileInput(i)}
                >
                  Delete this image
                </X>
              </div>
            ))}
          </div>
        </div>
      )}
      <button
        className={`mt-auto font-medium text-white bg-black transition-opacity py-2 ${!images.length || loading ? "cursor-not-allowed hover:opacity-80" : "cursor-pointer"}`}
        disabled={!images.length || loading}
        onClick={submitGalleryImages}
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            Submitting{" "}
            <Spinner className="w-[1.1rem] h-[1.1rem] animate-spin" />
          </div>
        ) : (
          "Submit Images"
        )}
      </button>
    </section>
  );
};

export default GalleryUpload;
