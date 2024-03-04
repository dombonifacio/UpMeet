import { useContext, useEffect, useState } from "react";
import michael from "../../assets/michael.jpg";
import AttendeesCard from "./AttendeesCard";
import { IUser } from "../../interfaces/User";
import { useParams } from "react-router-dom";
import axios, { AxiosError, AxiosResponse } from "axios";
import { notifyUser } from "../../utils/helpers/toastify";
import { ToastContainer } from "react-toastify";
import { UserContext } from "../../context/UserContext";
import { PreviousEventsContext } from "../../context/SavedEventsContext";
import { IEvent } from "../../interfaces/Event";

export default function AttendeesContainer() {
  // event id
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const { data } = useContext(UserContext);
  const [attendees, setAttendees] = useState<IUser[]>([]);
  const [headerImages, setHeaderImages] = useState<string[]>([]);
  const [eventEnded, setEventEnded] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // check if one of the events in the previousEvents matches with the useParams id. If it is, then the event has ended
  const { previousEvents } = useContext(PreviousEventsContext);

  useEffect(() => {
    const checkIfEnded = previousEvents?.some(
      (event: IEvent) => event.eventId === id
    );
    if (checkIfEnded) setEventEnded(true);
  }, []);

  const getHeaderImages = () => {
    axios
      .get(
        "https://api.unsplash.com/collections/829966/photos?client_id=iM8M9566YIOyHW7sGqDQNBKe0GDJNVzVDRN9ZhgQqgk"
      )
      .then((res: AxiosResponse) => {
        const images = res.data.map((image: any) => image.urls.regular);

        setHeaderImages(images);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  };

  const getEventAttendees = () => {
    setLoading(true);
    axios
      .get(`/api/eventAttendance/get_event_attendees/${id}`)
      .then((res: AxiosResponse) => {
        if (res.data.count > 0) {
          setAttendees(res.data.eventAttendeesInfo);
        }
      })
      .catch((error) => {
        if (error.status === 500) {
          notifyUser(error.data.error, "error");
        } else {
          setError(error.response?.data.error);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getHeaderImages();
    getEventAttendees();
  }, []);

  useEffect(() => {
    if (attendees) console.log("attendees: ", attendees);
  }, [attendees]);

  const sendInvitations = (userId: string) => {
    const data = {
      eventId: id,
      toUserId: userId,
    };
    axios
      .post("/api/invitation/send_invitation", data)
      .then((res: AxiosResponse) => {
        if (res.status === 201 || 200) {
          notifyUser(res.data.message, "success");
        }
      })
      .catch((error) => {
        if (error.status === 500) {
          notifyUser(error.data.error, "error");
        } else {
          notifyUser(error.response?.data.error, "error");
        }
      });
  };

  if (eventEnded) {
    return (
      <div className="px-4 flex items-center justify-center">
        <h1 className="text-electric font-bold text-2xl md:text-3xl lg:text-4xl text-center ">
          Unavailable to see people going. Event has ended
        </h1>
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      {loading ? (
        <p className="text-white text-4xl font-bold">Loading</p>
      ) : (
        <div className="mt-5 space-y-6 w-full px-4">
          {attendees?.length === 0 || !attendees ? (
            <div className="w-full h-full">
              <p className="text-4xl text-center w-full">No users are going</p>
            </div>
          ) : (
            <>
              <div className="flex gap-x-2 sm:items-center">
                <div className="bg-lavender w-2 sm:h-8"></div>
                <h1 className="text-electric font-bold text-2xl md:text-3xl lg:text-4xl ">
                  Discover Who's Going
                </h1>
              </div>

              <div className="grid grid-cols-1 w-full place-items-center gap-y-5 sm:grid-cols-2 sm:gap-x-4 md:grid-cols-3 lg:grid-cols-4 ">
                {attendees?.map((user: IUser) => (
                  <AttendeesCard
                    key={user?._id} // Add a key prop here
                    user={user}
                    headerImages={headerImages}
                    sendInvitations={() =>
                      user?._id && sendInvitations(user?._id)
                    }
                    userLoggedIn={data.user}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
