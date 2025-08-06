import terms from "../data/terms";

const Terms = () => {
  return (
    <section className="py-[4.5rem] w-[85%] mx-auto space-y-8">
      <div className="">
        <h1 className="text-[1.8rem] text-[#0f592e] font--inter-tight font-medium capitalize">
          {terms.title}
        </h1>
        <p className="text-[1.1rem]">{terms.description}</p>
      </div>
      <ol className="list-decimal ml-4">
        {terms.terms.map((term) => (
          <li className="text-[1.1rem]">{term.note}</li>
        ))}
      </ol>
    </section>
  );
};

export default Terms;
