export const buildGallerySlides = (gallery = [], imageBaseUrl = "") => {
  return (gallery || []).flatMap((folder, folderIndex) =>
    (folder.images || []).map((image, imageIndex) => ({
      id: image._id || `${folder._id || folderIndex}-${imageIndex}`,
      src: image.public_id ? `${imageBaseUrl}/${image.public_id}` : "",
      alt: `${folder.folder_name || "Gallery"} image ${imageIndex + 1}`,
      folderName: folder.folder_name || "Gallery",
      folderIndex,
      imageIndex,
    })),
  );
};
