"use client";
import { EmailIcon, LockPasswordIcon, PasswordIcon } from "@/assets/icons";
import Link from "next/link";
import React, { useReducer, useState } from "react";
import InputGroup from "../FormElements/InputGroup";
import { Checkbox } from "../FormElements/checkbox";
import { SET_FORM_DATA } from "@/constants";

type State = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const initialState: State = {
  email: "",
  password: "",
  rememberMe: false,
};

const reducer = (state: State, action: any) => {
  switch (action.type) {
    case SET_FORM_DATA:
      return { ...state, [action.payload.name]: action.payload.value };
    default:
      return state;
  }
};
export default function SigninWithPassword() {
  const [formState, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [togglePassword, setTogglePassword] = useState<boolean>(false);
  const [validFields, setValidFields] = useState({
    validEmail: false,
    validPassword: false
  });
  const {validEmail, validPassword} = validFields;
  const { email, password } = formState;
  const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validatePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;

  const validateFormFields = () => {
    if (!email || !password) return false;
    else return true;
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    let target = e.target as HTMLInputElement;
    let { name, value, checked } = target;
    if(name.includes("email") && !validateEmail.test(email)) {
      setValidFields((prev: any)=>({...prev, validEmail: true}));
    } else if(name.includes("password") && !validatePassword.test(password)) {
      setValidFields((prev: any)=>({...prev, validPassword: true}));
    } else if (name.includes("rememberMe")) {
      return dispatch({
        type: SET_FORM_DATA,
        payload: { name, value: checked },
      });
    } else {
      setValidFields({validEmail: false, validPassword: false});
    }
    dispatch({ type: SET_FORM_DATA, payload: { name, value } });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmit(true);
    setLoading(true);
    console.log("validate form", validateFormFields());

    const isValid = await validateFormFields();
    if (isValid) {
      console.warn("formState", formState);
    }

    setTimeout(() => {
      setLoading(false);
      setIsSubmit(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      {/* email */}
      <div>
        <InputGroup
          type="email"
          label="Email"
          className=""
          placeholder="Enter your email"
          name="email"
          handleChange={handleChange}
          icon={<EmailIcon />}
          required
        />
        {
          !email ?
          <span className="text-red">Please enter your Email</span>
          :
          validEmail &&
          <span className="text-red">Please enter a valid email</span>
        }
      </div>

      {/* password */}
      <div>
        <InputGroup
          type={togglePassword ? "text" : "password"}
          label="Password"
          className="cursor-pointer"
          placeholder="Enter your password"
          name="password"
          handleChange={handleChange}
          icon={
            <span onClick={() => setTogglePassword(!togglePassword)}>
              {togglePassword ? <PasswordIcon /> : <LockPasswordIcon />}
            </span>
          }
          required
        />
        {
        !password ?(
          <span className="text-red">Please enter your Password</span>
        ) : validPassword && (
          <p className="flex flex-col">
          <span className="text-red">Password must be minimum 8 characters</span>
          <span className="text-red">Password must be contain at least one lowercase letter</span>
          <span className="text-red">Password must be contain at least one uppercase letter</span>
          <span className="text-red">Password must be contain at least one number</span>
          <span className="text-red">Password must be contain at least one special character</span>
          </p>
        )
      }
      </div>

      <div className="flex items-center justify-between gap-2 py-2 font-medium">
        <Checkbox
          label="Remember me"
          name="rememberMe"
          withIcon="check"
          minimal
          radius="md"
          onChange={handleChange}
        />

        <Link
          href="/auth/forgot-password"
          className="hover:text-primary dark:text-white dark:hover:text-primary"
        >
          Forgot Password?
        </Link>
      </div>

      <div className="float-start py-2">
        <div className="text-center">
          <p>
            Don’t have an account?{" "}
            <Link href="/sign-up" className="text-primary">
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      <div className="mb-4.5">
        <button
          type="submit"
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
        >
          Sign In
          {loading && (
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-primary dark:border-t-transparent" />
          )}
        </button>
      </div>
    </form>
  );
}
