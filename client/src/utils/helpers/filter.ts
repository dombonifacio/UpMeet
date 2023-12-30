// react router
import { useParams } from "react-router-dom";

// hooks
import { useContext } from "react";

// contexts
import { FilterContext } from "../../context/FilterContext";

// enums
import {
  MusicGenre,
  SportsGenre,
  ArtsGenre,
  FamilyGenre,
} from "../constants/Genres";

export const getCategoryEnum = () => {
  const { category } = useParams();

  if (category === "concerts") {
    return MusicGenre;
  } else if (category === "sports") {
    return SportsGenre;
  } else if (category === "arts") {
    return ArtsGenre;
  } else return FamilyGenre;
};


export const checkIfGenreDefault = (): string => {
  // if genre.selectedGenreId is "Default", then delete the classificationId query
  // else if there is selectedGenreId that is not default, then classificationId=${genre.selectedGenreId}&
  const { genre } = useContext(FilterContext);

  if (genre.selectedGenreId === "Default") {
    return "";
  } else {
    return `classificationId=${genre.selectedGenreId}&`;
  }
};



