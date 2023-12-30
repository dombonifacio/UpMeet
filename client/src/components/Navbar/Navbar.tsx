import { Link } from "react-router-dom";
import logo from "../logo.png"

export const Navbar = () => {
  return (

    <div className="flex flex-row justify-between sticky top-0 z-50 relative bg-black/75">
  <Link to="/FirstPage">
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

    <div className="m-5">
    <Link to="/Profile">
            {/* <Avatar src="https://i.pinimg.com/236x/44/b9/65/44b965ef15668cf3ec5d7888be48ec3a.jpg" sx={{ width: 50, height: 50 }} /> */}
      </Link>
    </div>
    
</div>
  )
};
