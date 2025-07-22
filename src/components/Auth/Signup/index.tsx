"use client";
import { Checkbox } from "@/components/FormElements/checkbox";
import InputGroup, { InputArea } from "@/components/FormElements/InputGroup";
import Link from "next/link";
import { SET_FORM_DATA } from "../../../constants/index";
import React, { useReducer, useState } from "react";
import { EmailIcon, LockPasswordIcon, PasswordIcon, UserIcon } from "@/assets/icons";

type State = {
  fullname: string;
  email: string;
  password: string;
  confirmpassword?: string;
};
const initialState:State = {
  fullname: "",
  email: "",
  password: "",
  confirmpassword: "",
};

const reducer = (state: State, action: any) => {
  switch (action.type) {
    case SET_FORM_DATA:
      return { ...state, [action.payload.name]: action.payload.value };
    default:
      return state;
  }
};

const SignUp = () => {
  const [formState, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState<boolean>(false);
  const [togglePassword, setTogglePassword] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const {
    fullname,
    email,
    password,
    confirmpassword
  } = formState;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    dispatch({ type: SET_FORM_DATA, payload: { name: name, value: value } });
  };

  const emptyForm=()=>{
    if(!fullname || !email || !password || !confirmpassword) return false;
    else return true;
  }
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {...formState};
    delete payload.confirmpassword
    console.warn(payload,"payload");
    setIsSubmit(true);
    console.warn(emptyForm());
    
    if(emptyForm()) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="flex h-[100vh] w-full items-center justify-center overflow-y-auto bg-gray-3">
      <div className="w-[90%] sm:w-full md:w-[80%] lg:w-[60%] xl:w-[50%] rounded-lg bg-white px-5 sm:px-5 md:px-4 lg:px-10 xl:px-10 shadow-lg">
        <div className="">
        <p className="py-4 text-center text-3xl font-medium text-black">
          Sign Up
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col">
          {/* fullname */}
          <div>
            <InputGroup
              type="text"
              label="Full Name"
              className="[&_input]:py-[15px]"
              placeholder="Enter your fullname"
              name="fullname"
              required
              handleChange={handleChange}
              icon={<UserIcon/>}
            />
            {!fullname && isSubmit && (
              <span className="text-red">This field is required!</span>
            )}
          </div>

          {/* email */}
          <div>
            <InputGroup
              type="email"
              label="Email"
              className="[&_input]:py-[15px]"
              placeholder="Enter your email"
              name="email"
              required
              handleChange={handleChange}
              icon={<EmailIcon/>}
            />
            {!email && isSubmit && (
              <span className="text-red">This field is required!</span>
            )}
          </div>

          {/* password */}
          <div>
            <InputGroup
              type={togglePassword ? "text" : "password"}
              label="Password"
              className="mb-4 [&_input]:py-[15px] cursor-pointer"
              placeholder="Enter your password"
              name="password"
              required
              handleChange={handleChange}
              icon={
                <span onClick={()=>setTogglePassword(!togglePassword)}>
                  {togglePassword ? <PasswordIcon /> : <LockPasswordIcon />}
                </span>
              }
            />
            {!password && isSubmit && (
              <span className="text-red">This field is required!</span>
            )}
          </div>

          {/* confirm password */}
          <div>
            <InputGroup
              type="password"
              label="Confirm Password"
              className="mb-5 [&_input]:py-[15px]"
              placeholder="Enter your confirm password"
              name="confirmpassword"
              required
              handleChange={handleChange}
            />
            {!confirmpassword && isSubmit && (
              <span className="text-red">This field is required!</span>
            )}
          </div>

          {/* Sign in link */}
          <div>
            <p>Already have an account? <Link href="sign-in" className="text-primary">Sign-in</Link></p>
          </div>

          <div className="py-4 flex w-full justify-center gap-2">
            <button
              type="submit"
              className="w-full cursor-pointer rounded-lg bg-primary px-4 py-2 font-medium text-white transition hover:bg-opacity-90"
            >
              Sign Up
              {loading && (
                <span className="ms-1 inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-primary dark:border-t-transparent" />
              )}
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
