// images
import artsCategory from "../assets/artsCategory.png";
import concertCategory from "../assets/concertCategory.jpg";
import familyCategory from "../assets/familyCategory.png";
import sportsCategory from "../assets/sportsCategory.jpg";
import { CategoryCardComponent } from "./CategoryCardComponent";

// interfaces
import { ICategory } from "../interfaces/Category";
export const CategoryContainerComponent = () => {
  // make an array and make the type be Category type. intialize all the necessary data
  const categoryList: ICategory[] = [
    {
      name: "Concerts",
      image: concertCategory,
    },
    {
      name: "Arts & Theatre",
      image: artsCategory,
    },
    {
      name: "Sports",
      image: sportsCategory,
    },
    {
      name: "Family",
      image: familyCategory,
    },
  ];

  return (
    <>
      <div className="grid grid-cols-4">
        {categoryList.map((category, index) => {
          return <CategoryCardComponent categoryCard={category} key={index} />;
        })}
      </div>
    </>
  );
};
