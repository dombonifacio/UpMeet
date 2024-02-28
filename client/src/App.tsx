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

import { EventsContextProvider } from "./context/EventsContext.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import EventListPage from "./pages/EventListPage.tsx";
import { Navbar } from "./components/Navbar/Navbar.tsx";
import EventInfoPage from "./pages/EventInfoPage.tsx";

import axios, { AxiosResponse, AxiosError } from "axios";
import { SavedEvents } from "./pages/SavedEvents.tsx";
import AttendeesPage from "./pages/AttendeesPage.tsx";
import useLocalStorage from "./hooks/useLocalStorage.tsx";

import {
  AuthContext,
  AuthContextProvider,
} from "./context/isAuthenticatedContext.tsx";
import { OwnEventInfoPage } from "./pages/OwnEventInfoPage.tsx";
import { InvitationsPage } from "./pages/InvitationsPage.tsx";
import { UserContext, UserContextProvider } from "./context/UserContext.tsx";

export const App = () => {
  const authenticated = localStorage.getItem("authenticated");
  const { data } = useContext(UserContext);

  useEffect(() => {
    console.log(data, "data is");
  }, [data]);

  let element = useRoutes([
    {
      path: "/",

      element: data.isLoggedIn ? <HomePage /> : <AuthPage />,
    },
    {
      path: "/profile",
      element: <ProfilePage />,
    },
    {
      path: "/saved_events",
      element: <SavedEvents />,
    },
    {
      path: "/invitations",
      element: <InvitationsPage />,
    },
    {
      path: "/event_info/:id",
      element: <OwnEventInfoPage />,
    },
    {
      path: "/attendees/:id",
      element: <AttendeesPage />,
    },
    {
      path: "/event/:country/:id",
      element: <EventInfoPage />,
    },
    {
      path: "/:category",
      element: <EventListPage />,
    },
  ]);

  return (
    <>
      <FilterContextProvider>
        <EventsContextProvider>
          <>
            {/* Render your components here */}

            {element}
          </>
        </EventsContextProvider>
      </FilterContextProvider>
    </>
  );
};
