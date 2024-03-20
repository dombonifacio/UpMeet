import Header from "../components/Header";
import logo from "../components/logo.png";

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

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { country, genre } = useContext(FilterContext);
  const { user, setUser } = useContext(UserContext);

  // store the country selected in a state

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    country.setSelectedCountry(event.target.value);
  };

  const handleLogout = () => {
    axios
      .get("/api/auth/logout")
      .then((res: AxiosResponse) => {
        console.log(res.data);
        navigate("/");
      })
      .catch((err: Error) => {
        console.log("error axios", err);
      });
  };

  useEffect(() => {
    axios
      .get("/api/users/me")
      .then((res: AxiosResponse) => {
        setUser(res.data);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (user) {
      console.log(user, "user");
    }
  }, [user]);

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
      <Header />
     
      <div className="flex justify-center h-[450px] bg-heading ">
        <img src={logo} />
      </div>

      <div className="p-20 bg-heading">
        <div className="flex justify-center">
          <label
            htmlFor="search-dropdown"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Your Email
          </label>

          <div className="relative w-3/4">
            <input
              type="search"
              id="search-dropdown"
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder="Search Artists, Venues, Events..."
              required
            />
            <button
              type="submit"
              className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>

          {/* Dropdown menu */}
          <div className="mt-2 mx-5">
            <label htmlFor="countries" className="text-white text-sm">
              Select a Country
            </label>
          </div>
          <div className="mt-2">
            <select
              name="countries"
              className="border border-black"
              onChange={handleCountryChange}
              value={country.selectedCountry}
            >
              {countries.map((country) => (
                <option value={country.abbreviation}>{country.country}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="m-10 p-5 bg-white/10">
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

            {/* BIG PICTURE ON THE RIGHT */}
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
      </div>

      <div className="m-10 p-5 bg-white/10">
        <div>
          <p className="text-white text-[30px] ml-20 underline mb-4">
            {" "}
            Best Selling{" "}
          </p>
        </div>

        <div className="flex justify-center mx-20 mb-6">
          <div className="flex flex-row justify-between w-full">
            <div className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat">
              <img
                src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                className="max-w-xs h-full w-fit"
                alt="Louvre"
              />
              <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-black bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-50 text-purple-900">
                {" "}
                <p className="text-white text-center mt-20 text-[30px]">
                  {" "}
                  Concert
                </p>
              </div>
            </div>

            <div className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat">
              <img
                src="https://images.unsplash.com/photo-1562329265-95a6d7a83440?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2140&q=80"
                className="max-w-xs h-full w-fit"
                alt="Louvre"
              />
              <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-black bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-50 text-purple-900">
                {" "}
                <p className="text-white text-center mt-20 text-[30px]">
                  {" "}
                  Arts & Theatre
                </p>
              </div>
            </div>

            <div className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat">
              <img
                src="https://images.unsplash.com/photo-1459865264687-595d652de67e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                className="max-w-xs h-full w-fit"
                alt="Louvre"
              />
              <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-black bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-50 text-purple-900">
                {" "}
                <p className="text-white text-center mt-20 text-[30px]">
                  {" "}
                  Sports
                </p>
              </div>
            </div>

            <div className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat">
              <img
                src="https://images.unsplash.com/photo-1565130936029-a26a11ecc813?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                className="max-w-xs h-full w-fit"
                alt="Louvre"
              />
              <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-black bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-50 text-purple-900">
                {" "}
                <p className="text-white text-center mt-20 text-[30px]">
                  {" "}
                  Family
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="text-white text-[30px] ml-20 underline mb-4">
            {" "}
            Discover New
          </p>
        </div>
        <div className="flex justify-center mx-20">
          <div className="flex flex-row justify-between w-full">
            <div className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat">
              <img
                src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2148&q=80"
                className="max-w-xs"
                alt="Louvre"
              />
              <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-black bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-50 text-purple-900">
                {" "}
                <p className="text-white text-center mt-20 text-[30px]">
                  {" "}
                  Concert
                </p>
              </div>
            </div>

            <div className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat">
              <img
                src="https://images.unsplash.com/photo-1516307365426-bea591f05011?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2318&q=80"
                className="max-w-xs h-full w-fit"
                alt="Louvre"
              />
              <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-black bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-50 text-purple-900">
                {" "}
                <p className="text-white text-center mt-20 text-[30px]">
                  {" "}
                  Theatre
                </p>
              </div>
            </div>

            <div className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat">
              <img
                src="https://images.unsplash.com/photo-1471295253337-3ceaaedca402?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2336&q=80"
                className="max-w-xs h-full w-fit"
                alt="Louvre"
              />
              <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-black bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-50 text-purple-900">
                {" "}
                <p className="text-white text-center mt-20 text-[30px]">
                  {" "}
                  Sports
                </p>
              </div>
            </div>

            <div className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat">
              <img
                src="https://images.unsplash.com/photo-1506918092809-0ba639cd1385?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2148&q=80"
                className="max-w-xs h-full w-fit"
                alt="Louvre"
              />
              <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-black bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-50 text-purple-900">
                {" "}
                <p className="text-white text-center mt-20 text-[30px]">
                  {" "}
                  Family
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
