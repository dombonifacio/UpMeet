import React from 'react'
import {Link} from "react-router-dom";


import logo from '../logo.png';



export default function ProfileHeader() {
  return (

    <div className="flex flex-row justify-between sticky top-0 z-50 relative bg-black/75">
        

  <Link to="/">
    <div className="w-[200px]">
        <img src={logo}/>
    </div>
    </Link>

    
</div>
  )
}