// react hooks
import { useState, Dispatch, SetStateAction, useContext } from "react";

// interfaces
import { IUser } from "../interfaces/User";

import axios from "axios";
import { AxiosResponse } from "axios";
import { InputComponent } from "../components/Form/InputComponent";
import { ButtonComponent } from "../components/Form/ButtonComponent";

import concert from "../assets/concert.jpg";

// React Toastify
import { ToastContainer } from "react-toastify";

import { UserContext } from "../context/UserContext";

import { notifyUser } from "../utils/helpers/toastify";

export const AuthPage = () => {
  const [formData, setFormData] = useState<IUser>({} as IUser);
  const [showSignUp, setShowSignUp] = useState<boolean>(false);

  const { setData } = useContext(UserContext);

  const handleUserInput = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const key = event.target.name;
    const value = event.target.value;

    setFormData({
      ...formData,
      [key]: value,
    });

    // Calculate age if the input is the date of birth
    if (key === "age") {
      const calculatedAge = calculateAge(value);
      setFormData({
        ...formData,
        [key]: calculatedAge,
      }); // You can use the age as needed
    }
  };

  const calculateAge = (birthday: string): number => {
    const currentDate = new Date();
    const birthDate = new Date(birthday);

    // Calculate the difference in years
    let age = currentDate.getFullYear() - birthDate.getFullYear();

    // Check if the birthday has occurred this year
    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() &&
        currentDate.getDate() < birthDate.getDate())
    ) {
      // Subtract 1 year if the birthday hasn't occurred yet
      age -= 1;
    }

    return age;
  };

  const handleSignUp = async () => {
    const fixName = formData.name.toLowerCase();
    const userData = {
      email: formData.email,
      name: fixName.charAt(0).toUpperCase() + fixName.slice(1),
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      gender: formData.gender,
      age: formData.age,
      country: formData.country,
      image: "",
    };
    axios
      .post("https://upmeet.onrender.com/api/auth/register", userData)
      .then((res: AxiosResponse) => {
        if (res.status === 201 || 200) {
          notifyUser(res.data.message, "success");
          setTimeout(() => {
            setShowSignUp(false);
          }, 2500);
        }
      })
      .catch((error) => {
        if (error.status === 500) {
          notifyUser(error.data.error, "error");
        } else {
          notifyUser(error.response?.data.error, "error");
        }
      });
  };

  const handleLogin = () => {
    axios
      .post("https://upmeet.onrender.com/api/auth/login", formData, {
        withCredentials: true
       
      })
      .then((res: AxiosResponse) => {
        // Check if the response status is 200 or another success indicator

        if (res.status === 200) {
          localStorage.setItem("authenticated", true.toString());
          notifyUser(res.data.message, "success");
          setTimeout(() => {
            setData({ isLoggedIn: true, user: res.data.userId });
          }, 2500);

          // Navigate after a delay (if needed)
        } else {
          // Handle other success indicators if needed
          notifyUser(res.data.message, "error");
          setFormData({
            name: "",
            password: "",
            confirmPassword: "",
            age: 0,
            email: "",
          });
        }
      })
      .catch((error) => {
        if (error.status === 500) {
          notifyUser(error.data.error, "error");
        } else {
          notifyUser(error.response?.data.error, "error");
        }
      });
  };

  return (
    <>
      <div className="h-screen w-screen md:flex">
        <div>
          <ToastContainer />
        </div>
        <FormContainer>
          {showSignUp ? (
            <SignUpComponent
              handleUserInput={handleUserInput}
              setShowSignUp={setShowSignUp}
              handleEvent={handleSignUp}
            />
          ) : (
            <LoginComponent
              handleUserInput={handleUserInput}
              setShowSignUp={setShowSignUp}
              handleEvent={handleLogin}
            />
          )}
        </FormContainer>
        {/* {showSignUp ? <LoginComponent /> : null} */}
        {/* Right Side */}
        <div className="hidden lg:flex h-full">
          <img src={concert} className="h-full object-cover" />
        </div>
      </div>
    </>
  );
};

// for children components
type FormContainer = {
  children: React.ReactNode;
};

