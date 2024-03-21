// interfaces
import { FC } from "react";
import { ICategory } from "../interfaces/Category";

// third-party libraries
import { useNavigate } from "react-router-dom";

type CategoryProps = {
  categoryCard: ICategory;
};

export const CategoryCardComponent: FC<CategoryProps> = ({ categoryCard }) => {
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
    <>
      {/* Render the category data */}
      <div className="relative overflow-hidden bg-cover bg-no-repeat ">
        <button className="h-full" onClick={handleCategoryNavigate}>
          <img
            src={categoryCard.image}
            alt={categoryCard.name}
            className="h-full w-fit"
          ></img>

          <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-black bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-50 text-purple-900">
            {" "}
            <p className="text-white text-center mt-[120px] text-[30px]">
              {" "}
              {categoryCard.name}
            </p>
          </div>
        </button>
      </div>
    </>
  );
};
