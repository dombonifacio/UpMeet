import { createContext, useState } from "react";

export type FilterContextType = {
  country: {
    selectedCountry: string;
    setSelectedCountry?: React.Dispatch<React.SetStateAction<string>>;
  };
  city: {
    selectedCity: string;
    setSelectedCity?: React.Dispatch<React.SetStateAction<string>>;
  };
  genre: {
    selectedTitle: string;
    setSelectedTitle?: React.Dispatch<React.SetStateAction<string>>;
    selectedGenreId?: string;
    setSelectedGenreId?: React.Dispatch<React.SetStateAction<string>>;
  };
  category: {
    selectedCategory: string;
    setSelectedCategory?: React.Dispatch<React.SetStateAction<string>>;
  };
};

type FilterContextProviderProps = {
  children: React.ReactNode;
};

const defaultCountry = { selectedCountry: "CA" };
const defaultGenre = { selectedTitle: "All", selectedGenreId: "Default" };
const defaultCategory = { selectedCategory: "" };
const defaultCity = { selectedCity: "500" };

export const FilterContext = createContext<FilterContextType>({
  country: defaultCountry,
  city: defaultCity,
  genre: defaultGenre,
  category: defaultCategory,
});

export const FilterContextProvider = ({
  children,
}: FilterContextProviderProps) => {
  const [selectedCountry, setSelectedCountry] = useState<string>(
    defaultCountry.selectedCountry
  );
  const [selectedGenreId, setSelectedGenreId] = useState<string>(
    defaultGenre.selectedGenreId
  );
  const [selectedTitle, setSelectedTitle] = useState<string>(
    defaultGenre.selectedTitle
  );
  const [selectedCategory, setSelectedCategory] = useState<string>(
    defaultCategory.selectedCategory
  );
  const [selectedCity, setSelectedCity] = useState<string>(
    defaultCity.selectedCity
  );

  return (
    <FilterContext.Provider
      value={{
        country: { selectedCountry, setSelectedCountry },
        genre: {
          selectedTitle,
          setSelectedTitle,
          selectedGenreId,
          setSelectedGenreId,
        },
        category: { selectedCategory, setSelectedCategory },
        city: { selectedCity, setSelectedCity },
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
