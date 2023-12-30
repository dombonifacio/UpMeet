
import MainInfo from "../components/EventInfoPage/MainInfo";
import Header from "../components/Header";


const EventInfoPage = () => {
  return (
    <>
      <Header />
      <div className="mx-auto max-w-[1260px] flex justify-center md:h-screen md:w-screen md:items-center">
      
        {/* 
        <MainPhoto image={selectedEvent?.images[0]?.url} artistName={selectedEvent?.artist} eventName={selectedEvent?.eventName}/>
        <MainInfo />
        <h2>Event Name: {selectedEvent?.eventName}</h2> */}
        {/* Display other event details here */}
        <MainInfo />
      </div>
    </>
  );
};

export default EventInfoPage;
