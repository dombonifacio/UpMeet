import { FaBookmark } from "react-icons/fa";
import { IImage } from "../../interfaces/Event";
import { Link } from "react-router-dom";

export const Months = {
  January: "01",
  February: "02",
  March: "03",
  April: "04",
  May: "05",
  June: "06",
  July: "07",
  August: "08",
  September: "09",
  October: "10",
  November: "11",
  December: "12",
};

interface EventsCardProps {
  eventId: string;
  artist: string;
  city: string;
  country: string;
  date: Date;
  eventName: string;
  genre: string[];
  guests: string[];
  venue: string;
  images: string; // Change this to string
  timezone: string;
  startTime: string;
  unsaveEvent: () => void;
}

export const EventsCard: React.FC<EventsCardProps> = ({
  eventId,
  city,
  artist,
  country,
  date,
  eventName,
  genre,
  guests,
  venue,
  images,
  timezone,
  startTime,
  unsaveEvent,
}) => {
  const dateFormat = date.toString();
  const dateSelect = dateFormat.substring(5, 7);
  const daySelected = dateFormat.substring(8, 10);
  const yearSelected = dateFormat.substring(0, 4);
  const getKeyByValue = (object: any, value: any) => {
    return Object.keys(object).find((key) => object[key] === value);
  };

  const getFormattedMonth = getKeyByValue(Months, dateSelect);

  return (
    <div className="flex flex-col rounded-lg overflow-hidden h-full">
      <div className="relative flex items-center justify-center bg-black">
        <button
          onClick={unsaveEvent}
          className="absolute top-0 left-0 p-2 bg-lavender z-10 "
        >
          <FaBookmark size={"1.4rem"} />
        </button>
        <div className="z-10 flex flex-col absolute text-center">
          <p className=" text-lightText font-bold  text-4xl md:text-2xl">
            {daySelected}
          </p>
          <p className=" text-lightText font-bold  text-2xl md:text-2xl">
            {" "}
            {getFormattedMonth}
          </p>
          <p className="text-lightText font-bold  text-xl md:text-xl">
            {yearSelected}
          </p>
        </div>

        <img
          src={images}
          className="object-cover opacity-70 min-h-[200px] h-full  w-full"
        />
      </div>
      <div className="bg-input p-3 pb-4 flex flex-col gap-x-2 items-center h-full w-full ">
        <div className="flex flex-wrap gap-x-2 items-center w-full">
          <p className="text-indigo-300 text-sm md:truncate lg:truncate-none font-bold line-clamp-1 truncate">
            {artist ? artist : eventName}
          </p>
          <p className="text-indigo-300 text-sm">{startTime}</p>
          <div className="h-1 w-1 bg-indigo-400 rounded-full"></div>
          <p className="text-indigo-300 text-sm ">
            {country === "United States Of America" ? "US" : country}
          </p>
          <div className="h-1 w-1 bg-indigo-400 rounded-full"></div>
          <p className="text-indigo-300 text-sm">{city}</p>
          <div className="h-1 w-1 bg-indigo-400 rounded-full"></div>
          {genre.map((genre) => (
            <p className="text-indigo-300 text-sm">{genre}</p>
          ))}
        </div>

        <div className="w-full h-full  flex items-end">
          <div className="block mt-6 mb-2 md:hidden ">
            <Link
              className="bg-lavender hover:bg-indigo-800 hover:text-white p-2 text-sm md:text-md md:px-3 md:py-2 text-white rounded-lg"
              to={`/event_info/${eventId}`}
            >
              See Event
            </Link>
          </div>
          <div className="hidden pb-10 md:pb-0 md:flex md:mt-8 md:mb-1 md:grow">
            <Link
              className="bg-lavender hover:bg-indigo-800 p-2 hover:text-white text-sm md:text-md md:px-3 md:py-2 text-white rounded-lg"
              to={`/event_info/${eventId}`}
            >
              See Event
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
