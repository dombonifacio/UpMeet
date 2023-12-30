import { FilterContext } from "../../context/FilterContext";
import { countries } from "../../utils/constants/Countries";

import { useContext } from "react";

// helper functions
import {
  getCategoryEnum,
  checkIfGenreDefault,
} from "../../utils/helpers/filter.ts";

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
      <div className=" flex flex-wrap items-center gap-x-2 gap-y-3 ">
        <select
          name="genre"
          className="text-sm font-bold h-10 p-2  text-white bg-lavender hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-center inline-flex items-center dark:bg-violet-950 dark:hover:bg-violet-850 dark:focus:ring-violet-800"
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
          className="text-sm font-bold h-10 p-2 text-white bg-lavender hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-center inline-flex items-center dark:bg-violet-950 dark:hover:bg-violet-850 dark:focus:ring-violet-800"
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
          className="text-sm font-bold h-10 p-2 text-white bg-lavender hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-center inline-flex items-center dark:bg-violet-950 dark:hover:bg-violet-850 dark:focus:ring-violet-800"
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