export const FormContainer = ({ children }: FormContainer) => {
  return (
    <>
      <div className="h-full w-full flex flex-col justify-center items-center lg:w-3/4  lg:relative">
        {children}
      </div>
    </>
  );
};

type AuthComponentProps = {
  handleUserInput: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  setShowSignUp: Dispatch<SetStateAction<boolean>>;
  handleEvent: () => void;
};

export const SignUpComponent: React.FC<AuthComponentProps> = ({
  handleUserInput,
  setShowSignUp,
  handleEvent,
}) => {
  return (
    <>
      {/* Parent Div of all of the sign up section */}
      <div className="w-[85%]  z-1 relative sm:w-[85%] lg:w-full xl:w-1/2">
        {/* Only for the sign up section and the paragraph below sign up section */}
        <div className="mb-8">
          <div className="flex flex-col gap-y-2">
            <p className="text-5xl text-light font-bold">Sign up</p>
            <p className="text-indigo-100 font-light text-md">
              Create Musical Memories Together. Join{" "}
              <span className="text-light font-bold">JamCon</span> for
              unforgettable concert friendships
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <div className="w-full flex flex-col gap-y-3 sm:grid sm:grid-cols-2 gap-x-3 sm:gap-y-4">
            <InputComponent
              type="email"
              placeholder="Email"
              onChange={handleUserInput}
              name="email"
              size="w-full"
              maxLength={50}
            />
            <InputComponent
              type="text"
              placeholder="Name"
              onChange={handleUserInput}
              name="name"
              size="w-full"
              maxLength={50}
            />
            <select
              className="bg-input indent-2 p-2 text-white"
              name="gender"
              onChange={handleUserInput}
            >
              <option>Female</option>
              <option>Male</option>
              <option>Other</option>
            </select>
            <InputComponent
              type="date"
              placeholder="Year of Birth"
              onChange={handleUserInput}
              name="age"
              size="w-full"
              maxLength={50}
            />

            <InputComponent
              type="password"
              placeholder="Password"
              onChange={handleUserInput}
              name="password"
              size="w-full"
              maxLength={50}
            />
            <InputComponent
              type="password"
              placeholder="Confirm Password"
              onChange={handleUserInput}
              name="confirmPassword"
              size="w-full"
              maxLength={50}
            />
          </div>
          {/* Terms and Policy */}
          <div className="flex items-start gap-x-2">
            <input type="checkbox"></input>
            <p className="text-sm text-white">
              I’ve read and agree with{" "}
              <span className="font-extrabold text-lightText">
                Terms of Service
              </span>{" "}
              and our{" "}
              <span className="font-extrabold text-lightText">
                Privacy Policy
              </span>
            </p>
          </div>
          {/* END of Terms and Policy */}
          <ButtonComponent text="Sign up" handleEvent={handleEvent} />
          <p className="text-md text-white">
            Already have an account?{" "}
            <button
              className="font-bold text-lightText hover:text-lg"
              onClick={() => setShowSignUp((prevState) => !prevState)}
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export const LoginComponent: React.FC<AuthComponentProps> = ({
  handleUserInput,
  setShowSignUp,
  handleEvent,
}) => {
  return (
    <>
      {/* The whole container for the log in section */}
      <div className="w-[85%]  z-1 relative sm:w-[50%]  lg:w-[55%] xl:w-[40%]">
        {/* The login text and opening sentence below */}
        <div className="mb-8">
          <div className="flex flex-col gap-y-2">
            <p className="text-5xl text-light font-bold">Log in</p>
            <p className="text-indigo-100 font-light text-md">
              Enter your credentials to continue
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <InputComponent
            type="email"
            placeholder="Email"
            onChange={handleUserInput}
            name="email"
            size="w-full"
            maxLength={50}
          />
          <InputComponent
            type="password"
            placeholder="Password"
            onChange={handleUserInput}
            name="password"
            size="w-full"
            maxLength={50}
          />
          <ButtonComponent text="Login" handleEvent={handleEvent} />
          <p className="text-md text-white">
            Don't have an account?{" "}
            <button
              className="font-bold text-lightText hover:text-lg"
              onClick={() => setShowSignUp((prevState) => !prevState)}
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </>
  );
};
