import AttendeesContainer from "../components/Attendees/AttendeesContainer";
import { Navbar } from "../components/Navbar/Navbar";

export default function AttendeesPage() {
  return (
    <>
      <div className="max-w-[1260px] mx-auto">
        <Navbar />
      </div>

      <div className="mx-auto flex justify-center md:block max-w-[1260px] w-screen  md:w-screen ">
        <AttendeesContainer />
      </div>
    </>
  );
}
