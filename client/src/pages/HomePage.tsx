import Header from "../components/Header";
import logo from "../components/logo.png";
import header from "../assets/header.png"

// react hooks
import { useState, useEffect, useContext } from "react";

// third-party libraries
import axios, { AxiosError, AxiosResponse } from "axios";

// interfaces
import { Event } from "../interfaces/Event";
import { ICategory } from "../interfaces/Category.ts";
import { CategoryContainerComponent } from "../components/CategoryContainerComponent";

// contexts
import { FilterContext } from "../context/FilterContext.tsx";
import { useNavigate } from "react-router-dom";

// countries utils
import { countries } from "../utils/constants/Countries.ts";
import { CategoryCardComponent } from "../components/CategoryCardComponent.tsx";
import { UserContext } from "../context/UserContext.tsx";
import { Navbar } from "../components/Navbar/Navbar.tsx";
import { Logo } from "../components/Logo/Logo.tsx";



export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { country, genre } = useContext(FilterContext);

  // store the country selected in a state

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    country.setSelectedCountry(event.target.value);
  };

  
  // make an array and make the type be Category type. intialize all the necessary data
  const categoryList: ICategory[] = [
    {
      name: "Concerts",
      image:
        "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    },
    {
      name: "Arts & Theatre",
      image:
        "https://images.unsplash.com/photo-1539964604210-db87088e0c2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
    },
    {
      name: "Sports",
      image:
        "https://images.unsplash.com/photo-1607627000458-210e8d2bdb1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2049&q=80",
    },
    {
      name: "Family",
      image:
        "https://images.unsplash.com/photo-1472653816316-3ad6f10a6592?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    },
  ];

  return (
    <>
      <div className="w-full ">
        <header>
          <div
            style={{
              background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${header})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundAttachment: "fixed",
              height: "100vh",
              width: "100vw",
              // other styles...
            }}
            className="w-full"
          >
            {/* Your component content */}
            <div className="absolute top-0 right-0 left-0 bottom-0  mx-auto max-w-[1260px]">
              <div className="h-full absolute w-full">
                <Navbar />
              </div>
              <div className="title">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-wihte font-bold">
                  JAMCON
                </h1>
                <p className="text-sm text-slate-300 lg:text-lg xl:text-xl">
                  Discover new friendships through the power of shared
                  experiences, connecting people beyond events
                </p>

                <button className="bg-lavender p-3 text-sm my-6 rounded-md hover:bg-indigo-800 duration-75 font-medium">
                  Browse Categories
                </button>
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* <div className="mx-auto flex justify-center md:block max-w-[1260px] w-screen sm:p-4 md:w-screen"></div> */}

      {/* <div className="m-10 p-5 bg-white/10">
        <div className="text-white text-[40px] text-center p-5">
          <p>Browse Local Events Here</p>
        </div>

        <div className="mx-20 m-10">
          <div className="grid grid-cols-4 grid-rows-2 gap-4">
            {categoryList.map((category, index) => {
              return (
                <CategoryCardComponent categoryCard={category} key={index} />
              );
            })}

            <div className="relative overflow-hidden bg-cover bg-no-repeat col-span-2 row-span-2 col-start-3 row-start-1">
              <img
                src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3538&q=80"
                className=" h-full w-fit"
                alt="Louvre"
              />
              <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-black bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-50 text-purple-900">
                {" "}
                <p className="text-white text-center mt-[250px] text-[50px]">
                  {" "}
                  Hot Deals
                </p>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};
