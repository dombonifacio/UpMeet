import { GiFlexibleStar } from "react-icons/gi";
export const Logo = () => {
  return (
    <>
      <div className="flex items-center">
        <GiFlexibleStar className="text-white text-3xl md:text-4xl lg:text-4xl xl:text-5xl" />

        <div className="flex-col items-center">
          <h1 className="font-extrabold text-xl md:text-2xl lg:text-3xl">
            UpMeet
          </h1>
        </div>
      </div>
    </>
  );
};
