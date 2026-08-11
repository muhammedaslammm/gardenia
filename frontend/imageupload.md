# Gallery Folder Image Upload to Backend

Selected images need to be send over to backend.

- The selected images need to be send over to backend. The backend url is "import.meta.env.VITE_BACKEND_URL/gallery-folders/:id/images" which is a PATCH request. The submission is triggered when the submit button in GalleryModal.js file is clicked.

- images state variable contains array of object that have field named as file. this is what backend needs.

Note :

- if the upload request is enough to place in GalleryModal.js file, keep it there or move the logic to a custom hook.
