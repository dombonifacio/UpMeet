import { useContext, useEffect, useState } from "react";

// hooks
import { useRoutes } from "react-router-dom";

// interfaces

import "./App.css";

// pages
import { HomePage } from "./pages/HomePage.tsx";

import { AuthPage } from "./pages/AuthPage.tsx";

// Context APIs
import { FilterContextProvider } from "./context/FilterContext.tsx";
import { TestPage } from "./pages/TestPage.tsx";
import useAuth from "./hooks/useAuth.ts";

import { EventsContextProvider } from "./context/EventsContext.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import EventListPage from "./pages/EventListPage.tsx";
import { Navbar } from "./components/Navbar/Navbar.tsx";
import EventInfoPage from "./pages/EventInfoPage.tsx";
import { UserContext, UserContextProvider } from "./context/UserContext.tsx";
import axios, { AxiosResponse, AxiosError } from "axios";

export const App = () => {
  // use our useAuth hook
  const { auth, loading } = useAuth();

  if (loading) {
    // Return a loading indicator or component here
    return <p className="text-5xl text-white">Loading...</p>;
  }

  let element = useRoutes([
    {
      path: "/",
      // element: <HomePage />,
      // Implement logic fpr Login Page and Home Page when login page is done
      // element: auth ? <HomePage /> : <AuthPage />,

      element: <HomePage />
    },
    {
      path: "/auth",
      element: <AuthPage />,
    },

    {
      path: "/me",
      element: <ProfilePage />,
    },
    {
      path: "/:category",
      element: <EventListPage />,
    },
    {
      path: "/event/:country/:id",
      element: <EventInfoPage />,
    },

    {
      path: "/cloudinary",
      element: <TestPage />,
    },
  ]);

  return (
    <>
      <FilterContextProvider>
        <UserContextProvider>
          <EventsContextProvider>{element}</EventsContextProvider>
        </UserContextProvider>
      </FilterContextProvider>
    </>
  );
};
