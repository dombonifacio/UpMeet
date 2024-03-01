import { useContext, useEffect } from "react";

// hooks
import { useRoutes } from "react-router-dom";

// interfaces

import "./App.css";

// pages
import { HomePage } from "./pages/HomePage.tsx";

import { AuthPage } from "./pages/AuthPage.tsx";

// Context APIs
import { FilterContextProvider } from "./context/FilterContext.tsx";

import { EventsContextProvider } from "./context/EventsContext.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";

import EventListPage from "./pages/EventListPage.tsx";

import EventInfoPage from "./pages/EventInfoPage.tsx";

import { SavedEvents } from "./pages/SavedEvents.tsx";
import AttendeesPage from "./pages/AttendeesPage.tsx";

import { OwnEventInfoPage } from "./pages/OwnEventInfoPage.tsx";
import { InvitationsPage } from "./pages/InvitationsPage.tsx";
import { UserContext } from "./context/UserContext.tsx";

export const App = () => {
  const authenticated = localStorage.getItem("authenticated");
  const { data, setData } = useContext(UserContext);

  // Check first if it authenticated local storage is set to true
  useEffect(() => {
    if (authenticated) {
      setData({ ...data, isLoggedIn: true });
    }
  }, []);

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
      path: "/event/:country/:id",
      element: <EventInfoPage />,
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
