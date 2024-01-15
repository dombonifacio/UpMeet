import { GiFlexibleStar } from "react-icons/gi";
export const Logo = () => {
  return (
    <>
      <div className="flex items-center">
        <GiFlexibleStar size={"1.7rem"} color="white" />
        <div className="flex-col items-center">
          <h1 className="font-extrabold text-xl">JAMCON</h1>
        </div>
      </div>
    </>
  );
};
