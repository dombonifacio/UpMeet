import React from 'react'
import {Link} from "react-router-dom";


import logo from '../pages/logo.png';

// // import Avatar from '@mui/material/Avatar';

export default function Popup() {
  return (

    <div className="text-white flex flex-row justify-between">

                        <div className="mr-[10%]">
                            <p className="text-[20px]"> Event Info</p>
                            <p> Nov 14, 2023</p>
                            <p> Rogers Centre- Toronto Canada</p>
                            <p className="text-purple-300"> The cultural phenomenon continues as pop icon Taylor Swift performs hit songs in a once-in-a-lifetime concert experience. </p>
                        </div>

                        <div className="mx-[8%]">
    <p className="text-[20px]"> Attending with:</p>
    <div className="flex flex-row flex-wrap ">
    <Link to="/Profile" className="m-2">
        {/* <Avatar src="https://i.pinimg.com/236x/44/b9/65/44b965ef15668cf3ec5d7888be48ec3a.jpg" sx={{ width: 30, height: 30 }} /> */}
    </Link>
    <Link to="/Profile" className="m-2">
        {/* <Avatar src="https://i.pinimg.com/236x/44/b9/65/44b965ef15668cf3ec5d7888be48ec3a.jpg" sx={{ width: 30, height: 30 }} /> */}
    </Link>
    <Link to="/Profile" className="m-2">
        {/* <Avatar src="https://i.pinimg.com/236x/44/b9/65/44b965ef15668cf3ec5d7888be48ec3a.jpg" sx={{ width: 30, height: 30 }} /> */}
    </Link>
    <Link to="/Profile" className="m-2">
        {/* <Avatar src="https://i.pinimg.com/236x/44/b9/65/44b965ef15668cf3ec5d7888be48ec3a.jpg" sx={{ width: 30, height: 30 }} /> */}
    </Link>
    
    </div>
</div>

                    </div>
    
  )
}