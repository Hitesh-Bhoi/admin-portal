"use client";
import { Checkbox } from "@/components/FormElements/checkbox";
import InputGroup, { InputArea } from "@/components/FormElements/InputGroup";
import Link from "next/link";
import { SET_FORM_DATA } from "../../../constants/index";
import React, { useMemo, useReducer, useState } from "react";
import { EmailIcon, LockPasswordIcon, PasswordIcon, UserIcon } from "@/assets/icons";

type State = {
  fullname: string;
  user_email?: string;
  user_password?: string;
  confirmpassword?: string;
};
const initialState:State = {
  fullname: "",
  user_email: "",
  user_password: "",
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
  const [toggleCnfrmPassword, setToggleCnfrmPassword] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [validFields, setValidFields] = useState<any>({
    validEmail: false,
    validPassword: false,
    validConfirmPassword: false
  });
  const { validEmail, validPassword, validConfirmPassword} = validFields;
  const {
    fullname,
    user_email,
    user_password,
    confirmpassword
  } = formState;
  const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validatePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if(name.includes("user_email") && !validateEmail.test(value)){
        setValidFields((prev: any)=>({...prev, validEmail: true}));
    } else if(name.includes("user_password") && (user_password && !validatePassword.test(user_password))) {
      setValidFields((prev: any)=>({...prev, validPassword: true}));
    } else if(name.includes("confirmpassword") && user_password !== confirmpassword) {
      setValidFields((prev: any)=>({...prev, validConfirmPassword: true}));
    } else {
      setValidFields({
        validEmail: false,
        validPassword: false,
        validConfirmPassword: false,
      });
    }
    dispatch({ type: SET_FORM_DATA, payload: { name: name, value: value.trim() } });
  };
    
  const validateFormFields = useMemo(()=>{
        if (!fullname || !user_email || !user_password || !confirmpassword) return false;
        else return true;
    },[fullname, user_email, user_password, confirmpassword]);

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {...formState, email: user_email, password: user_password};
    delete payload.confirmpassword 
    delete payload.user_email 
    delete payload.user_password;
    setIsSubmit(true);
    
    if(validateFormFields) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      console.warn(payload,"payload");
    }
  };

  return (
    <div className="flex h-[100vh] w-full items-center justify-center overflow-y-auto bg-gray-3">
      <div className="w-[90%] rounded-lg bg-white px-5 shadow-lg sm:w-full sm:px-5 md:w-[80%] md:px-4 lg:w-[60%] lg:px-10 xl:w-[50%] xl:px-10">
        <div className="">
          <p className="py-4 text-center text-3xl font-medium text-black">
            Sign Up
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col" autoComplete="off">
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
                icon={<UserIcon />}
              />
              {!fullname  && isSubmit && (
                <span className="text-red">Please enter your Full Name</span>
              )}
            </div>

            {/* email */}
            <div>
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
              {!user_email && isSubmit ? (
                <span className="text-red">Please enter your Email</span>
              ) : (
                validEmail && (
                  <span className="text-red">Please enter a valid email</span>
                )
              )}
            </div>

            {/* password */}
            <div>
              <InputGroup
                type={togglePassword ? "text" : "password"}
                label="Password"
                className="mb-4 cursor-pointer [&_input]:py-[15px]"
                placeholder="Enter your password"
                name="user_password"
                required
                handleChange={handleChange}
                icon={
                  <span onClick={() => setTogglePassword(!togglePassword)}>
                    {togglePassword ? <PasswordIcon /> : <LockPasswordIcon />}
                  </span>
                }
                autoComplete="new-password"
              />
              {!user_password && isSubmit ? (
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
                type={toggleCnfrmPassword ? "text" : "password"}
                label="Confirm Password"
                placeholder="Enter your confirm password"
                name="confirmpassword"
                required
                handleChange={handleChange}
                icon={
                  <span onClick={() => setToggleCnfrmPassword(!toggleCnfrmPassword)}>
                    {toggleCnfrmPassword ? <PasswordIcon /> : <LockPasswordIcon />}
                  </span>
                }
                autoComplete="new-password"
              />
              {!confirmpassword && isSubmit ? (
                <span className="text-red">Please enter your Password again</span>
              ) :
              !validConfirmPassword &&
              <span className="text-red">Please make sure both Passwords are same</span>
            }
            </div>

            {/* Sign in link */}
            <div>
              <p>
                Already have an account?{" "}
                <Link href="sign-in" className="text-primary">
                  Sign-in
                </Link>
              </p>
            </div>

            <div className="flex w-full justify-center gap-2 py-4">
              <button
                type="submit"
                className="w-full cursor-pointer rounded-lg bg-primary px-4 py-2 font-medium text-white transition hover:bg-opacity-90"
              >
                Sign Up
                {loading && validateFormFields && (
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
