import { Link } from "react-router-dom";
import { IEvent } from "../../interfaces/Event";
import EventPicDate from "../EventList/EventPicDate";

interface PreviousEventsProps {
  data: IEvent[];
  loading: boolean;
}

export const PreviousEvents = ({ data, loading }: PreviousEventsProps) => {
  return (
    <>
      {loading ? (
        <>
          <p>Loading...</p>
        </>
      ) : (
        <>
          {data.length <= 0 ? (
            <p className="text-white font-2xl font-bold">No previous events</p>
          ) : (
            <>
              {data.map((event: IEvent) => {
                return (
                  <>
                    <div className="bg-input rounded-lg sm:flex sm:items-center md:flex mb-6">
                      {/* Image */}

                      <EventPicDate
                        image={(event?.images && event?.images[0].url) || ""}
                        date={event.date}
                      />

                      {/* Event Information beside image */}
                      <div className="p-4 sm:my-0 md:px-4 flex flex-col  grow flex-wrap">
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
                          <p className="text-indigo-300 text-sm">
                            {event.city}
                          </p>
                        </div>
                        {/* Event Name */}
                        <div className="max-w-[80%] md:w-full">
                          <p className="text-lightText font-bold truncate lg:text-xl">
                            {event.eventName}
                          </p>
                        </div>
                        {/* Third Line guests, genre */}
                        {event?.guests && event?.guests?.length > 0 ? (
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
                        <div className="block my-2 md:hidden ">
                          <Link
                            className="bg-lavender hover:bg-indigo-800 hover:text-white p-2 text-sm md:text-md md:px-3 md:py-2 text-white rounded-lg"
                            to={`/event_info/${event.eventId}`}
                          >
                            See Event
                          </Link>
                        </div>
                      </div>
                      {/* End of Event Information beside image */}

                      {/* See More Info */}
                      <div className="hidden  px-2 pb-6 md:pb-0 md:px-6 md:flex md:items-center md:gap-x-2">
                        <Link
                          className="bg-lavender hover:bg-indigo-800 p-2 hover:text-white text-sm md:text-md md:px-3 md:py-2 text-white rounded-lg"
                          to={`/event_info/${event.eventId}`}
                        >
                          See Event
                        </Link>
                      </div>
                    </div>
                  </>
                );
              })}
            </>
          )}
        </>
      )}
    </>
  );
};
