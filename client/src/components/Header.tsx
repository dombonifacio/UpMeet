import { Link, useNavigate } from "react-router-dom";

import logo from "./logo.png";
import axios, { AxiosResponse } from "axios";
import { notifyUser } from "../utils/helpers/toastify";
import { ToastContainer } from "react-toastify";

// import Avatar from '@mui/material/Avatar';

export default function Header() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("user");
    axios
      .get("/api/auth/logout")
      .then((res: AxiosResponse) => {
        notifyUser(
          res.data.message + " Redirecting you to login page...",
          "success"
        );
        setTimeout(() => {
          navigate("/");
        }, 2000);
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
      <ToastContainer />
      <div className="flex flex-row justify-between sticky top-0 z-50  bg-black/75 items-center">
        <Link to="/">
          <div className="w-[200px]">
            <img src={logo} className="h-full" />
          </div>
        </Link>

        <div className="p-4 flex gap-x-4 items-center">
          <Link
            to={"/"}
            className="text-indigo-300 text-lg hover:text-indigo-500"
          >
            Home
          </Link>
          <Link
            to={"/profile"}
            className="text-indigo-300 text-lg hover:text-indigo-500"
          >
            Profile
          </Link>
          <Link
            to={"/saved_events"}
            className="text-indigo-300 text-lg hover:text-indigo-500"
          >
            Saved
          </Link>
          <Link
            to={"/invitations"}
            className="text-indigo-300 text-lg hover:text-indigo-500"
          >
            Invitations
          </Link>
          <button
            onClick={logout}
            className="text-indigo-300 text-lg hover:text-indigo-500"
          >
            Log out
          </button>
        </div>
      </div>
    </>
  );
}
