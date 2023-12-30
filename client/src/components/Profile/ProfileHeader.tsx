import React from 'react'
import {Link, useNavigate} from "react-router-dom";


import logo from '../logo.png';
import axios, { AxiosResponse } from 'axios';
import { notifyUser } from '../../utils/helpers/toastify';



export default function ProfileHeader() {
  const navigate = useNavigate()
  const logout = () => {
    const userLoggedIn = JSON.parse(localStorage.getItem("user"));

    localStorage.removeItem("user")
    axios.get("/api/auth/logout").then((res: AxiosResponse) => {
      notifyUser(
        res.data.message + " Redirecting you to login page...",
        "success"
      )
      navigate("/")

    }) .catch((error) => {
      if (error.status === 500) {
        notifyUser(error.data.error, "error");
      } else {
        notifyUser(error.response?.data.error, "error");
      }
    });

    
  }
  return (

    <div className="flex flex-row justify-between sticky top-0 z-50 relative bg-black/75 items-center">
        

      <Link to="/">
      <div className="w-[200px]">
          <img src={logo}/>
      </div>
      </Link>
      <div className="p-4 flex gap-x-4">

        <Link to={'/'} className='text-indigo-300 text-lg hover:text-indigo-500'>Home</Link>
        <Link to={'/saved_events'} className='text-indigo-300 text-lg hover:text-indigo-500'>Saved</Link>
        <Link to={'/invitations'} className='text-indigo-300 text-lg hover:text-indigo-500'>Invitations</Link>
        <button onClick={logout} className='text-indigo-300 text-lg hover:text-indigo-500 font-semibold'>Log out</button>
        
      </div>
      

    
  </div>
  )
}