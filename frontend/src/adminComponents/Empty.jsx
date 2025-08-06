const Empty = ({ head, note }) => {
  return (
    <div className="bg-[#0f592e]/10 p-4 space-y-2">
      <div className=" font-semibold text-[1.2rem]">{head}</div>
      <div className="text-[1.1rem] max-w-[30rem]">{note}</div>
    </div>
  );
};

export default Empty;
