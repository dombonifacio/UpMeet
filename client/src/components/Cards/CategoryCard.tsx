import { ICategory } from "../../interfaces/Category";

// images

import { useNavigate } from "react-router-dom";

type CategoryProps = {
  categoryCard: ICategory;
};

const CategoryCard = ({ categoryCard }: CategoryProps) => {
  // make an array and make the type be Category type. intialize all the necessary data

  // initialize a different url parameter for arts so it does not show up as "Arts & Theatre"
  const categoryArts: string = "arts";

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
      <div className="absolute h-full flex flex-col justify-between p-4 bg-black/70 w-full rounded-2xl ">
        <div>
          <p className="font-bold text-cardText text-xl sm:text-2xl">
            {categoryCard?.name}
          </p>
          <p className="text-xs md:text-sm text-white">{categoryCard?.desc}</p>
        </div>
        <button
          onClick={handleCategoryNavigate}
          className="bg-lavender p-2 text-xs md:text-sm  rounded-md hover:bg-indigo-800 duration-75 font-bold inline-block max-w-[100px] md:min-w-[110px]"
        >
          See More
        </button>
      </div>
      <img
        src={categoryCard?.image}
        className="object-cover h-48 md:h-52 w-full rounded-2xl"
      />
    </div>
  );
};

export default CategoryCard;
