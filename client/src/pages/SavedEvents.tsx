import { useContext, useEffect, useState } from "react";
import { Navbar } from "../components/Navbar/Navbar";
import { EventsContainer } from "../components/SavedEvents/EventsContainer";
import { UserContext } from "../context/UserContext";
import axios from "axios";

export const SavedEvents = () => {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState<boolean>(false);

  const getUserInfo = () => {
    setLoading(true);
    axios
      .get("/api/users/profile")
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  if (loading) {
    return (
      <div className="max-w-[1260px] mx-auto">
        <Navbar />
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-[1260px] mx-auto">
        <Navbar />
      </div>

      <div className="mx-auto flex justify-center md:block max-w-[1260px] w-screen  md:w-screen ">
        <EventsContainer />
      </div>
    </>
  );
};
