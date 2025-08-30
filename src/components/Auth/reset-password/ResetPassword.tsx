"use client";
import { LockPasswordIcon, PasswordIcon } from "@/assets/icons";
import InputGroup from "@/components/FormElements/InputGroup";
import {
  SET_LOADING_STATE,
  SET_RESET_CONFIRM_PASSWORD,
  SET_RESET_PASSWORD,
  SET_SUBMIT_STATE,
  SET_TOGGLE_CONFIRM_PASSWORD,
  SET_TOGGLE_PASSWORD,
  SET_VALID_CONFIRM_PASSWORD,
  SET_VALID_PASSWORD,
} from "@/constants";
import { forgotPassowrd, resetPassword } from "@/lib/auth-apis/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useReducer } from "react";

type State = {
  password: string;
  confirmpassword: string;
  togglePassword: boolean;
  toggleConfirmPassword: boolean;
  validPassword: boolean;
  validConfirmPassword: boolean;
  isSubmit: boolean;
  loading: boolean;
};
const reducer = (state: State, action: any) => {
  switch (action.type) {
    case SET_RESET_PASSWORD:
      return { ...state, password: action.payload };
    case SET_RESET_CONFIRM_PASSWORD:      
      return { ...state, confirmpassword: action.payload };
    case SET_TOGGLE_PASSWORD:
      return { ...state, togglePassword: action.payload };
    case SET_TOGGLE_CONFIRM_PASSWORD:
      return { ...state, toggleConfirmPassword: action.payload };
    case SET_VALID_PASSWORD:
      return { ...state, validPassword: action.value };
    case SET_VALID_CONFIRM_PASSWORD:
      return { ...state, validConfirmPassword: action.payload };
    case SET_SUBMIT_STATE:      
      return { ...state, isSubmit: action.payload };
    case SET_LOADING_STATE:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

const initialState = {
  password: "",
  confirmpassword: "",
  togglePassword: false,
  toggleConfirmPassword: false,
  validPassword: false,
  validConfirmPassword: false,
  isSubmit: false,
  loading: false,
};
export default function ResetPassword() {
  const [resetPasswordState, dispatch] = useReducer(reducer, initialState);
  const {
    password,
    confirmpassword,
    togglePassword,
    toggleConfirmPassword,
    validPassword,
    validConfirmPassword,
    isSubmit,
    loading,
  } = resetPasswordState;
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = localStorage.getItem('email');
  
  const router = useRouter();
  const validatePassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value, name } = e.target;
    if (name === "password") {
      dispatch({ type: SET_RESET_PASSWORD, payload: value.trim() });
      if (validatePassword.test(value)) {
        dispatch({ type: SET_VALID_PASSWORD, value: false });
      } else {
        dispatch({ type: SET_VALID_PASSWORD, value: true });
      }
    } else if (name === "confirmpassword") {
      dispatch({ type: SET_RESET_CONFIRM_PASSWORD, payload: value.trim() });
      if (password === value) {
        dispatch({ type: SET_VALID_CONFIRM_PASSWORD, payload: false });
      } else {
        dispatch({ type: SET_VALID_CONFIRM_PASSWORD, payload: true });
      }
    }
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: SET_SUBMIT_STATE, payload: true });
    try {
      const res = await resetPassword({email, password, token});
      localStorage.removeItem('email');
      
      if (password) {
        dispatch({ type: SET_LOADING_STATE, payload: true });
        // api call
        
        setTimeout(() => {
          dispatch({ type: SET_SUBMIT_STATE, payload: false });
          dispatch({ type: SET_LOADING_STATE, payload: false });
          router.push("/sign-in");
        }, 2000);
      }
    } catch (error) {
      dispatch({ type: SET_LOADING_STATE, payload: false });
      console.log("Forgot password api error", error);
    }
  };
  return (
    <>
      <div className="reset-password-main flex h-[100vh] items-center justify-center overflow-y-auto bg-gray-3">
        <div className="reset-password-container w-[90%] rounded-lg bg-white px-5 shadow-lg sm:w-full sm:px-5 md:w-[80%] md:px-4 lg:w-[60%] lg:px-10 xl:w-[50%] xl:px-10">
          <form action="post" onSubmit={handleSubmit}>
            <p className="py-4 text-center text-3xl font-medium text-black">
              Reset password
            </p>
            <div>
              <InputGroup
                type={togglePassword ? "text" : "password"}
                label="Password"
                className="mb-4 cursor-pointer [&_input]:py-[15px]"
                placeholder="Enter your password"
                name="password"
                required
                handleChange={handleChange}
                icon={
                  <span
                    onClick={() =>
                      dispatch({
                        type: SET_TOGGLE_PASSWORD,
                        payload: !togglePassword,
                      })
                    }
                  >
                    {togglePassword ? <PasswordIcon /> : <LockPasswordIcon />}
                  </span>
                }
                autoComplete="new-password"
              />
              {!password && isSubmit ? (
                <span className="text-red">Please enter your Password</span>
              ) : (
                validPassword && (
                  <p className="flex flex-col">
                    <span className="text-red">
                      Password must be minimum 8 characters
                    </span>
                    <span className="text-red">
                      Password must be contain at least one lowercase letter
                    </span>
                    <span className="text-red">
                      Password must be contain at least one uppercase letter
                    </span>
                    <span className="text-red">
                      Password must be contain at least one number
                    </span>
                    <span className="text-red">
                      Password must be contain at least one special character
                    </span>
                  </p>
                )
              )}
            </div>

            {/* confirm password */}
            <div>
              <InputGroup
                type={toggleConfirmPassword ? "text" : "password"}
                label="Confirm Password"
                placeholder="Enter your confirm password"
                name="confirmpassword"
                required
                handleChange={handleChange}
                icon={
                  <span
                    onClick={() =>
                      dispatch({
                        type: SET_TOGGLE_CONFIRM_PASSWORD,
                        payload: !toggleConfirmPassword,
                      })
                    }
                  >
                    {toggleConfirmPassword ? (
                      <PasswordIcon />
                    ) : (
                      <LockPasswordIcon />
                    )}
                  </span>
                }
                autoComplete="new-password"
              />
              {!confirmpassword && isSubmit ? (
                <span className="text-red">
                  Please enter your Password again
                </span>
              ) : (
                validConfirmPassword && (
                  <span className="text-red">
                    Please make sure both Passwords are same
                  </span>
                )
              )}
            </div>

            <div className="flex w-full justify-center gap-2 py-4">
              <button
                type="submit"
                className="w-full cursor-pointer rounded-lg bg-primary px-4 py-2 font-medium text-white transition hover:bg-opacity-90"
              >
                reset password
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
