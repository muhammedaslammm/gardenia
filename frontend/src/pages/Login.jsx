import { image6 } from "../utils/images";
import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { Spinner } from "phosphor-react";
const Login = () => {
  const {
    userData,
    handleInput,
    submitCredentials,
    buttonText,
    buttonState,
    errors,
  } = useUser();
  return (
    <section className="relative">
      <Link
        to="/"
        className="absolute top-2 left-[1%] sm:left-[6.5%] md:left-[50%] md:-translate-x-[50%] lg:left-1 lg:-translate-x-0 lg:top-1 z-100 text-white font-semibold text-[1.4rem]"
      >
        <img
          src="/logo/gardenia-logo-2.png"
          alt="Gardenia Convention Center Logo"
          className="w-[7rem] sm:w-[7.5rem] md:w-[8.5rem] md:-translate-x-[8%] lg:translate-x-0 h-[2rem] lg:w-[8.5rem] lg:h-[3rem] object-cover"
        />
      </Link>
      <div className="lg:h-screen flex flex-col lg:flex-row">
        {/* left */}
        <div className="lg:w-4/6 h-[10rem] sm:h-[12rem] lg:h-full relative">
          <img
            src={image6}
            alt="gardenia night image"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        {/* right */}
        <div className="relative lg:w-2/6">
          <div className="w-[90%] sm:w-[80%] md:w-[65%] lg:w-[80%] flex flex-col gap-4 lg:gap-8 mx-auto my-[1rem] sm:my-[2rem] md:my-[2.5rem] lg:my-[8rem]">
            <div>
              <div className="font--dm-serif-display text-[1.3rem] lg:text-[1.6rem]">
                Log-in to Admin Panel
              </div>
              <div className="font--marriweather text-[.9rem] md:text-[1rem] leading-[1.4rem] md:leading-normal">
                Enter your credentials below to use the admin panel of gardenia
                convention center
              </div>
            </div>
            <div className="flex flex-col gap-4 text-[.9rem] md:text-[1rem]">
              <div className="space-y-1.5 ">
                <div className="flex items-baseline justify-between">
                  <div>Email</div>
                  {errors.email && (
                    <div className="text-red-800 capitalize text-[.9rem]">
                      {errors.email}
                    </div>
                  )}
                </div>
                <input
                  className="border border-neutral-400/70 p-2 rounded-[.3rem] w-full placeholder:!text-neutral-500"
                  type="email"
                  name="email"
                  placeholder="sample@.com"
                  value={userData.email}
                  onChange={handleInput}
                />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-baseline justify-between">
                  <div>Password</div>
                  {errors.password && (
                    <div className="text-red-800 capitalize text-[.9rem]">
                      {errors.password}
                    </div>
                  )}
                </div>
                <input
                  className="border border-neutral-400/70  text-neutral-400 p-2 rounded-[.3rem] w-full placeholder:!text-neutral-500"
                  type="password"
                  name="password"
                  placeholder="******"
                  value={userData.password}
                  onChange={handleInput}
                />
              </div>
              <div>
                <button
                  className={`${
                    errors.login_error ? "bg-red-800" : "bg-[#0f592e]"
                  } text-white font-semibold rounded-[.3rem] w-full p-2 mt-[2rem] hover:-translate-y-[.1rem] active:translate-y-0 transition flex items-center justify-center ${
                    buttonState === "loading"
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                  onClick={submitCredentials}
                  disabled={buttonState !== "idle"}
                >
                  {buttonState === "loading" ? (
                    <Spinner className="animate-spin w-5 h-5" />
                  ) : (
                    buttonText
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
