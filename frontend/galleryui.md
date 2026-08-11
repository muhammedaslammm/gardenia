# Enlarging Gallery Images and Image Sliders.

- Images within the gallery need to be enlarged when any one image is clicked. when the image is enlarged, user could view the next and previous image when the next and previous button is clicked.

- What to note here is that, the gallery is not rendered only with images. Instead, documents representing folders are renderd. when the images within one document is completely viewed by next or previous button, move to next or previous folder's images array to render them one by one when button are clicked. [refer "gallery.model.js" file within the backend folder to understand document structure]

- Also implement keyboard controls like escape key to close enlarged preview, ArrowRight for next image, ArrowLeft for previous image.

- Incluse close button at top right to close the preview.

- Split code into components and utility files if needed for code modularizing. [keep components in components folder and utility files in utils folder if needed.]
