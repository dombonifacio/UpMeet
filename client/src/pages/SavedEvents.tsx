import Header from "../components/Header";
import { EventsContainer } from "../components/SavedEvents/EventsContainer";

export const SavedEvents = () => {
  return (
    <>
    <Header />
      <div className="mx-auto flex justify-center md:block max-w-[1260px] w-screen sm:p-4 md:w-screen">
        <EventsContainer />
      </div>
    </>
  );
};
