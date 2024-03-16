// react hooks
import { useContext, useEffect, useState } from "react";

// contexts
import { FilterContext } from "../context/FilterContext";

// react router
import { Link, useParams } from "react-router-dom";

// axios
import axios, { AxiosError, AxiosResponse } from "axios";

// interfaces
import { IError } from "../interfaces/Message.ts";
import { IEvent, IEventData, IImage } from "../interfaces/Event.ts";

import MainInfo from "../components/EventList/MainBody.tsx";

// constants
import { MusicGenre } from "../utils/constants/Genres";

// helper functions
import {
  getCategoryEnum,
  checkIfGenreDefault,
} from "../utils/helpers/filter.ts";
import { EventsContext } from "../context/EventsContext.tsx";
import { countries } from "../utils/constants/Countries.ts";
import { cities } from "../utils/constants/Cities.ts";
import { FilterComponent } from "../components/Filter/FilterComponent.tsx";
import { NavbarSearch } from "../components/Navbar/NavbarSearch.tsx";

import MainBody from "../components/EventList/MainBody.tsx";
import { Navbar } from "../components/Navbar/Navbar.tsx";

const EventListPage = () => {
  const { genre, country, city } = useContext(FilterContext);
  const { events, setEvents } = useContext(EventsContext);
  const { category } = useParams();
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [eventsShown, setEventsShown] = useState<number>(5);
  const [searchText, setSearchText] = useState<string>("");

  // store data here

  const API_KEY = "YG3ugvNGItpEUSyLn8m4eb4I8mlUzVXK";

  // checks what the category is to return the id enum for the genre selecting
  const currentCategoryEnum = getCategoryEnum();
  const defaultGenreQuery: string = checkIfGenreDefault();

  // to prevent API from generating errors
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<IError>({
    isError: false,
    message: "",
  });
  const [sortBy, setSortBy] = useState<String>("");
  const [totalPages, setTotalPages] = useState<number>(0);
  const [showSeeMoreBtn, setShowSeeMoreBtn] = useState<boolean>(false);

  // if a country is selected, show the cities for only that particular country
  useEffect(() => {
    if (country.selectedCountry) {
      const countryIndex = cities.findIndex(
        (countryArr) => countryArr.country === country.selectedCountry
      );
      const cityIndex = cities[countryIndex].cities;
      const defaultCityVal = Object.values(cityIndex)[0];
      city.setSelectedCity(defaultCityVal);
    }
  }, [country.selectedCountry]);

  const fetchDataWithSearch: string = `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=${
    category === "concerts"
      ? "music"
      : category || (category === "arts & theatre" && "arts")
  }&${defaultGenreQuery}&dmaId=${city.selectedCity}&countryCode=${
    country.selectedCountry
  }&${
    searchText
      ? `page=${pageNumber}&keyword=${searchText}`
      : `page=${pageNumber}`
  }&apikey=${API_KEY}`;

  const fetchDataWithoutSearch: string = `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=${
    category === "concerts"
      ? "music"
      : category || (category === "arts & theatre" && "arts")
  }&${defaultGenreQuery}&dmaId=${city.selectedCity}&countryCode=${
    country.selectedCountry
  }&${
    searchText
      ? `page=${pageNumber}&keyword=${searchText}`
      : `page=${pageNumber}`
  }&apikey=${API_KEY}`;

  const fetchData = (): void => {
    setLoading(true);
    axios
      .get<IEvent[]>(
        `${searchText ? fetchDataWithSearch : fetchDataWithoutSearch}`
      )
      .then((res: AxiosResponse) => {
        // when selecting genres, some events return more than 20 pages. we only want to get 20 pages
        setTotalPages(
          res.data.page.totalPages < 20 ? res.data.page.totalPages : 20
        );

        // only check if there are concerts
        if (res.data._embedded.events) {
          const data = res.data._embedded.events.map((obj: IEventData) => {
            // return null for cancelled events
            if (obj.dates.status.code === "cancelled") {
              return null;
            }

            // gets the subGenre for an event
            const subGenre = obj.classifications[0].subGenre?.name;

            // gets genre for an event
            const genre = obj.classifications[0].genre.name;

            // genre array will have both subgenre and genre
            const genreArray: String[] = [];
            // checks if there is subgenre and only pushes subgenre if the subgenre is not the same as the genre to avoid duplication
            if (subGenre && subGenre !== genre) {
              genreArray.push(subGenre);
            }
            // attractions array return specific info of the artist, like name
            const attractionsArrLength = obj._embedded.attractions?.length || 0;

            // destructing dates object
            const { localDate, localTime, dateTime } = obj.dates.start;

            // destructuring timezone
            const { timezone } = obj.dates;

            // destructuring id and name from obj
            const { name, id, _embedded } = obj;

            // destructuring venues and attractions
            const { venues, attractions } = _embedded;

            // imageAPI returns duplicated images, we must remove duplicates and only get one of each ratio
            const imagesArr: IImage[] = [];
            const imageAPI: IImage[] = obj.images;
            const checkIfAdded = {
              "16_9": false,
            };
            imageAPI.forEach((image) => {
              if (image.ratio === "16_9" && checkIfAdded["16_9"] === false) {
                imagesArr.push(image);
                checkIfAdded["16_9"] = true;
              }
            });

            // create an event object to only get necessary data
            const event: IEvent = {
              eventId: id as string,
              // some events do not have attractions array
              artist: attractions ? attractions[0].name : "",
              images: imagesArr,
              // check to see if there are more than 1 array. if there is more than 1, that means there is a guest. the first array is the original artist
              eventName: name,
              date: localDate,
              startTime: localTime,
              dateTime: dateTime,
              timezone: timezone,
              country: venues[0].country.name,
              city: venues[0].city.name,
              venue: venues[0].name,
              genre: [...genreArray, obj.classifications[0].genre.name],
            };
            // only define guests property if there are guests, otherwise only return event object with no guests property
            const result =
              attractionsArrLength > 1
                ? { guests: attractions[1].name, ...event }
                : { ...event };
            return result;
          });

          // Filter out cancelled events (events that are null)
          const filteredData = data.filter((event: IEvent) => event !== null);

          if (pageNumber === 0) {
            // If pageNumber is 0, set tempEvents directly to events
            setEvents(filteredData);
          } else {
            // If pageNumber is greater than 0, concatenate tempEvents with events

            setEvents((prevEvents) => [...prevEvents, ...filteredData]);
            console.log(events, "events");
          }
        } else {
          console.log("no events");
        }

        setLoading(false);
      })
      .catch((error: AxiosError) => {
        setLoading(false);
        setError({
          isError: true,
          message: error.response ? "Server Error" : error.message,
        });
      });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleSearchClick = () => {
    console.log(searchText, "search text");

    fetchData();
  };

  // when event list page renders for the first time, selected genre is back to default or reset
  useEffect(() => {
    genre.setSelectedGenreId("Default");
    genre.setSelectedTitle("All");
  }, []);

  // call the api everytime genre is changed
  // clear the events data when new genre is selected so we don't mix pop data with blues/rock data
  useEffect(() => {
    if (genre.selectedGenreId) {
      const selectedId = genre.selectedGenreId;
      // typeof creates an interface for the Genres enum behind the scenes. keyof indicates that the selectedId is a key of Genres
      // get Genre Enum value by Genres['Value']
      genre.setSelectedTitle(
        currentCategoryEnum[selectedId as keyof typeof currentCategoryEnum]
      );
      setEvents([]);
    }
    fetchData();
    setEventsShown(5);
    setPageNumber(0);
  }, [
    genre.selectedGenreId,
    genre.selectedTitle,
    country.selectedCountry,
    city.selectedCity,
  ]);

  const handleSortByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  // Example of resetting state when navigating back to EventListPage
  useEffect(() => {
    fetchData();
  }, []);

  // if events length is less or equal to 5, do not show the see more button, otherwise, show it
  useEffect(() => {
    if (
      eventsShown >= 80 ||
      events.length <= 5 ||
      events.length < eventsShown
    ) {
      setShowSeeMoreBtn(false);
    } else {
      setShowSeeMoreBtn(true);
    }
  }, [eventsShown, events]);

  const seeMoreEvents = () => {
    if (events.length > eventsShown) {
      setEventsShown((prevState) => prevState + 5);
    } else {
      setPageNumber((prevState) => prevState + 1);
    }
  };

  // Make sure to increase events shown when page number increases and we get new data from api
  useEffect(() => {
    if (events.length > eventsShown && pageNumber > 0 && pageNumber <= 3) {
      setEventsShown((prevState) => prevState + 5);
    }
  }, [events, pageNumber]);

  useEffect(() => {
    if (pageNumber > 0 && pageNumber <= 3) {
      fetchData();
    }
  }, [pageNumber]);

  return (
    <>
      <div className="max-w-[1260px] mx-auto z-1 relative mb-6">
        <Navbar />
       
         <div className="text-white text-3xl md:text-4xl lg:text-6xl text-left font-bold px-4">
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
          <div className="px-4 my-4">
          <NavbarSearch
          handleSearchChange={handleSearchChange}
          handleSearchClick={handleSearchClick}
          searchText={searchText} />
          </div>

        <MainBody
          currentCategoryEnum={currentCategoryEnum}
          eventsShown={eventsShown}
        />

        {showSeeMoreBtn ? (
          <div className="px-4">
            <button
              onClick={seeMoreEvents}
              className=" bg-lavender hover:bg-indigo-800 p-2 text-sm md:text-md md:px-4 md:py-2 text-white rounded-lg"
            >
              See More
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default EventListPage;
