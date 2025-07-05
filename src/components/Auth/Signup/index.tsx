"use client";
import { EmailIcon, PasswordIcon, PhoneIcon, UserIcon } from "@/assets/icons";
import { Checkbox } from "@/components/FormElements/checkbox";
import InputGroup, { InputArea } from "@/components/FormElements/InputGroup";
import Link from "next/link";
import { SET_FORM_DATA } from "../../../constants/index";
import React, { useReducer, useState } from "react";

type State = {
  firstname: string;
  lastname: string;
  address: string;
  phone: string;
  email: string;
  taluko: string;
  city: string;
  state: string;
  password: string;
  confirmpassword: string;
};
const initialState = {
  firstname: "",
  lastname: "",
  address: "",
  phone: "",
  email: "",
  taluko: "",
  city: "",
  state: "",
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
  const [loading, setLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const {
    firstname,
    lastname,
    address,
    phone,
    email,
    password,
    confirmpassword,
    state,
    city,
  } = formState;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    dispatch({ type: SET_FORM_DATA, payload: { name: name, value: value } });
  };

  const emptyForm=()=>{
    if(!firstname && !lastname && !address && !phone && !email && !state && !city) return false;
    else return true;
  }
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.warn(formState);
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
    <form onSubmit={handleSubmit}>
      {/* username */}
      <div className="mb-4 flex w-full gap-6 align-middle">
        <div className="w-full">
          <InputGroup
            type="text"
            label="First Name"
            className="[&_input]:py-[15px]"
            placeholder="Enter your first name"
            name="firstname"
            required
            handleChange={handleChange}
          />
          {(!firstname && isSubmit) && (
            <span className="text-red">This field is required!</span>
          )}
        </div>

        <div className="w-full">
          <InputGroup
            type="text"
            label="Last Name"
            className="[&_input]:py-[15px]"
            placeholder="Enter your last name"
            name="lastname"
            required
            handleChange={handleChange}
          />
          {(!lastname && isSubmit) && (
            <span className="text-red">This field is required!</span>
          )}
        </div>
      </div>

      {/* phone and email */}
      <div className="mb-4 flex w-full gap-6 align-middle">
        <div className="w-full">
          <InputGroup
            type="text"
            label="Phone Number"
            className="[&_input]:py-[15px]"
            placeholder="Enter your phone number"
            name="phone"
            required
            handleChange={handleChange}
          />
          {(!phone && isSubmit) && <span className="text-red">This field is required!</span>}
        </div>
        <div className="w-full">
          <InputGroup
            type="email"
            label="Email"
            className="[&_input]:py-[15px]"
            placeholder="Enter your email"
            name="email"
            required
            handleChange={handleChange}
          />
          {(!email && isSubmit) && <span className="text-red">This field is required!</span>}
        </div>
      </div>

      {/* city and state */}
      <div className="mb-4 flex w-full gap-6 align-middle">
        <div className="w-full">
          <InputGroup
            type="text"
            label="City"
            className="[&_input]:py-[15px]"
            placeholder="Enter your city"
            name="city"
            required
            handleChange={handleChange}
          />
          {(!city && isSubmit) && <span className="text-red">This field is required!</span>}
        </div>

        <div className="w-full">
          <InputGroup
            type="text"
            label="State"
            className="[&_input]:py-[15px]"
            placeholder="Enter your state"
            name="state"
            required
            handleChange={handleChange}
          />
          {(!state && isSubmit) && <span className="text-red">This field is required!</span>}
        </div>
      </div>

      {/* address */}
      <div className="mb-4 flex w-full gap-6 align-middle">
        <div className="w-[50%]">
          <InputArea
            type="text"
            label="Address"
            className="[&_input]:py-[15px]"
            placeholder="Enter your address"
            name="address"
            required
            handleChange={handleChange}
          />
          {(!address && isSubmit) && (
            <span className="text-red">This field is required!</span>
          )}
        </div>
      </div>

      {/* password and confirm password */}
      {/* <div className="flex w-full gap-6 align-middle">
        <InputGroup
          type="password"
          label="Password"
          className="mb-4 w-[50%] [&_input]:py-[15px]"
          placeholder="Enter your password"
          name="Password"
          required
          // handleChange={handleChange}
        />

        <InputGroup
          type="password"
          label="Confirm Password"
          className="mb-5 w-[50%] [&_input]:py-[15px]"
          placeholder="Enter your confirm password"
          name="confirmpassword"
          required
          // handleChange={handleChange}
        />
      </div> */}

      <div className="flex w-full justify-center gap-2">
        <button
          type="submit"
          className="cursor-pointer rounded-lg bg-primary px-4 py-2 font-medium text-white transition hover:bg-opacity-90"
        >
          Sign Up
          {loading && (
            <span className="ms-1 inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-primary dark:border-t-transparent" />
          )}
        </button>
      </div>
    </form>
  );
};

export default SignUp;
