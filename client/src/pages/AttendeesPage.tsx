import axios, { AxiosResponse } from "axios";
import Header from "../components/Header";
import { notifyUser } from "../utils/helpers/toastify";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AttendeesContainer from "../components/Attendees/AttendeesContainer";

export default function AttendeesPage() {
  // useEffect(() => {
  //   getEventAttendees()
  // }, [])

  return (
    <>
    
      <Header />
      <div className="mx-auto flex justify-center md:block max-w-[1260px] w-screen sm:p-4 md:w-screen">
        <AttendeesContainer />
      </div>
    </>
  );
}
