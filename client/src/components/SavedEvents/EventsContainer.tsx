import { useContext, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { notifyUser } from "../../utils/helpers/toastify";
import { IEvent } from "../../interfaces/Event";
import { ToastContainer } from "react-toastify";
import { EventsCard } from "./EventsCard";
import { UserContext } from "../../context/UserContext";

export const EventsContainer = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [savedEvents, setSavedEvents] = useState<IEvent[]>([]);
  const [error, setError] = useState<string>("");

  const { user } = useContext(UserContext);

  const getSavedEvents = () => {
    console.log("Calling getSavedEvents...");
    setLoading(true);
    axios
      .get("/api/eventAttendance/get_saved_events")
      .then((res: AxiosResponse) => {
        setSavedEvents(res.data);
      })
      .catch((error) => {
        if (error.status === 500) {
          notifyUser(error.data.error, "error");
        } else {
          setError(error.response?.data.error);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

   const handleUnsaveEvent = (eventId: string) => {
     const userId = user?._id;

     axios
       .delete(`/api/eventAttendance/delete_saved/${eventId}/${userId}`)
       .then((res: AxiosResponse) => {
         if (res.status === 201 || 200) {
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

  useEffect(() => {
    getSavedEvents();
    
  }, []);

  
  return (
    <>
      <ToastContainer />
      {loading ? (
        <p className="text-white text-4xl font-bold">Loading</p>
      ) : (
        <div className="mt-5 space-y-6 p-4 w-5/6 md:w-full">
          {savedEvents?.length === 0 || !savedEvents ? (
            <div className="w-full h-full">
              <p className="text-4xl text-center w-full font-bold">
                You have no saved events. Try saving one!
              </p>
            </div>
          ) : (
            <>
              <div className="flex gap-x-2 sm:items-center">
                <div className="bg-lavender w-2 sm:h-8"></div>
                <h1 className="text-electric font-bold text-4xl ">
                  Saved Events
                </h1>
              </div>

              <div className="grid grid-cols-1 w-full place-items-center gap-y-5 sm:gap-x-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                {savedEvents.map((event) => (
                  <div key={event.eventId} className="h-full">
                    <EventsCard
                      artist={event.artist as string}
                      eventId={event.eventId}
                      city={event.city as string}
                      country={event.country as string}
                      date={event.date}
                      eventName={event.eventName as string}
                      genre={event.genre as string[]}
                      guests={event.guests as string[]}
                      venue={event.venue as string}
                      images={event?.images[0].url}
                      timezone={event.timezone}
                      startTime={event.startTime as string}
                      unsaveEvent={() => handleUnsaveEvent(event.eventId)}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
