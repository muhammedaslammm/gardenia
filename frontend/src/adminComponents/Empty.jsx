const Empty = ({ head, note }) => {
  return (
    <div className="bg-[#0f592e]/10 p-4 space-y-1 sm:space-y-2 mt-2">
      <div className=" font-semibold text-[1.1rem]">{head}</div>
      <div className="text-[1rem] sm:text-[1.1rem] max-w-[30rem] leading-[1.3rem]">
        {note}
      </div>
    </div>
  );
};

export default Empty;
