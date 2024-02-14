import React from "react";
import { IEvent } from "../../interfaces/Event";
import { Months } from "../../utils/constants/Dates";

interface FeaturedCardProps {
  artist: String;
  city: String;
  country: String;
  date: Date;
}

const FeaturedCard = ({ artist, city, country, date }: FeaturedCardProps) => {
  const dateFormat = date.toString();
  const dateSelect = dateFormat.substring(5, 7);
  const daySelected = dateFormat.substring(8, 10);

  const getKeyByValue = (object: any, value: any) => {
    return Object.keys(object).find((key) => object[key] === value);
  };

  const getFormattedMonth = getKeyByValue(Months, dateSelect);
  return (
    <div>
      <div className="bg-borderInput p-2 pr-[4px] flex items-center">
        <div className="bg-blue-500 h-[80%] w-1"></div>
        {/* Dates */}
        <div className=" px-2">
          <p className="text-xs md:text-sm text-slate-300 text-center">
            {daySelected}
          </p>
          <p className="font-bold ">{getFormattedMonth}</p>
        </div>
        {/* Artist and location */}
        <div className="pl-[6px]  w-full">
          <div>
            <p className="font-bold text-md">{artist}</p>
            <p className="text-slate-300 text-sm">
              {city}, {country}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-input p-2 flex items-center px-4">
        <div className="bg-pink-500 h-[80%] w-1"></div>
      </div>
      <div className="bg-input p-2 flex items-center px-4">
        {" "}
        <div className="bg-purple-500 h-[80%] w-1"></div>
      </div>
      <div className="bg-input p-2 flex items-center px-4">
        {" "}
        <div className="bg-green-500 h-[80%] w-1"></div>
      </div>
    </div>
  );
};

export default FeaturedCard;
