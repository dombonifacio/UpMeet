// react hooks
import { useContext, useEffect, useState } from "react";

// contexts
import { FilterContext } from "../context/FilterContext";

// react router
import { Link, useParams } from "react-router-dom";

// axios
import axios, { AxiosError, AxiosResponse } from "axios";

// import Header from "../components/EventList/Header";
import Header from "../components/Header";

// interfaces
import { IError } from "../interfaces/Error.ts";
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

const EventListPage = () => {
  const { genre, country, city } = useContext(FilterContext);
  const { events, setEvents } = useContext(EventsContext);
  const { category } = useParams();
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [eventsShown, setEventsShown] = useState<number>(5);
  const [searchText, setSearchText] = useState<string>("");

  // store data here

  const API_KEY = "Kfu5vWnk9nBkFUrEVAEgRg5xt3nkllAG";

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
      console.log("useeffect of changing defaultcity val is triggered.");
    }
  }, [country.selectedCountry]);

  useEffect(() => {
    console.log("country is: ", country.selectedCountry);
  }, [country.selectedCountry]);

  useEffect(() => {
    console.log("selected city is ", city.selectedCity);
  }, [city.selectedCity]);

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
    console.log("fetchData function called");
    console.log('genre and genre id', genre.selectedTitle, genre.selectedGenreId)
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
            const { timezone } = obj.dates

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
              id: id,
              // some events do not have attractions array
              artist: attractions ? attractions[0].name : "",

              images: imagesArr,
              // check to see if there are more than 1 array. if there is more than 1, that means there is a guest. the first array is the original artist
              guests: attractionsArrLength > 1 ? attractions[1].name : [],
              eventName: name,
              date: localDate,
              time: localTime,
              dateTime: dateTime,
              timezone: timezone,
              country: venues[0].country.name,
              city: venues[0].city.name,
              venue: venues[0].name,
              genre: [...genreArray, obj.classifications[0].genre.name],
            };
            return event;
          });

          if (pageNumber === 0) {
            // If pageNumber is 0, set tempEvents directly to events
            setEvents(data);
          } else {
            // If pageNumber is greater than 0, concatenate tempEvents with events

            setEvents((prevEvents) => [...prevEvents, ...data]);
          }
          console.log(
            data,
            "API CONSOLE LOGGING FROM DATA VARIABLE NOT FROM ANY LOCAL VARIABLES"
          );
        } else {
          console.log("no events found in this area.");
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
      console.log("useEffect triggered events shown", eventsShown);
    }
  }, [events, pageNumber]);

  useEffect(() => {
    if (pageNumber > 0 && pageNumber <= 3) {
      fetchData();
    }
  }, [pageNumber]);

  useEffect(() => {
    if (events.length > 0) {
      console.log("events original showing ", events);
    }
  }, [events]);

  return (
    <>
           <Header/>

      <div className="max-w-[1260px] mx-auto z-1 relative p-6">
        <NavbarSearch
          handleSearchChange={handleSearchChange}
          handleSearchClick={handleSearchClick}
          searchText={searchText}
        />

   
        <select name="sort" onChange={handleSortByChange}>
          <option>Sort By</option>
          <option value="nameAscending">Name (Ascending)</option>
          <option value="nameDescending">Name (Descending)</option>
          <option value="dateAscending">Date (Ascending)</option>
          <option value="dateDescending">Date (Descending)</option>
        </select>
        <MainBody
          currentCategoryEnum={currentCategoryEnum}
          eventsShown={eventsShown}
        />

        {showSeeMoreBtn ? (
          <button
            onClick={seeMoreEvents}
            className="bg-lavender hover:bg-indigo-800 p-2 text-sm md:text-md md:px-3 md:py-2 text-white rounded-lg"
          >
            See More
          </button>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default EventListPage;
