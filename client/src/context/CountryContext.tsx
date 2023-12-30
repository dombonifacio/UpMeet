import React, { createContext, useState } from "react";

interface CountryProviderProps {
  children: React.ReactNode;
}

interface CountryType {
  selectedCountry: string;
  setSelectedCountry?: React.Dispatch<React.SetStateAction<string>>;
}

const defaultCountry = {
  selectedCountry: "CA",
};

export const Country = createContext<CountryType>(defaultCountry);

export const CountryProvider = ({ children }: CountryProviderProps) => {
  const [selectedCountry, setSelectedCountry] = useState<string>(
    defaultCountry.selectedCountry
  );

  return (
    // Country.Provider value expects a string or null because you initialized the Country with string | null, not an object.
    <Country.Provider value={{ selectedCountry, setSelectedCountry }}>
      {children}
    </Country.Provider>
  );
};
