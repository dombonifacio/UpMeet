import axios, { AxiosError, AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";

import camera from "../assets/camera.jpg";

import FutureEvents from "../components/Profile/FutureEvents";
import { PreviousEvents } from "../components/Profile/PreviousEvents";
import { IEvent } from "../interfaces/Event";
import moment from "moment-timezone";
import { timezones } from "../utils/constants/Timezones";
import { notifyUser } from "../utils/helpers/toastify";
import { ToastContainer } from "react-toastify";
import { Navbar } from "../components/Navbar/Navbar";
import { EventsContext } from "../context/EventsContext";
import { PreviousEventsContext } from "../context/SavedEventsContext";

interface IUser {
  _id: string;
  name: string;
  age: number;
  email: string;
  country: string;
  image: string;
}

const ProfilePage = () => {
  const [user, setUser] = useState<IUser>({} as IUser);

  const defaultState = {
    showEvents: true,
    showFavourites: false,
  };

  interface OpenState {
    showEvents: boolean;
    showFavourites: boolean;
  }

  const [isOpen, setIsOpen] = useState<OpenState>(defaultState);

  // showEvents is default when entering the profile page - check
  // if I click on Favourites page, change showEvents to false and showFavourites to true -> !showEvents and !showFavourites
  //

  function toggle() {
    setIsOpen((prevState) => ({
      ...prevState,
      showEvents: !prevState.showEvents,
      showFavourites: !prevState.showFavourites,
    }));
  }

  const getUserInfo = () => {
    axios
      .get("/api/users/profile", {
        withCredentials: true,
      })
      .then((res: AxiosResponse) => {
        setUser(res.data);
        console.log("response", res);
      })
      .catch((error: AxiosError) => {
       console.log("error", error)
      });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const [selectedImage, setSelectedImage] = useState<
    Blob | MediaSource | string
  >("");
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const uploadImageCloudinary = async () => {
    if (selectedImage) {
      // create form data
      const formData = new FormData();

      // cloudinary key
      formData.append("upload_preset", "mystorage");
      // upload to a specific folder
      formData.append("folder", "JamCon");
      formData.append("file", selectedImage as string);

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dpj2su9ea/upload",
          formData
        );
        return response.data.url;
      } catch (error) {}
    }
  };

  const handleImageUpload = async () => {
    const getImageUrl: string = await uploadImageCloudinary();

    if (typeof getImageUrl !== "string" || getImageUrl == "") {
      throw Error;
    }
    axios
      .patch("https://upmeet.onrender.com/api/users/update_image", {
        image: getImageUrl,
      })
      .then((res: AxiosResponse) => {
        notifyUser(
          res.data.message + " Redirecting you to login page...",
          "success"
        );
        setSelectedImage("");
      })
      .catch((error) => {
        if (error.status === 500) {
          notifyUser(error.data.error, "error");
        } else {
          notifyUser(error.response?.data.error, "error");
        }
      });
  };

  const { events, setEvents } = useContext(EventsContext);
  const { previousEvents, setPreviousEvents } = useContext(
    PreviousEventsContext
  );

  const getTimezone = (offset: number): Date => {
    const d = new Date();
    const localTime = d.getTime();
    const localOffset = d.getTimezoneOffset() * 60000;
    const utc = localTime + localOffset;
    const eventCountry = utc + 3600000 * offset;
    const convertedTimezone = new Date(eventCountry);

    return convertedTimezone;
  };
  const [loading, setLoading] = useState<boolean>(false);

  const getSelfEvents = () => {
    setLoading(true);
    axios
      .get(
        "https://upmeet.onrender.com/api/eventAttendance/get_attending_events"
      )
      .then((res: AxiosResponse) => {
        // Separate arrays for previous and future events
        const newPreviousEvents: IEvent[] = [];
        const newFutureEvents: IEvent[] = [];

        // only add events to previous/future events if the user has gone to events or is going to events
        if (res.data.length > 0) {
          res.data.forEach((event: IEvent) => {
            const eventDateTime = event.dateTime;
            const eventDateObj = new Date(eventDateTime);

            // get timezone of the event
            const convertTimezone = moment(eventDateTime);
            const timezone: string = convertTimezone
              .tz(event.timezone)
              .format("z");

            // get UTC offset based on timezone. Use BST timezone if the event timezone is Europe/London
            const offset =
              event.timezone === "Europe/London" ? +1 : timezones[timezone];
            const currentEventTimezone = getTimezone(offset);

            // convert to date obj to be able to compare dates
            const convertCurrentTimezone = new Date(currentEventTimezone);

            // save to previous/future events
            if (convertCurrentTimezone > eventDateObj) {
              newPreviousEvents.push(event);
            } else {
              newFutureEvents.push(event);
            }
          });

          // Clear the previous state and update with the new arrays
          setPreviousEvents(newPreviousEvents);
          setEvents(newFutureEvents);
        }
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getSelfEvents();
  }, []);

  return (
    <>
      <ToastContainer />

      <div className="mx-auto max-w-[1260px] h-screen relative">
        <div className="absolute h-full w-full top-0 ">
          <Navbar />
        </div>

        <div className="flex flex-row pt-24">
          <div className="flex flex-row px-6 gap-x-6">
            <div className=" ">
              {user.image ? (
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black opacity-0 group-hover:opacity-100 rounded-full w-36 h-36 md:h-48 h:w-48 transition-opacity flex items-end justify-center">
                    <p className="hidden group-hover:block text-slate-300 font-semibold text-sm p-4 md:text-lg mb-2">
                      Edit Picture
                    </p>
                  </div>
                  <input
                    type="file"
                    id="fileInput"
                    className="opacity-0 absolute inset-0 cursor-pointer rounded-full w-48 h-48"
                    onChange={handleImageChange}
                  />
                  <label
                    htmlFor="fileInput"
                    className="block w-full h-full cursor-pointer"
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={
                        selectedImage
                          ? URL.createObjectURL(selectedImage as Blob)
                          : user?.image
                      }
                      alt="User Image"
                      className="object-cover z-10 rounded-full w-36 h-36 md:h-48 h:w-48"
                    />
                  </label>
                </div>
              ) : (
                <>
                  <input
                    type="file"
                    id="fileInput"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  {/* Image icon as a label for the file input */}
                  <label
                    htmlFor="fileInput"
                    className="cursor-pointer block w-36 h-36 md:h-48 h:w-48 rounded-full object-cover"
                  >
                    {selectedImage ? (
                      <img
                        src={URL.createObjectURL(selectedImage as Blob)}
                        alt="Selected Image"
                        className="object-cover z-10 rounded-full w-36 h-36 md:h-48 h:w-48"
                      />
                    ) : (
                      <img
                        className="rounded-full"
                        src={camera}
                        alt="Camera Icon"
                      />
                    )}
                  </label>
                </>
              )}

              {/* IMAGE SAVING */}
              <div className="p-3 flex justify-center">
                {selectedImage && (
                  <button
                    className="text-white text-xl font-bold text-center p-2 px-4 bg-green-700 rounded-lg mt-2 hover:bg-green-900"
                    onClick={handleImageUpload}
                  >
                    Save
                  </button>
                )}
              </div>
              {/* IMAGE SAVING */}
            </div>

            <div className="flex flex-col justify-center ">
              <div className="flex items-center gap-x-3                                                                                                ">
                <p>Name: </p>
                <p className="text-indigo-300 font-bold text-2xl sm:text-3xl md:text-4xl">
                  {user?.name}
                </p>
              </div>
              <div className="flex items-center gap-x-3">
                <p>Age:</p>
                <p className="text-indigo-300 font-light text-lg sm:text-xl md:text-2xl">
                  {user?.age}
                </p>
              </div>
            </div>
          </div>

          {/* <div>
            <p> Number of events:</p>
            <p></p>
        </div> */}
        </div>

        <div className="flex flex-row  text-white text-[20px] relative px-6 ">
          <div className="flex-1 ">
            {isOpen.showEvents ? (
              <p
                className="text-indigo-300 no-underline border-b-[3px] border-solid  border-white text-center text-md"
                onClick={toggle}
              >
                Future Events
              </p>
            ) : (
              <p
                className=" text-indigo-300  text-center cursor-pointer border-b-[1px] border-solid border-gray-400 text-md"
                onClick={toggle}
              >
                {" "}
                Future Events
              </p>
            )}
          </div>
          <div className="flex-1 ">
            {isOpen.showFavourites ? (
              <p
                className="text-indigo-300 text-center border-b-[3px] border-solid border-white text-md"
                onClick={toggle}
              >
                Previous Events
              </p>
            ) : (
              <p
                className="text-indigo-300 text=md text-center cursor-pointer border-b-[1px] border-solid border-gray-400"
                onClick={toggle}
              >
                {" "}
                Previous Events
              </p>
            )}
          </div>
        </div>

        <br />
        <div className=" relative p-6">
          {isOpen.showEvents ? (
            <FutureEvents data={events} loading={loading} />
          ) : (
            <PreviousEvents data={previousEvents} loading={loading} />
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
