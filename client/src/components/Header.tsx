import React from 'react'
import {Link} from "react-router-dom";


import logo from './logo.png';

// import Avatar from '@mui/material/Avatar';

export default function Header() {
  return (

    <div className="flex flex-row justify-between sticky top-0 z-50 
     bg-black/75">
  <Link to="/">
    <div className="w-[200px]">
        <img src={logo}/>
    </div>
    </Link>

{/* <div className="text-white flex flex-row justify-between w-[600px] mt-2 bg-gray-900 p-5">
    <p> Concert </p>
    <p> Arts & Theatre </p>
    <p> Sports </p>
    <p> Family </p>
  </div> */}

    <div className="m-5 w-[50px] rounded:2xl ">
    <Link to="/me">
            <img className="rounded-full" src="https://i.pinimg.com/236x/44/b9/65/44b965ef15668cf3ec5d7888be48ec3a.jpg" />
      </Link>
    </div>
    
</div>
  )
}
