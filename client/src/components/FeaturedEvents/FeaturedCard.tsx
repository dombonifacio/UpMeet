import { Months } from "../../utils/constants/Dates";

interface FeaturedCardProps {
  artist: String;
  city: String;
  country: String;
  date: Date;
  isFocused: boolean;
}

const FeaturedCard = ({
  artist,
  city,
  country,
  date,
  isFocused,
}: FeaturedCardProps) => {
  const dateFormat = date.toString();
  const dateSelect = dateFormat.substring(5, 7);
  const daySelected = dateFormat.substring(8, 10);

  const getKeyByValue = (object: any, value: any) => {
    return Object.keys(object).find((key) => object[key] === value);
  };

  const getFormattedMonth = getKeyByValue(Months, dateSelect);
  return (
    <div
      className={`flex w-full items-center  px-4 ${
        isFocused ? `bg-borderInput` : `bg-input`
      }`}
    >
      {isFocused ? <div className="bg-pink-500 h-[75%] w-1"></div> : ""}

      <div className=" px-2">
        <p className="text-xs md:text-sm text-slate-300 text-center">
          {daySelected}
        </p>
        <p className="font-bold ">{getFormattedMonth}</p>
      </div>

      <div className="pl-[6px]  w-full">
        <div>
          <p className="font-bold text-md">{artist}</p>
          <p className="text-slate-300 text-sm">
            {city}, {country}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCard;
