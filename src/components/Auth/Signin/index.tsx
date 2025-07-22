import GoogleSigninButton from "../GoogleSigninButton";
import SigninWithPassword from "../SigninWithPassword";

export default function SignIn() {
  return (
    <>
    <div className=" main-container flex h-[100vh] w-full items-center justify-center bg-gray-3">
      <div className="w-[90%] sm:w-full md:w-[80%] lg:w-[60%] xl:w-[50%] rounded-lg bg-white px-5 sm:px-5 md:px-4 lg:px-10 xl:px-10 shadow-lg">
        <div className="">
        <p className="py-4 text-center text-3xl font-medium text-black">
          Sign In
        </p>
      <GoogleSigninButton text="Sign in" /> 

      <div className="my-6 flex items-center justify-center">
        <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
        <div className="block w-full min-w-fit bg-white px-3 text-center font-medium dark:bg-gray-dark">
          Or sign in with email
        </div>
        <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
      </div>

      <div>
        <SigninWithPassword />
      </div>

      </div>
      </div>
      </div>
    </>
  );
}
