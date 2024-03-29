import { Navbar } from "../components/Navbar/Navbar";
import { EventsContainer } from "../components/SavedEvents/EventsContainer";

export const SavedEvents = () => {
  return (
    <>
      <div className="max-w-[1260px] mx-auto">
        <Navbar />
      </div>

      <div className="mx-auto flex justify-center md:block max-w-[1260px] w-screen  md:w-screen sm:px-4">
        <EventsContainer />
      </div>
    </>
  );
};
