
import AttendeesContainer from "../components/Attendees/AttendeesContainer";

export default function AttendeesPage() {
  // useEffect(() => {
  //   getEventAttendees()
  // }, [])

  return (
    <>
    
     
      <div className="mx-auto flex justify-center md:block max-w-[1260px] w-screen sm:p-4 md:w-screen">
        <AttendeesContainer />
      </div>
    </>
  );
}
