import { useContext } from "react";
import { EventsContext } from "../../context/EventsContext";

import { Months } from "../../utils/constants/Dates.ts";

interface EventPicDateProps {
  date: Date;
  image: string;
}

const EventPicDate = ({ image, date }: EventPicDateProps) => {
  const dateFormat = date.toString();
  const dateSelect = dateFormat.substring(5, 7);
  const daySelected = dateFormat.substring(8, 10);
  const yearSelected = dateFormat.substring(0, 4);

  const getKeyByValue = (object: any, value: any) => {
    return Object.keys(object).find((key) => object[key] === value);
  };

  const getFormattedMonth = getKeyByValue(Months, dateSelect);

  return (
    <>
      {/* <div className="absolute">hi</div> */}
      <div className="relative w-full h-48 sm:h-36 sm:min-w-[112px] sm:max-w-[112px]">
        <img
          src={image}
          className="h-full w-full object-cover object-center rounded-lg"
          alt="Event"
        />

        {/* Image */}
        <div className="absolute inset-0 bg-black p-4 bg-opacity-50 flex items-center justify-center text-white rounded-lg ">
          <div className="flex flex-col">
            <p className="text-lightText font-bold  text-xl md:text-2xl text-center">
              {daySelected}
            </p>
            <p className="text-lightText  text-xl sm:text-2xl lg:text-3xl text-center">
              {getFormattedMonth}
            </p>
            <p className="text-lightText font-bold  text-xl md:text-xl">
              {yearSelected}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventPicDate;
