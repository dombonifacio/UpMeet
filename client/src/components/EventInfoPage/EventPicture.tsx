import { IImage } from "../../interfaces/Event";

interface IEventPictureProps {
  image: string;
  eventName: String;
  artist: String;
}

const EventPicture = ({ image, eventName, artist }: IEventPictureProps) => {
  return (
    <div className="relative">
      <img
        src={image}
        className="w-full h-64 object-cover opacity-50 md:rounded-[80px] md:h-80 md:w-80 md:object-cover md:opacity-100 lg:h-96 lg:w-96 xl:h-[450px] xl:w-[450px]"
      />
      <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center md:hidden">
        <p className="text-4xl text-white text-center font-bold md:hidden">
          {" "}
          {artist ? artist : eventName}
        </p>
      </div>
    </div>
  );
};

export default EventPicture;

// rounded-[80px] h-80 w-64 object-cover
