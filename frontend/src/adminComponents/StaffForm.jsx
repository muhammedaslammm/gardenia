import { useForm } from "react-hook-form";
import InputLabel from "./InputLabel";

const StaffForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  let BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const submitForm = async () => {
    try {
      let response = await fetch(`${BACKEND_URL}/users/register`, {
        m,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <section className="w-2/6 bg-white border border-neutral-300 p-2">
      <div className="space-y-1">
        <h1 className="text-[1.1rem] font--inter-tight font-medium">
          Handle User
        </h1>
        <div className="p-2 bg-neutral-100 text-neutral-800">
          Fill and submit the user details below to create the user.
        </div>
      </div>
      <form onSubmit={handleSubmit(submitForm)}>
        <div>
          <InputLabel title="User Name" />
        </div>
      </form>
    </section>
  );
};

export default StaffForm;
