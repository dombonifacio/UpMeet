import { useContext, useEffect, useState } from "react";
import EventPicDate from "./EventPicDate";
import { EventsContext } from "../../context/EventsContext";
import { FilterComponent } from "../Filter/FilterComponent";

import { Link } from "react-router-dom";

import { FaBookmark, FaRegBookmark } from "react-icons/fa";

import axios, { AxiosResponse } from "axios";
import { notifyUser } from "../../utils/helpers/toastify";
import { UserContext } from "../../context/UserContext";
import { IEvent } from "../../interfaces/Event";
import { ToastContainer } from "react-toastify";
import {
  ArtsGenre,
  FamilyGenre,
  MusicGenre,
  SportsGenre,
} from "../../utils/constants/Genres";
import { FilterContext } from "../../context/FilterContext";
interface IMainBodyProps {
  eventsShown: number;
  currentCategoryEnum:
    | typeof MusicGenre
    | typeof SportsGenre
    | typeof ArtsGenre
    | typeof FamilyGenre;
}

export default function MainBody({
  eventsShown,
  currentCategoryEnum,
}: IMainBodyProps) {
  const { events, setEvents } = useContext(EventsContext);
  const { country, city, genre } = useContext(FilterContext);
  const { data } = useContext(UserContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [savedEvent, setSavedEvent] = useState<boolean>(false);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (
      event.target.name === "country" &&
      country &&
      country.setSelectedCountry
    ) {
      country.setSelectedCountry(event.target.value);
    } else if (
      event.target.name === "genre" &&
      genre &&
      genre.setSelectedGenreId
    ) {
      genre.setSelectedGenreId(event.target.value);
    } else if (event.target.name === "city" && city && city.setSelectedCity) {
      city.setSelectedCity(event.target.value);
    }
  };

  const getSavedEvents = () => {
    setLoading(true);
    axios
      .get(`/api/eventAttendance/get_saved_events`, {
        withCredentials: true
      })
      .then((res: AxiosResponse) => {
        const eventIds = res.data.map((event: IEvent) => event.eventId);

        setEvents((prevEvents) => {
          // Update the events array to set isSaved to true for saved events
          const updatedEvents = prevEvents?.map((event: IEvent) => ({
            ...event,
            isSaved: eventIds.includes(event.eventId),
          }));
          return updatedEvents;
        });
      })
      .catch((error) => {
        if (error.status === 500) {
          notifyUser(error.data.error, "error");
        } else {
          notifyUser(error.response?.data.error, "error");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getSavedEvents();
  }, []); // Include 'events' as a dependency

  useEffect(() => {
    getSavedEvents();
  }, [savedEvent]);

  const handleSaveEvents = (selectedEvent: IEvent) => {
    axios
      .post(`/api/eventAttendance/create_saved_events`, selectedEvent, {
        withCredentials: true
      })
      .then((res: AxiosResponse) => {
        if (res.status === 201 || 200) {
          setSavedEvent((prevState) => !prevState);
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

  const handleUnsaveEvent = (eventId: string) => {
    const userId = data?.user?._id;

    axios
      .delete(`/api/eventAttendance/delete_saved/${eventId}/${userId}`, {
        withCredentials: true
      })
      .then((res: AxiosResponse) => {
        if (res.status === 201 || 200) {
          setSavedEvent((prevState) => !prevState);
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
    <>
      <ToastContainer />

      {!loading ? (
        <div className="px-4">
          {/* START DROPDOWN MENU */}

          {/* END DROPDOWN */}

          {/* START EVENT LIST */}

          <div className="w-full">
            <div className="my-4">
              <FilterComponent
                handleFilterChange={handleFilterChange}
                currentCategoryEnum={currentCategoryEnum}
              />
            </div>

            {events.length > 0 ? (
              events.slice(0, eventsShown).map((event) => {
                const imageUrl = event?.images?.[0]?.url || "";
                return (
                  <div className="bg-input rounded-lg sm:flex sm:items-center md:flex mb-6">
                    {/* Image */}

                    <EventPicDate image={imageUrl} date={event.date} />

                    {/* Event Information beside image */}
                    <div className="px-2 my-2 sm:my-0 md:px-4 flex flex-col  grow flex-wrap">
                      {/* First Line Arist, time, city, country */}
                      <div className="flex gap-x-2 items-center max-w-[80%] md:w-full">
                        {/* If there is event artist then show the artist name */}
                        {event.artist && (
                          <>
                            <p className="text-indigo-300 text-sm font-bold line-clamp-1 truncate">
                              {event.artist}
                            </p>
                          </>
                        )}

                        <p className="text-indigo-300 text-sm">
                          {event.startTime}
                        </p>
                        <div className="h-1 w-1 bg-indigo-400 rounded-full"></div>
                        <p className="text-indigo-300 text-sm ">
                          {event.country === "United States Of America"
                            ? "US"
                            : event.country}
                        </p>
                        <div className="h-1 w-1 bg-indigo-400 rounded-full"></div>
                        <p className="text-indigo-300 text-sm">{event.city}</p>
                      </div>

                      {/* Event Name */}
                      <div className="max-w-[80%] md:w-full">
                        <p className="text-lightText font-bold truncate lg:text-xl">
                          {event.eventName}
                        </p>
                      </div>

                      {/* Third Line guests, genre */}
                      {event?.guests && event.guests.length > 0 ? (
                        <div className="flex gap-x-2 items-center">
                          <p className="text-sm text-indigo-300 font-semibold">
                            With:{" "}
                          </p>
                          <p className="text-indigo-300 text-sm">
                            {event?.guests}
                          </p>
                        </div>
                      ) : (
                        ""
                      )}

                      <div className="flex gap-x-2">
                        <p className="text-indigo-300 text-sm">
                          Genres: {event?.genre?.join(", ")}
                        </p>
                      </div>
                    </div>
                    {/* End of Event Information beside image */}

                    {/* See More Info */}
                    <div className=" flex items-center gap-x-2 px-2 pb-6 md:pb-0 md:px-6 md:flex md:items-center md:gap-x-2">
                      <Link
                        className="bg-lavender hover:bg-indigo-800 p-2 hover:text-white text-sm md:text-md md:px-3 md:py-2 text-white rounded-lg"
                        to={`/event/${country.selectedCountry}/${event.eventId}`}
                      >
                        See Event
                      </Link>
                      {!event.isSaved ? (
                        <button onClick={() => handleSaveEvents(event)}>
                          <FaRegBookmark size={"1.4rem"} />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleUnsaveEvent(event.eventId)}
                        >
                          <FaBookmark size={"1.4rem"} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-white text-2xl font-bold">
                No events available
              </p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-white text-5xl">Loading...</p>
      )}
      {/* START PICTURES */}
    </>
  );
}
