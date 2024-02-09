import React from "react";
import { ICategory } from "../../interfaces/Category";

// images
import artsCategory from "../../assets/artsCategory.png";
import familyCategory from "../../assets/familyCategory.png";
import sportsCategory from "../../assets/sportsCategory.jpg";
import concertCategory from "../../assets/concertCategory.jpg";
import Button from "../Buttons/ButtonCard";
import ButtonCard from "../Buttons/ButtonCard";

const CategoryCard = () => {
  // make an array and make the type be Category type. intialize all the necessary data
  const categoryList: ICategory[] = [
    {
      name: "Concerts",
      image: artsCategory,
      desc: "Catch your favorite artists live and get to meet new people!",
    },
    {
      name: "Arts & Theatre",
      image: familyCategory,
      desc: "Enjoy art and theater events, connect with fellow enthusiasts",
    },
    {
      name: "Sports",
      image: sportsCategory,
      desc: "Get to see NBA, NHL, NFL, and more with friends!",
    },
    {
      name: "Family",
      image: concertCategory,
      desc: "Discover family fun with events like Disney on Ice and more!",
    },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6 gap-x-5 ">
      {categoryList.map((category: ICategory) => (
        <div className="relative rounded-2xl">
          <div className="absolute h-full flex flex-col justify-between p-4 bg-black/70 w-full rounded-2xl">
            <div>
              <p className="font-bold text-cardText text-xl sm:text-2xl">
                {category.name}
              </p>
              <p className="text-xs md:text-sm text-iwhite">
                {category.desc}
              </p>
            </div>
            <ButtonCard text="See More" />
          </div>
          <img
            src={category.image}
            className="object-cover h-36 md:h-52 w-full rounded-2xl"
          />
        </div>
      ))}
    </div>
  );
};

export default CategoryCard;
