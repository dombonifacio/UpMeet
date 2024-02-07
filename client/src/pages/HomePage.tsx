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
          <div className="absolute bg-gradient-to-t from-vader w-full h-full bg-black/30">
            <div className="max-w-[1640px] mx-auto">
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
        <div className="max-w-[1640px] mx-auto py-4 px-6 my-4">
          <section id="categories">
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
          </section>

          <section id="featured">
            <div className="mt-16">
              <Title text="FEATURED MUSIC EVENTS" />
              <div className="grid grid-cols-2">
                

              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
