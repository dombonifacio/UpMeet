import { useContext } from "react";
import EventPicDate from "./EventPicDate";
import { EventsContext } from "../../context/EventsContext";
import { FilterComponent } from "../Filter/FilterComponent";
import { getCategoryEnum } from "../../utils/helpers/filter";
import { FilterContext } from "../../context/FilterContext";
import { Link } from "react-router-dom";

interface IMainBodyProps {
  eventsShown: number;
}

export default function MainBody({ eventsShown }: IMainBodyProps) {
  const { events } = useContext(EventsContext);
  const { country, city, genre } = useContext(FilterContext);
  const currentCategoryEnum = getCategoryEnum();

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.name === "country") {
      country.setSelectedCountry(event.target.value);
    } else if (event.target.name === "genre") {
      genre.setSelectedGenreId(event.target.value);
    } else if (event.target.name === "city") {
      city.setSelectedCity(event.target.value);
    }
  };

  return (
    <>
      {/* START PICTURES */}
      <div className="lg:w-[80%]">
        <div className="text-white text-3xl md:text-4xl lg:text-6xl text-left font-bold">
          <p className="mb-6">Music {}</p>  

          {/*  */}

          <div className="grid grid-rows-1 md:grid-cols-5 md:grid-rows-4 content-center gap-y-4 gap-x-4 ">
            <div className="md:col-span-3 md:row-span-4  ">
              <img
                className="w-full h-full  "
                src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt=""
              />
            </div>
            <div className="hidden md:block md:col-span-2 md:row-span-2 md:col-start-4 w-full">
              <img
                className=""
                src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt=""
              />
            </div>
            <div className="hidden md:block md:col-span-2 md:row-span-2 md:col-start-4 md:row-start-3 w-full">
              <img
                className="w-full h-full "
                src="https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt=""
              />
            </div>
          </div>
        </div>

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

          {events?.length > 0 ? (
            events.slice(0, eventsShown).map((event) => {
              return (
                <div className="bg-input rounded-lg sm:flex sm:items-center md:flex mb-6">
                  {/* Image */}

                  <EventPicDate
                    image={event?.images[0].url}
                    date={event.date}
                  />

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

                      <p className="text-indigo-300 text-sm">{event.time}</p>
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
                    {event?.guests?.length > 0 ? (
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
                        className="bg-lavender hover:bg-indigo-800 p-2 text-sm md:text-md md:px-3 md:py-2 text-white rounded-lg"
                        to={`/event/${country.selectedCountry}/${event.id}`}
                      >
                        See Event
                      </Link>
                    </div>
                  </div>
                  {/* End of Event Information beside image */}

                  {/* See More Info */}
                  <div className="hidden md:block  px-2 pb-6 md:pb-0 md:px-6 ">
                    <Link
                      className="bg-lavender hover:bg-indigo-800 p-2 text-sm md:text-md md:px-3 md:py-2 text-white rounded-lg"
                      to={`/event/${country.selectedCountry}/${event.id}`}
                    >
                      See Event
                    </Link>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No events available</p>
          )}
        </div>
      </div>
    </>
  );
}
