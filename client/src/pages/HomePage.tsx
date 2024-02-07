import Header from "../components/Header";
import logo from "../components/logo.png";
import header from "../assets/header.png";

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
import Title from "../components/Texts/Title.tsx";
import CategoryCard from "../components/Cards/CategoryCard.tsx";

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { country, genre } = useContext(FilterContext);

  // store the country selected in a state

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    country.setSelectedCountry(event.target.value);
  };

  

  return (
    <>
      <div className="w-full min-h-screen min-w-screen">
        <header className="relative">
         
          <div className="absolute bg-gradient-to-t from-vader w-full h-full bg-black/40">
            <div className="max-w-[1260px] mx-auto">
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
          <img src={header} className="w-full h-screen object-cover" />
        </header>
        <section id="categories">
          <div className="max-w-[1260px] mx-auto p-4 my-4">
            <div className="">
              <p className="font-bold text-lg md:text-xl ">Explore each</p>
           

                <Title text="Categories" />
          
              <p className="my-6">
                Discover a variety of available events, each offering a unique
                experience for unforgettable moments. Find your perfect match
                among a diverse selection of sports, concerts, family outings,
                and theatrical performances.
              </p>
            </div>
            <CategoryCard />
          </div>
        </section>
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
