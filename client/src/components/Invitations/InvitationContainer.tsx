import axios, { Axios, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { IEvent } from "../../interfaces/Event";
import IInvitation from "../../interfaces/Invitation";
import AttendeesCard from "../Attendees/AttendeesCard";
import { InvitationCard } from "./InvitationCard";
import { notifyUser } from "../../utils/helpers/toastify";
import { ToastContainer } from "react-toastify";

interface OpenState {
  showReceivedInvitations: boolean;
  showSentInvitations: boolean;
}
export const InvitationContainer = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [pendingInvitations, setPendingInvitations] = useState<IInvitation[]>(
    []
  );
  const [acceptedInvitations, setAcceptedInvitations] = useState<IInvitation[]>(
    []
  );
  const [declinedInvitations, setDeclinedInvitations] = useState<IInvitation[]>(
    []
  );
  const [invitations, setInvitations] = useState<IInvitation[]>([]);
  const [isAccepted, setIsAccepted] = useState(false);
  const [isDeclined, setIsDeclined] = useState(false);

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
      .get("/api/invitation/get_received_invitations")
      .then((res: AxiosResponse) => {
        setInvitations(res.data);
        const pendingInvitations = res.data.filter(
          (invitation: IInvitation) => invitation.status == "pending"
        );
        setPendingInvitations(pendingInvitations);
        const acceptedInvitations = res.data.filter(
          (invitation: IInvitation) => invitation.status == "accepted"
        );
        setAcceptedInvitations(acceptedInvitations);
        const declinedInvitations = res.data.filter(
          (invitation: IInvitation) => invitation.status == "declined"
        );
        setDeclinedInvitations(declinedInvitations);
      })
      .catch((error: AxiosResponse) => {
        console.log(error, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getSentInvitations = () => {
    setLoading(true);
    axios
      .get("/api/invitation/get_sent_invitations")
      .then((res: AxiosResponse) => {
        setSentInvitations(res.data);
        console.log(res.data, 'response')
      })
      .catch((error: AxiosResponse) => {
        console.log(error, "error");
      })
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
      .patch("/api/invitation/accept_invitation", data)
      .then((res: AxiosResponse) => {
        if (res.status === 201 || 200) {
          setIsAccepted(true);
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
      .patch("/api/invitation/decline_invitation", data)
      .then((res: AxiosResponse) => {
        if (res.status === 201 || 200) {
          setIsDeclined(true);
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
  console.log(invitations, 'received invitations')
  return (
    <>
      <ToastContainer />
      <div className="flex gap-x-2 sm:items-center my-10">
        <div className="bg-lavender w-2 sm:h-8"></div>
        <h1 className="text-electric font-bold text-4xl ">Invitations</h1>
      </div>

      {loading ? (
        <p>loading</p>
      ) : (
        <>
          <div className="flex w-full items-center">
            {isOpen.showReceivedInvitations ? (
              <p className="text-indigo-300 text-[30px] no-underline border-b-[3px] border-solid  border-white text-center w-full">
                Received Invitations
              </p>
            ) : (
              <p
                className=" text-indigo-300 text-[30px] text-center cursor-pointer border-b-[1px] border-solid border-gray-400 w-full "
                onClick={toggle}
              >
                {" "}
                Received Invitations
              </p>
            )}
            {isOpen.showSentInvitations ? (
              <p className="text-indigo-300 text-[30px] text-center border-b-[3px] border-solid border-white w-full ">
                Sent Invitations
              </p>
            ) : (
              <p
                className="text-indigo-300 text-[30px] text-center cursor-pointer border-b-[1px] border-solid border-gray-400 w-full"
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
    </>
  );
};
