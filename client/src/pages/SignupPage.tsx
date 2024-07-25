// react hooks
import { useState } from "react";

// interfaces
import { IUser } from "../interfaces/User";

// uuid third party library

import axios from "axios";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { notifyUser } from "../utils/helpers/toastify";

export const SignupPage = () => {
  const [formData, setFormData] = useState<IUser>({} as IUser);
  const handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name;
    const value = event.target.value;

    // dynamically add values tothe user state
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleSignUp = () => {
    const userData = {
      email: formData.email,
      name: formData.name,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      age: formData.age,
      country: formData.country,
      image: "",
    };
    axios
  
      .post("https://upmeet.onrender.com/api/auth/register", userData)
      .then((res: AxiosResponse) => {
        notifyUser(res.data.message, "success");
      });
  };
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/");
  };
  return (
    <>
      {/* <input
        type="text"
        placeholder="Enter Email"
        className="border border-black"
        name="email"
        onChange={handleUserInput}
      ></input>
      <input
        type="text"
        placeholder="Enter Name"
        className="border border-black"
        name="name"
        onChange={handleUserInput}
      ></input>
      <input
        type="number"
        placeholder="Enter Age"
        className="border border-black"
        name="age"
        onChange={handleUserInput}
      ></input>
      <input
        type="text"
        placeholder="Enter Country"
        className="border border-black"
        name="country"
        onChange={handleUserInput}
      ></input>
      <input
        type="password"
        placeholder="Enter Password"
        className="border border-black"
        name="password"
        onChange={handleUserInput}
      ></input>
      <input
        type="password"
        id="confirmPassword",
        
        placeholder="Confirm Password"
        className="border border-black"
        onChange={handleUserInput}
      ></input>
      <button onClick={handleSignUp}>Create Account</button> */}
      <div className="md:flex h-screen w-screen ">
        <div className="md:w-3/4 border-4 border-red-500 flex flex-col items-center justify-center">
          <div className="w-1/2">
            {/* LOGO AND TEXT */}
            <div>
              <p className="font-bold text-5xl">JAMCON</p>
              <p className="text-indigo-300">Sign in to continue </p>
            </div>
            <div className="flex flex-col gap-y-4 mt-12"></div>

            {/* INPUT TEXTS, EMAIL AND PASSWORD */}
            <div className="flex flex-col gap-y-4 mt-4 mb-7">
              {/* Email */}
              <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  onChange={handleUserInput}
                  className="border-b-2 p-2  border-indigo-200"
                ></input>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  onChange={handleUserInput}
                  className="border-b-2 p-2  border-indigo-200"
                ></input>

                <input
                  type="text"
                  name="age"
                  placeholder="Age"
                  onChange={handleUserInput}
                  className="border-b-2 p-2 border-indigo-200"
                ></input>
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  onChange={handleUserInput}
                  className="border-b-2 p-2 border-indigo-200"
                ></input>

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleUserInput}
                  className="border-b-2 p-2  border-indigo-200"
                ></input>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={handleUserInput}
                  className="border-b-2 p-2  border-indigo-200"
                ></input>
              </div>
              {/* Password */}

              <button
                onClick={handleSignUp}
                className="justify-self-start w-44 p-2 bg-indigo-100"
              >
                Sign up
              </button>
            </div>

            {/* Don't have an account? Sign up -> Section */}

            <div className="border border-slate-400"></div>
            <div className="flex mt-4 gap-x-2 items-center">
              <p>Already have an account?</p>
              <button className="text-indigo-500" onClick={handleNavigate}>
                Login here
              </button>
            </div>
          </div>
        </div>
        <div
          className={`w-1/2 border-blue-500 border-4 flex items-center justify-center`}
        >
          right
        </div>
      </div>
    </>
  );
};
