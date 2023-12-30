import axios, { AxiosError, AxiosResponse } from "axios";

// react hooks
import { useEffect, useState } from "react";
import { IError } from "../interfaces/Message";

// react router
import { Link, useNavigate } from "react-router-dom";

// uuid third party library
import { v4 as uuid } from "uuid";
import { InputComponent } from "../components/Form/InputComponent";

interface IUser {
  email: String;
  password: String;
}

const LoginPage = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [error, setError] = useState<IError>({ isError: false, message: "" });

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

  const navigate = useNavigate();

  return (
    <>
      {/* <div className="flex h-screen w-screen bg-vader"> */}
      {/* <div className="absolute top-14 -left-4 w-96 h-96 bg-electric rounded-full filter blur-3xl brightness-[0.4] "></div> */}
      {/* LEFT SIDE */}
      {/* <div className="w-full p-6 flex flex-col relative md:w-3/4 items-center mt-24"> */}
      {/* blob */}
      {/* To avoid from blobs placing in front of the content */}
      {/* <div className="z-1 relative ">
          
          <div>
              <p className="font-bold text-5xl text-light ">Sign up</p>
              <p className="text-indigo-200 font-light text-md">
                Create Musical Memories Together. Join JamCon for unforgettable
                concert friendships.
              </p>
            </div>
            <div className="flex flex-col gap-y-4 mt-12"></div>

           
            <div className="flex flex-col gap-y-4 mt-4 mb-7">
              
              <div>
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  onChange={handleUserInput}
                  className="border-b-2 p-2  border-indigo-200"
                ></input>
              </div>
          
              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleUserInput}
                  className="border-b-2 p-2  border-indigo-200"
                ></input>
              </div>
              <button
                className="justify-self-start w-44 p-2 bg-indigo-100"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>

         

            <div className="flex mt-4 gap-x-2 items-center">
              <p>Don't have an account?</p>
              <button onClick={handleNavigate} className="text-indigo-500">
                Sign up here
              </button>
            </div>
          </div>
        </div> */}

      {/*        
        <div className="hidden md:flex w-1/2 border-blue-500 border-4 items-center justify-center">
          right
        </div>
      </div> */}
      {/* <button
         
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Login in Google
        </button>
        <Link to={'/auth/register'}>Don't have an account? Sign up here</Link> */}
    </>
  );
};

export default LoginPage;
