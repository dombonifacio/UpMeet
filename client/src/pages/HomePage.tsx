import Header from "../components/Header";
import logo from "../components/logo.png";
import header from "../assets/header.png";

// react hooks
import { useState, useEffect, useContext, useRef } from "react";

// third-party libraries
import axios, { AxiosError, AxiosResponse } from "axios";

// interfaces
import { Event, IEvent, IEventData, IImage } from "../interfaces/Event";
import { ICategory } from "../interfaces/Category.ts";
import { CategoryContainerComponent } from "../components/CategoryContainerComponent";
// interfaces
import { IError } from "../interfaces/Message.ts";

// contexts
import { FilterContext } from "../context/FilterContext.tsx";
import { Link, useNavigate } from "react-router-dom";

// icons
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
// countries utils
import { countries } from "../utils/constants/Countries.ts";
import { CategoryCardComponent } from "../components/CategoryCardComponent.tsx";
import { UserContext } from "../context/UserContext.tsx";
import { Navbar } from "../components/Navbar/Navbar.tsx";
import { Logo } from "../components/Logo/Logo.tsx";
import Title from "../components/Texts/Title.tsx";
import CategoryCard from "../components/Cards/CategoryCard.tsx";
import ButtonCard from "../components/Buttons/ButtonCard.tsx";
import FeaturedCard from "../components/FeaturedEvents/FeaturedCard.tsx";
import FooterComponent from "../components/Footer/FooterComponent.tsx";

// images

import artsCategory from "../assets/artsCategory.png";
import familyCategory from "../assets/familyCategory.png";
import sportsCategory from "../assets/sportsCategory.jpg";
import concertCategory from "../assets/concertCategory.jpg";
import { EventsContext } from "../context/EventsContext.tsx";

