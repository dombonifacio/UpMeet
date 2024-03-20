import React, { useContext, useEffect, useState } from "react";

import { Blob } from "../Background/Blob";
import EventPicture from "./EventPicture";
import { Link, useParams } from "react-router-dom";
import { EventsContext } from "../../context/EventsContext";

// icons
import { MdOutlineDateRange } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { UserContext } from "../../context/UserContext";
import axios, { Axios, AxiosError, AxiosResponse } from "axios";

export default function MainInfo() {
  const { id } = useParams();
  const { events } = useContext(EventsContext);
  const { user, setUser } = useContext(UserContext);
  const [error, setError] = useState<boolean>(false);
  console.log(id, 'id event')

  // collect only the event selected
  const selectedEventArr = events.filter((event) => event.id === id);
  const selectedEvent = selectedEventArr[0];

  useEffect(() => {
    if (user) {
      console.log("user data", user);
    }
  }, []);

  // Handle "I'm Going to the Event" Logic
  const handleGoingEvent = () => {
    if (user) {
      axios
        .post("/api/eventAttendance", selectedEvent)
        .then((res: AxiosResponse) => {
          console.log(res);
        })
        .catch((error: AxiosError) => {
          setError(true);
        });
    } else {
      console.log("No user is logged in.");
    }
  };

  // Handle "Delete to I'm Going to the event" logic
  const handleDeleteEvent = () => {
    
     const userId = user?._id
     
  

    if (user) {
      axios
        .delete(
          `/api/eventAttendance/${id}/${userId}`
        )
        .then((res: AxiosResponse) => {
          console.log(res);
        })
        .catch((error: AxiosError) => {
          setError(true);
          console.log(error, "error");
        });
    } else {
      console.log("No user is logged in.");
    }
  };

  const getEventAttendees = () => {
    axios.get(`/api/eventAttendance/${id}`).then((res: AxiosResponse) => {
      console.log(res, 'data')
    }).catch((error: AxiosError) => {
      console.log(error, "error")
    })
  }

  // Check if user is already going to that event. If they are, they have the option to delete event
  // As well as turn the "I'm Going" button to indicate that they're going

  return (
    <div className="md:flex md:justify-center md:h-full md:items-center md:px-6 relative z-1">
      <EventPicture
        image={selectedEvent?.images[0]?.url}
        eventName={selectedEvent?.eventName}
        artist={selectedEvent?.artist}
      />

      {/* DATE AND VENUE*/}
      <div className="p-6 w-full  h-full flex flex-col gap-y-4 md:px-6 md:flex-wrap">
        <div className="flex gap-x-2  flex-wrap gap-y-2">
          {/* DATE AND VENUE*/}
          <div className="flex items-center gap-x-1">
            <MdOutlineDateRange className="text-lavender text-[1.5rem]" />
            <p className="text-white font-bold text-xs  md:text-sm ">
              {selectedEvent?.date.toLocaleString()}
            </p>
          </div>
          <div className="flex items-center gap-x-1">
            <IoLocationOutline className="text-lavender text-[1.5rem]" />
            <p className="text-white font-bold text-xs md:text-sm e">
              {selectedEvent?.city},
            </p>
            <p className="text-white font-bold text-xs md:text-sm e">
              {selectedEvent?.country} —
            </p>
            <p className="text-white font-bold text-xs md:text-sm e">
              {selectedEvent?.venue}
            </p>
          </div>
        </div>
        {/* END OF DATE AND VENUE*/}

        <p className="text-white font-bold text-2xl lg:text-4xl">
          Get ready to enjoy an incredible experience at{" "}
          <span className="text-lightText md:text-3xl lg:text-4xl">
            {selectedEvent?.artist
              ? selectedEvent?.artist
              : selectedEvent?.eventName}
          </span>
          —an event you won't want to miss!
        </p>
        <p className="font-extralight text-white text-sm lg:text-md">
          Come be a part of the unforgettable experience at the{" "}
          <span className="text-lightText font-bold">
            {selectedEvent?.eventName}
          </span>
          , where every moment promises a blend of excitement and entertainment
          tailored just for you. From the electric atmosphere of live
          performances to the heartwarming moments shared with loved ones, our
          range of events ensures an experience that lingers as a cherished
          memory long after the curtains close or the game ends.
        </p>
        <div className="flex gap-x-4">
          <button
            className="bg-lavender hover:bg-indigo-800 py-2 px-4 text-sm hover:text-white font-bold md:text-md md:px-3 md:py-2 text-white rounded-lg lg:px-6 lg:py-2"
            onClick={handleGoingEvent}
          >
            I'm Going
          </button>
          <button
            onClick={handleDeleteEvent}
            className="bg-lavender hover:bg-indigo-800 py-2 px-4 text-sm hover:text-white font-bold md:text-md md:px-3 md:py-2 text-white rounded-lg lg:px-6 lg:py-2"
          >
            Not going anymore
          </button>
          <button
            className="bg-lavender hover:bg-indigo-800 py-2 px-4 text-sm hover:text-white font-bold md:text-md md:px-3 md:py-2 text-white rounded-lg lg:px-6 lg:py-2"
            onClick={getEventAttendees}
          >
            See Attendees
          </button>
        </div>
      </div>
    </div>
  );
}
