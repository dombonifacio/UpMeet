import { FilterContext } from "../../context/FilterContext";
import { countries } from "../../utils/constants/Countries";

import { useContext } from "react";

import { cities } from "../../utils/constants/Cities.ts";
import {
  ArtsGenre,
  FamilyGenre,
  MusicGenre,
  SportsGenre,
} from "../../utils/constants/Genres.ts";

interface FilterComponentProps {
  handleFilterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  currentCategoryEnum:
    | typeof MusicGenre
    | typeof SportsGenre
    | typeof ArtsGenre
    | typeof FamilyGenre;
}

export const FilterComponent = ({
  handleFilterChange,
  currentCategoryEnum,
}: FilterComponentProps) => {
  const { country } = useContext(FilterContext);

  return (
    <>
      <div className=" flex flex-wrap items-center gap-x-2 gap-y-3">
        <select
          name="genre"
          className="bg-lavender hover:bg-indigo-800 p-2 text-sm md:text-md md:px-4 md:py-2 text-white rounded-lg"
          onChange={handleFilterChange}
        >
          {Object.entries(currentCategoryEnum).map(([id, title]) => (
            <option key={id} value={id} className="text-sm font-bold">
              {title}
            </option>
          ))}
        </select>
        <select
          name="country"
          onChange={handleFilterChange}
          className="bg-lavender hover:bg-indigo-800 p-2 text-sm md:text-md md:px-4 md:py-2 text-white rounded-lg"
          defaultValue={country.selectedCountry}
        >
          {countries.map((country) => (
            <option value={country.abbreviation} className="text-white">
              {country.country}
            </option>
          ))}
        </select>
        <select
          name="city"
          onChange={handleFilterChange}
          className="bg-lavender hover:bg-indigo-800 p-2 text-sm md:text-md md:px-4 md:py-2 text-white rounded-lg"
        >
          {cities.map((countryName) => {
            if (countryName.country === country.selectedCountry) {
              return Object.entries(countryName.cities).map(
                ([cityName, cityId]) => (
                  <option key={cityId} value={cityId} className="text-white">
                    {cityName}
                  </option>
                )
              );
            }
            return null;
          })}
        </select>
      </div>
    </>
  );
};
