import { EmailIcon } from "@/assets/icons";
import InputGroup from "@/components/FormElements/InputGroup";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>("");
  const [validateState, setValidateState] = useState<any>({
    isSubmit: false,
    validField: false,
    loading: false,
  });
  const { isSubmit, validField, loading } = validateState;
  const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = e.target;
    setEmail(value);
    if (validateEmail.test(value)) {
      setValidateState((prev: any) => ({ ...prev, validField: false }));
    } else {
      setValidateState((prev: any) => ({ ...prev, validField: true }));
    }
    console.warn("value", value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidateState((prev: any) => ({
      ...prev,
      isSubmit: true,
    }));
    try {
      if (email) {
        setValidateState((prev: any) => ({
          ...prev,
          loading: true,
          isSubmit: false,
        }));
        // api call
        setTimeout(() => {
          setValidateState((prev: any) => ({ ...prev, loading: false }));
        }, 5000);
      }
    } catch (error) {
      setValidateState((prev: any) => ({ ...prev, loading: false }));
      console.log("Forgot password api error", error);
    }
  };
  return (
    <>
      <div className="forgot-password-main flex h-[100vh] items-center justify-center overflow-y-auto bg-gray-3">
        <div className="forgot-password-container w-[90%] rounded-lg bg-white px-5 shadow-lg sm:w-full sm:px-5 md:w-[80%] md:px-4 lg:w-[60%] lg:px-10 xl:w-[50%] xl:px-10">
          <form action="post" onSubmit={handleSubmit}>
            <div>
              <p className="py-4 text-center text-3xl font-medium text-black">
                forgot password
              </p>
              <InputGroup
                type="email"
                label="Email"
                className="[&_input]:py-[15px]"
                placeholder="Enter your email"
                name="user_email"
                required
                handleChange={handleChange}
                icon={<EmailIcon />}
                autoComplete="off"
              />
              {!email && isSubmit ? (
                <span className="text-red">Please enter your Email</span>
              ) : (
                email &&
                validField && (
                  <span className="text-red">Please enter a valid email</span>
                )
              )}
            </div>
            <div className="flex w-full justify-center gap-2 py-4">
              <button
                type="submit"
                className="w-full cursor-pointer rounded-lg bg-primary px-4 py-2 font-medium text-white transition hover:bg-opacity-90"
              >
                forgot password
                {loading && (
                  <span className="ms-1 inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-primary dark:border-t-transparent" />
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