export const HomePage: React.FC = () => {
  const API_KEY = "YG3ugvNGItpEUSyLn8m4eb4I8mlUzVXK";
  const [eventCount, setEventCount] = useState<number>(0);
  const navigate = useNavigate();
  const { country } = useContext(FilterContext);
  const [error, setError] = useState<IError>({
    isError: false,
    message: "",
  });

  const [eventList, setEventList] = useState<IEvent[]>([] as IEvent[]);
  const { setEvents } = useContext(EventsContext);

  console.log(country, "country");
  const query: string = `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&countryCode=${country.selectedCountry}&page=0&size=4&apikey=${API_KEY}`;

  const fetchData = (): void => {
    axios
      .get<IEvent[]>(query)
      .then((res: AxiosResponse) => {
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
              artist: attractions ? attractions[0].name : name,
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
          console.log(data, "data");
          setEventList(data);
          setEvents(data);
        } else {
          console.log("No events found");
          return [];
        }
      })
      .catch((error: AxiosError) => {
        setError({
          isError: true,
          message: error.response ? "Server Error" : error.message,
        });
      });
  };

  const handleForward = () => {
    if (eventCount === 3) return setEventCount(0);
    setEventCount((prevState) => prevState + 1);
  };
  const handleBackward = () => {
    if (eventCount === 0) return setEventCount(eventList.length - 1);
    setEventCount((prevState) => prevState - 1);
  };
  const categoryList: ICategory[] = [
    {
      name: "Concerts",
      image: artsCategory,
      desc: "Catch your favorite artists live and get to meet new people!",
    },
    {
      name: "Arts & Theatre",
      image: familyCategory,
      desc: "Enjoy art and theater events, connect with fellow enthusiasts",
    },
    {
      name: "Sports",
      image: sportsCategory,
      desc: "Get to see NBA, NHL, NFL, and more with friends!",
    },
    {
      name: "Family",
      image: concertCategory,
      desc: "Discover family fun with events like Disney on Ice and more!",
    },
  ];

  const categoriesRef = useRef(null);

  const scrollToCategories = () => {
    categoriesRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const { user } = useContext(UserContext);
  useEffect(() => {
    console.log(user, 'user data')
    fetchData();
  }, []);

  return (
    <>
      <div className="w-full min-h-screen min-w-screen">
        <header className="relative">
          <div className="absolute bg-gradient-to-t from-vader w-full h-full bg-black/30">
            <div className="max-w-[1260px] mx-auto">
              <Navbar />
            </div>
            <div className="title">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-wihte font-bold">
                JAMCON
              </h1>
              <p className="text-sm text-slate-300 lg:text-lg xl:text-xl">
                Discover new friendships through the power of shared
                experiences, connecting people beyond events
              </p>

              <button
                className="bg-lavender p-3 text-sm my-6 rounded-md hover:bg-indigo-800 duration-75 font-medium"
                onClick={scrollToCategories}
              >
                Browse Categories
              </button>
            </div>
          </div>
          <img src={header} className="w-full h-screen object-cover" />
        </header>
        <div className="max-w-[1260px] mx-auto py-4 px-6 my-4">
          <section id="categories" ref={categoriesRef}>
            <div className="">
              <p className="font-bold text-lg md:text-xl ">Explore each</p>

              <Title text="Categories" />

              <p className="my-6">
                Discover a variety of available events, each offering a unique
                experience for unforgettable moments. Find your perfect match
                among a diverse selection of sports, concerts, family outings,
                and theatrical performances.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6 gap-x-5 ">
              {categoryList.map((category: ICategory) => (
                <CategoryCard categoryCard={category} />
              ))}
            </div>
          </section>

          <section id="featured">
            <div className="mt-16">
              <Title text="FEATURED MUSIC EVENTS" />
              <div className="grid md:grid-cols-3 gap-x-6 mt-4 lg:mt-8 ">
                <div className=" md:col-span-2 relative">
                  <div className="absolute bg-black/50 h-full w-full flex justify-between p-4 items-center">
                    <div className=" w-full flex gap-x-4 sm:w-[75%] md:w-[65%] h-full items-center">
                      <button onClick={handleBackward} className=" ">
                        <FaArrowCircleLeft className="text-white text-3xl md:text-4xl" />
                      </button>
                      <div>
                        <div className="flex flex-col my-2">
                          <p className="font-bold text-xs md:text-sm">
                            {eventList[eventCount]?.date}
                          </p>
                          <div className="h-1 bg-lavender w-[15%]"></div>
                        </div>

                        <h1 className="text-white font-bold text-3xl sm:text-4xl">
                          {eventList[eventCount]?.artist}
                        </h1>
                        <p className="text-sm md:text-md mb-4">
                          Get ready to join the excitement as you and your
                          friends prepare to experience{" "}
                          {eventList[eventCount]?.artist} together!{" "}
                          {eventList[eventCount]?.guests && (
                            <span>
                              {" Keep an eye out for "}
                              <span className="font-bold text-indigo-200">
                                {eventList[eventCount]?.guests}
                              </span>
                              {" as a guest!"}
                            </span>
                          )}
                        </p>
                        <Link
                          to={`event_info/${eventList[eventCount]?.eventId}`}
                          className="bg-lavender text-white hover:text-white p-2 px-3 text-xs md:text-sm md:p-2 md:px-5 rounded-md hover:bg-indigo-800 duration-75 font-bold "
                        >
                          See Event
                        </Link>
                      </div>
                    </div>

                    <button onClick={handleForward} className="">
                      <FaArrowCircleRight className="text-white text-3xl md:text-4xl" />
                    </button>
                  </div>
                  <img
                    src={eventList[eventCount]?.images[0].url}
                    className="max-h-[450px] w-full object-cover"
                  />
                </div>
                <div className=" grid grid-rows-4 gap-y-4 h-72 mt-8 md:mt-0">
                  {eventList.map((event: IEvent, index: number) => (
                    <FeaturedCard
                      artist={event.artist}
                      city={event.city}
                      country={event.country}
                      date={event.date}
                      isFocused={index === eventCount ? true : false}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
        <FooterComponent />
      </div>
    </>
  );
};
