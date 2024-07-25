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
import { PreviousEventsContext } from "../context/SavedEventsContext";
import { Navbar } from "../components/Navbar/Navbar";
import moment from "moment";
import { timezones } from "../utils/constants/Timezones";

export const OwnEventInfoPage = () => {
  const { id } = useParams();
  const { data } = useContext(UserContext);
  const { events, setEvents } = useContext(EventsContext);
  const { previousEvents, setPreviousEvents } = useContext(
    PreviousEventsContext
  );
  // collect only the event selected
  const selectedEventArr = events.filter((event) => event.eventId === id);
  const selectedEvent = selectedEventArr[0];
  const [loading, setLoading] = useState<boolean>(false);

  const [isAttending, setIsAttending] = useState<boolean>(false);
  const [isPrevious, setIsPrevious] = useState<boolean>(false);

  const getTimezone = (offset: number): Date => {
    const d = new Date();
    const localTime = d.getTime();
    const localOffset = d.getTimezoneOffset() * 60000;
    const utc = localTime + localOffset;
    const eventCountry = utc + 3600000 * offset;
    const convertedTimezone = new Date(eventCountry);

    return convertedTimezone;
  };

  useEffect(() => {
    const checkIfPrevious = () => {
      const newPreviousEvents: IEvent[] = [];
      events?.forEach((event: IEvent) => {
        const eventDateTime = event.dateTime;
        const eventDateObj = new Date(eventDateTime);

        // get timezone of the event
        const convertTimezone = moment(eventDateTime);
        const timezone: string = convertTimezone.tz(event.timezone).format("z");

        // get UTC offset based on timezone. Use BST timezone if the event timezone is Europe/London
        const offset =
          event.timezone === "Europe/London" ? +1 : timezones[timezone];
        const currentEventTimezone = getTimezone(offset);

        // convert to date obj to be able to compare dates
        const convertCurrentTimezone = new Date(currentEventTimezone);

        // save to previous/future events
        if (convertCurrentTimezone > eventDateObj) {
          newPreviousEvents.push(event);
        }
        setPreviousEvents(newPreviousEvents);
      });
    };
    checkIfPrevious();
  }, []);

  useEffect(() => {
    const combineEvents = () => {
      setEvents([...previousEvents, ...events]);
    };
    combineEvents();
  }, []);

  const getSelfEvents = () => {
    setLoading(true);
    axios
      .get(
        "https://upmeet.onrender.com/api/eventAttendance/get_attending_events"
      )
      .then((res: AxiosResponse) => {
        setLoading(false);

        const getCurrentEvent = res.data?.some(
          (event: IEvent) => event.eventId === id
        );

        const checkIfPrevious = previousEvents?.some(
          (event: IEvent) => event.eventId === id
        );

        if (getCurrentEvent) {
          setIsAttending(true);
        }
        if (checkIfPrevious) {
          setIsAttending(false);
          setIsPrevious(true);
        }
      })
      .catch((error) => {
        if (error.status === 500) {
          notifyUser(error.data.error, "error");
        } else {
          notifyUser("An unexpected erorr occured", "error");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getSelfEvents();
  }, [previousEvents]);

  // Handle "I'm Going to the Event" Logic
  const handleGoingEvent = () => {
    axios
      .post(
        "https://upmeet.onrender.com/api/eventAttendance/create_attending_events",
        selectedEvent
      )

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
      .delete(
        `https://upmeet.onrender.com/api/eventAttendance/delete_attending/${id}/${userId}`
      )
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
    <div className="flex flex-col mx-auto max-w-[1260px] h-screen">
      <div>
        <Navbar />
      </div>
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
          <div className=" w-full  h-full p-4 md:flex md:flex-col gap-y-4 md:px-6 md:flex-wrap justify-center ">
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

              {!isAttending && isPrevious ? (
                ""
              ) : !isAttending ? (
                <button
                  className="mt-3 md:mt-0 bg-lavender hover:bg-indigo-800 py-2 px-4 text-sm hover:text-white font-bold md:text-md md:px-3 md:py-2 text-white rounded-lg lg:px-6 lg:py-2"
                  onClick={handleGoingEvent}
                >
                  Join Event
                </button>
              ) : (
                <button
                  onClick={handleDeleteEvent}
                  className="mt-3 md:mt-0 bg-lavender hover:bg-indigo-800 py-2 px-4 text-sm hover:text-white font-bold md:text-md md:px-3 md:py-2 text-white rounded-lg lg:px-6 lg:py-2"
                >
                  Cancel Event
                </button>
              )}
              <Link
                to={`/attendees/${id}`}
                className="mt-3 md:mt-0 bg-lavender hover:bg-indigo-800 py-2 px-4 text-sm hover:text-white font-bold md:text-md md:px-3 md:py-2 text-white rounded-lg lg:px-6 lg:py-2"
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
