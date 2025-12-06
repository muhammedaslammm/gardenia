const GalleryPage = () => {
  return (
    <main className="min-h-screen w-[85%] mx-auto pt-[6rem] space-y-4">
      <h1 className="font--dm-serif-display text-[1.6rem]">Event Gallery</h1>
      <div className="grid grid-cols-5 gap-4">
        {Array(15)
          .fill(undefined)
          .map((i) => (
            <div className="bg-neutral-200 w-full h-[15rem]"></div>
          ))}
      </div>
    </main>
  );
};

export default GalleryPage;
