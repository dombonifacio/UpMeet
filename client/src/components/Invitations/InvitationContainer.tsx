import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

import IInvitation from "../../interfaces/Invitation";

import { InvitationCard } from "./InvitationCard";
import { notifyUser } from "../../utils/helpers/toastify";
import { ToastContainer } from "react-toastify";

interface OpenState {
  showReceivedInvitations: boolean;
  showSentInvitations: boolean;
}
export const InvitationContainer = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const [invitations, setInvitations] = useState<IInvitation[]>([]);

  const [sentInvitations, setSentInvitations] = useState<IInvitation[]>([]);
  const defaultState = {
    showReceivedInvitations: true,
    showSentInvitations: false,
  };
  const [isOpen, setIsOpen] = useState<OpenState>(defaultState); // Add this line

  function toggle() {
    setIsOpen((prevState) => ({
      ...prevState,
      showReceivedInvitations: !prevState.showReceivedInvitations,
      showSentInvitations: !prevState.showSentInvitations,
    }));
  }
  const getReceivedInvitations = () => {
    setLoading(true);
    axios
      .get(
        "https://upmeet.onrender.com/api/invitation/get_received_invitations",
        {
          withCredentials: true
        }
      )
      .then((res: AxiosResponse) => {
        console.log(res.data); // Check the data received from the API
        setInvitations(res.data);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const getSentInvitations = () => {
    setLoading(true);
    axios
      .get("https://upmeet.onrender.com/api/invitation/get_sent_invitations", {
        withCredentials: true
      })
      .then((res: AxiosResponse) => {
        setSentInvitations(res.data);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const acceptInvitation = (userId: string, eventId: string) => {
    const data = {
      fromUserId: userId,
      eventId: eventId,
    };
    axios
      .patch(
        "https://upmeet.onrender.com/api/invitation/accept_invitation",
        data,
        {
          withCredentials: true
        }
      )
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

  const declineInvitation = (userId: string, eventId: string) => {
    const data = {
      fromUserId: userId,
      eventId: eventId,
    };
    axios
      .patch(
        "https://upmeet.onrender.com/api/invitation/decline_invitation",
        data,
        {
          withCredentials: true
        }
      )
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

  useEffect(() => {
    getReceivedInvitations();
    getSentInvitations();
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="w-full flex flex-col gap-y-4 sm:gap-y-6">
        <div className="flex gap-x-2">
          <div className="bg-lavender w-2 "></div>
          <h1 className="text-electric font-bold text-2xl sm:text-3xl md:text-4xl">
            Invitations
          </h1>
        </div>
        <div>
          {loading ? (
            <p>loading</p>
          ) : (
            <>
              <div className="flex  items-center">
                {isOpen.showReceivedInvitations ? (
                  <p className="text-indigo-300 text-2xl lg:text-3xl no-underline border-b-[3px] border-solid  border-white text-center w-full">
                    Received Invitations
                  </p>
                ) : (
                  <p
                    className=" text-indigo-300 text-2xl lg:text-3xl text-center cursor-pointer border-b-[1px] border-solid border-gray-400 w-full "
                    onClick={toggle}
                  >
                    {" "}
                    Received Invitations
                  </p>
                )}
                {isOpen.showSentInvitations ? (
                  <p className="text-indigo-300 text-2xl lg:text-3xl text-center border-b-[3px] border-solid border-white w-full ">
                    Sent Invitations
                  </p>
                ) : (
                  <p
                    className="text-indigo-300 text-2xl lg:text-3xl text-center cursor-pointer border-b-[1px] border-solid border-gray-400 w-full"
                    onClick={toggle}
                  >
                    {" "}
                    Sent Invitations
                  </p>
                )}
              </div>

              {isOpen.showReceivedInvitations ? (
                <>
                  <div className="grid grid-cols-1 w-full place-items-center gap-y-5 sm:grid-cols-2 sm:gap-x-4 md:grid-cols-3 mt-4">
                    {invitations.map((invitation) => (
                      <InvitationCard
                        // Add a unique key for each invitation
                        data={invitation}
                        acceptInvitation={() =>
                          acceptInvitation(
                            invitation.fromUser.fromUserId,
                            invitation.event.eventId
                          )
                        }
                        isAccepted
                        declineInvitation={() =>
                          declineInvitation(
                            invitation.fromUser.fromUserId,
                            invitation.event.eventId
                          )
                        }
                        isDeclined
                        isOpen={isOpen}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 w-full place-items-center gap-y-5 sm:grid-cols-2 sm:gap-x-4 md:grid-cols-3 mt-4">
                    {sentInvitations.map((invitation) => (
                      <InvitationCard
                        // Add a unique key for each invitation
                        data={invitation}
                        acceptInvitation={() =>
                          acceptInvitation(
                            invitation.fromUser.fromUserId,
                            invitation.event.eventId
                          )
                        }
                        isAccepted
                        declineInvitation={() =>
                          declineInvitation(
                            invitation.fromUser.fromUserId,
                            invitation.event.eventId
                          )
                        }
                        isDeclined
                        isOpen={isOpen}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
