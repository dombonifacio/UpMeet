import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";

// import third party libraries
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { UserContextProvider } from "./context/UserContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
