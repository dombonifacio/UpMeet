import AttendeesContainer from "../components/Attendees/AttendeesContainer";
import { Navbar } from "../components/Navbar/Navbar";

export default function AttendeesPage() {
  // useEffect(() => {
  //   getEventAttendees()
  // }, [])

  return (
    <>
    
      <div className="mx-auto flex justify-center md:block max-w-[1260px] w-screen sm:p-4 md:w-screen">
        <Navbar />
        <AttendeesContainer />
      </div>
    </>
  );
}
