import axios, { AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IEvent } from "../interfaces/Event";
import { UserContext } from "../context/UserContext";
import { notifyUser } from "../utils/helpers/toastify";
import { ToastContainer } from "react-toastify";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import EventPicture from "../components/EventInfoPage/EventPicture";
import { EventsContext } from "../context/EventsContext";

export const OwnEventInfoPage = () => {
  const { id } = useParams();
  const { data } = useContext(UserContext);
  const { events } = useContext(EventsContext);
  // collect only the event selected
  const selectedEventArr = events.filter((event) => event.eventId === id);
  const selectedEvent = selectedEventArr[0];
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [isAttending, setIsAttending] = useState<boolean>(false);
  console.log(events, "events event");
  const getSelfEvents = () => {
    setLoading(true);
    axios
      .get("/api/eventAttendance/get_attending_events")
      .then((res: AxiosResponse) => {
        setLoading(false);
        console.log("API Response:", res.data);
        const getCurrentEvent = res.data?.some(
          (event: IEvent) => event.eventId === id
        );

        if (getCurrentEvent) {
          setIsAttending(true);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getSelfEvents();
  }, []);

  // Handle "I'm Going to the Event" Logic
  const handleGoingEvent = () => {
    axios
      .post("/api/eventAttendance/create_attending_events", selectedEvent)

      .then((res: AxiosResponse) => {
        if (res.status === 201 || 200) {
          setIsAttending((prevState) => !prevState);
          notifyUser(res.data.message, "success");
        }
      })
      .catch((error) => {
        if (error.status === 500) {
          notifyUser(error.data.error, "error");
        } else {
          notifyUser(error.response?.data.error, "error");
        }
      });
  };

  // Handle "Delete to I'm Going to the event" logic
  const handleDeleteEvent = () => {
    const userId = data.user?._id;

    axios
      .delete(`/api/eventAttendance/delete_attending/${id}/${userId}`)
      .then((res: AxiosResponse) => {
        if (res.status === 201 || 200) {
          setIsAttending((prevState) => !prevState);
          notifyUser(res.data.message, "success");
        }
      })
      .catch((error) => {
        if (error.status === 500) {
          notifyUser(error.data.error, "error");
        } else {
          notifyUser(error.response?.data.error, "error");
        }
      });
  };

  return (
    <div className="mx-auto max-w-[1260px] flex justify-center md:h-screen md:w-screen md:items-center">
      {loading ? (
        <p className="text-white text-5xl">Loading...</p>
      ) : (
        <div className="md:flex md:justify-center md:h-full md:items-center md:px-6 relative z-1">
          <ToastContainer />
          <EventPicture
            image={
              selectedEvent?.images && selectedEvent.images.length > 0
                ? selectedEvent.images[0].url
                : ""
            }
            eventName={selectedEvent?.eventName}
            artist={selectedEvent?.artist}
          />

          {/* DATE AND VENUE*/}
          <div className="p-6 w-full  h-full flex flex-col gap-y-4 md:px-6 md:flex-wrap justify-center">
            <div className="flex gap-x-2  flex-wrap gap-y-2">
              {/* DATE AND VENUE*/}
              <div className="flex items-center gap-x-1">
                {/* <button
                  className="bg-lavender hover:bg-indigo-800 py-2 px-4 text-sm hover:text-white font-bold md:text-md md:px-3 md:py-2 text-white rounded-lg lg:px-6 lg:py-2"
                  onClick={handleUnsaveEvent}
                >
                  Unsave this event
                </button> */}

                <MdOutlineDateRange className="text-lavender text-[1.5rem]" />
                <p className="text-white font-bold text-xs md:text-sm">
                  {selectedEvent?.date && selectedEvent.date.toLocaleString()}
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
              , where every moment promises a blend of excitement and
              entertainment tailored just for you. From the electric atmosphere
              of live performances to the heartwarming moments shared with loved
              ones, our range of events ensures an experience that lingers as a
              cherished memory long after the curtains close or the game ends.
            </p>
            <div className="flex gap-x-4">
              {/* FOR CHANIGNG THE UI OF BUTTON IF ATTENDING OR NOT */}
              {!isAttending ? (
                <button
                  className="bg-lavender hover:bg-indigo-800 py-2 px-4 text-sm hover:text-white font-bold md:text-md md:px-3 md:py-2 text-white rounded-lg lg:px-6 lg:py-2"
                  onClick={handleGoingEvent}
                >
                  Join Event
                </button>
              ) : (
                <button
                  onClick={handleDeleteEvent}
                  className="bg-lavender hover:bg-indigo-800 py-2 px-4 text-sm hover:text-white font-bold md:text-md md:px-3 md:py-2 text-white rounded-lg lg:px-6 lg:py-2"
                >
                  Cancel Event
                </button>
              )}

              <Link
                to={`/attendees/${id}`}
                className="bg-lavender hover:bg-indigo-800 py-2 px-4 text-sm hover:text-white font-bold md:text-md md:px-3 md:py-2 text-white rounded-lg lg:px-6 lg:py-2"
              >
                See Attendees
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
