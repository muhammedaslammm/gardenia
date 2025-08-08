import terms from "../data/terms";

const Terms = () => {
  return (
    <section className="w-[95%] sm:w-[90%] xl:w-[85%] py-[3.5rem] lg:py-[4rem] px-2 mx-auto space-y-8">
      <div className="">
        <h1 className="text-[1.3rem] lg:text-[1.8rem] text-[#0f592e] font--inter-tight font-medium xl:font-semibold capitalize">
          {terms.title}
        </h1>
        <p className="md:text-[1.1rem]">{terms.description}</p>
      </div>
      <ol className="list-decimal ml-4 space-y-3">
        {terms.terms.map((term) => (
          <li className="md:text-[1.1rem]">{term.note}</li>
        ))}
      </ol>
    </section>
  );
};

export default Terms;
