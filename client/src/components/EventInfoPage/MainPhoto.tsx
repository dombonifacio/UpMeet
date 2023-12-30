import { IImage } from "../../interfaces/Event";

interface IMainPhotoProps {
  image: string
  artistName?: String
  eventName?: String
}

export default function MainPhoto({image, artistName, eventName}: IMainPhotoProps) {
  return (
    <>
      {/* Image */}
      
      {/* <img
        src={image}
        alt=""
        className=" relative object-cover w-full h-[460px]"
      /> */}

      {/* Artist Name Over the photo */}
     
    </>
  );
}