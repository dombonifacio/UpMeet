import { Link } from "react-router-dom";

// icons
import { HiOutlineXMark } from "react-icons/hi2";
import { CgMenuRight } from "react-icons/cg";
import { Logo } from "../Logo/Logo";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const handleShowMenu = () => {
    setShowMenu((prevState) => !prevState);
  };

  useEffect(() => {
    console.log(showMenu, "show menu is");
  }, [showMenu]);

  return (
    <>
      {/* MOBILE RESPONSIVE DESIGN */}
      <div className="flex justify-between h-full w-full">
        <div className={`p-4 ${showMenu ? "hidden" : "block"} md:block`}>
          <Logo />
        </div>

        {/* MENU */}
        <div
          className={`bg-vader w-[60%] sm:w-[40%] p-4 ${showMenu ? "block" : "hidden"} md:bg-inherit md:w-full md:flex`}
        >
          {/* LOGO AND EXIT MENU */}
          <div className="flex justify-between md:hidden">
            <Logo />
            <button onClick={handleShowMenu}>
              <HiOutlineXMark size={"1.8rem"} />
            </button>
          </div>
          {/* END OF LOGO AND EXIT MENU */}

          
          <ul className="mt-5 space-y-6 md:space-y-0 md:mt-0 md:flex md:space-x-6 md:ml-auto">
            <li>
              <Link
                to={"/"}
                className="text-slate-200 text-lg hover:text-indigo-300 transition-colors duration-150"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to={"/profile"}
                className="text-slate-200 text-lg transition-colors duration-150 hover:text-indigo-300"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                to={"/saved_events"}
                className="text-slate-200 text-lg transition-colors duration-150 hover:text-indigo-300"
              >
                Saved
              </Link>
            </li>
            <li>
              <Link
                to={"/invitations"}
                className="text-slate-200 text-lg transition-colors duration-150 hover:text-indigo-300"
              >
                Invitations
              </Link>
            </li>
          </ul>
        </div>
        {/* End of Menu */}

        {/* Hamburger Menu */}
        <div className={`p-4 md:hidden`}>
          <button onClick={handleShowMenu}>
            <CgMenuRight size={"1.8rem"} />
          </button>
        </div>
        {/* End of Hamburger Menu */}
      </div>
      {/* Menu */}
    </>
  );
};