import React, { useContext, useEffect } from "react";
import { ICategory } from "../../interfaces/Category";

// images
import artsCategory from "../../assets/artsCategory.png";
import familyCategory from "../../assets/familyCategory.png";
import sportsCategory from "../../assets/sportsCategory.jpg";
import concertCategory from "../../assets/concertCategory.jpg";
import Button from "../Buttons/ButtonCard";
import ButtonCard from "../Buttons/ButtonCard";
import { Link, useNavigate } from "react-router-dom";
import { FilterContext } from "../../context/FilterContext";

type CategoryProps = {
  categoryCard: ICategory;
};

const CategoryCard = ({ categoryCard }: CategoryProps) => {
  // make an array and make the type be Category type. intialize all the necessary data

  const { country, category } = useContext(FilterContext);
  // initialize a different url parameter for arts so it does not show up as "Arts & Theatre"
  const categoryArts: string = "arts";

  useEffect(() => {
    category.setSelectedCategory(categoryCard.name);
  }, []);

  const navigate = useNavigate();
  const handleCategoryNavigate = () => {
    navigate(
      `/${
        categoryCard.name === "Arts & Theatre"
          ? categoryArts
          : categoryCard.name.toLowerCase()
      }`
    );
  };

  return (
    <div className="relative rounded-2xl">
      <div className="absolute h-full flex flex-col justify-between p-4 bg-black/70 w-full rounded-2xl">
        <div>
          <p className="font-bold text-cardText text-xl sm:text-2xl">
            {categoryCard?.name}
          </p>
          <p className="text-xs md:text-sm text-white">{categoryCard?.desc}</p>
        </div>
        <button
          onClick={handleCategoryNavigate}
          className="bg-lavender p-2 px-3 text-xs md:text-sm md:p-2 md:px-4 rounded-md hover:bg-indigo-800 duration-75 font-bold inline-block w-[45%]"
        >
          See More
        </button>
      </div>
      <img
        src={categoryCard?.image}
        className="object-cover h-36 md:h-52 w-full rounded-2xl"
      />
    </div>
  );
};

export default CategoryCard;
