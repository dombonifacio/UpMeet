import MainInfo from "../components/EventInfoPage/MainInfo";
import { Navbar } from "../components/Navbar/Navbar";

const EventInfoPage = () => {
  return (
    <>
      <div className="flex flex-col mx-auto max-w-[1260px] h-screen">
        <div className="">

        <Navbar />
        </div>
        <MainInfo />
      </div>
    </>
  );
};

export default EventInfoPage;
