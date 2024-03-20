// react hooks
import {
  MouseEventHandler,
  useState,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
} from "react";

// interfaces
import { IUser } from "../interfaces/User";

// uuid third party library
import { v4 as uuid } from "uuid";
import axios, { Axios, AxiosError } from "axios";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { InputComponent } from "../components/Form/InputComponent";
import { ButtonComponent } from "../components/Form/ButtonComponent";
import { Blob } from "../components/Background/Blob";

export const AuthPage = () => {
  const [formData, setFormData] = useState<IUser>({} as IUser);
  const [showSignUp, setShowSignUp] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [uploadedImage, setUploadedImage] = useState<string>("");

  const [error, setError] = useState<boolean>(false);
  const handleImageUpload = () => {
    if (selectedImage) {
      // create form data
      const formData = new FormData();

      // cloudinary key
      formData.append("upload_preset", "mystorage");
      // upload to a specific folder
      formData.append("file", selectedImage);

      // call API for cloudinary
      axios
        .post("https://api.cloudinary.com/v1_1/dpj2su9ea/upload", formData)
        .then((res: AxiosResponse) => {
          setUploadedImage(res.data.url);
        })
        .catch((error: AxiosError) => {
          setError(true);
        });
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    if (selectedImage) {
      console.log(selectedImage, "selected image");
    }
  }, [selectedImage]);

  const handleUserInput = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const key = event.target.name;
    const value = event.target.value;

    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleSignUp = () => {
    handleImageUpload();
    if (uploadedImage) {
      const userData = {
        email: formData.email,
        name: formData.name,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        gender: formData.gender,
        age: formData.age,
        country: formData.country,
        image: uploadedImage,
      };
      axios
        // ****************** Need to use the server's URL and Port Number (Specified by server)
        .post("/api/auth/register", userData)
        .then((res: AxiosResponse) => {
          console.log(res);
        })
        .catch((error: AxiosError) => {
          console.log(error, "error");
        });
    }
  };

  const navigate = useNavigate();

  const handleLogin = () => {
    axios
      .post("/api/auth/login", formData, {
        withCredentials: true,
      })
      .then((res: AxiosResponse) => {
        console.log(res.data.message);
        setTimeout(() => {
          navigate("/");
        }, 2500);
      })

      .catch((error: AxiosError) => {
        console.log("error", error);
      });
  };

  return (
    <>
      <div className="h-screen w-screen md:flex">
        <FormContainer>
          {showSignUp ? (
            <SignUpComponent
              handleUserInput={handleUserInput}
              setShowSignUp={setShowSignUp}
              handleEvent={handleSignUp}
              handleImageUpload={handleImageUpload}
              setSelectedImage={setSelectedImage}
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
        <div className="hidden lg:flex h-full relative border-4 border-blue-400"></div>
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
  handleImageUpload?: () => void;
  setSelectedImage?: Dispatch<SetStateAction<string>>;
};

export const SignUpComponent: React.FC<AuthComponentProps> = ({
  handleUserInput,
  setShowSignUp,
  handleEvent,
  handleImageUpload,
  setSelectedImage,
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
              className="bg-input indent-2 p-2"
              name="gender"
              onChange={handleUserInput}
            >
              <option>Female</option>
              <option>Male</option>
              <option>Other</option>
            </select>
            <InputComponent
              type="number"
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
            <p className="text-sm">
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
          <p className="text-md text-center">
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
      <div>
        <input
          onChange={(event) => setSelectedImage(event.target.files[0])}
          type="file"
        />
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
