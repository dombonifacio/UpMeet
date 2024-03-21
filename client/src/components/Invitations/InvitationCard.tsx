import IInvitation from "../../interfaces/Invitation";
import defaultProf from "../../assets/defaultProf.jpg";

interface OpenState {
  showReceivedInvitations: boolean;
  showSentInvitations: boolean;
}
interface InvitationCardProps {
  data: IInvitation;
  acceptInvitation: () => void;
  declineInvitation: () => void;
  isAccepted: boolean;
  isDeclined: boolean;
  isOpen: OpenState;
}

export const InvitationCard: React.FC<InvitationCardProps> = ({
  data,
  declineInvitation,
  acceptInvitation,

  isOpen,
}) => {
  return (
    <div className="bg-input h-full w-full rounded-lg p-4">
      {isOpen?.showReceivedInvitations ? (
        <>
          <div className="flex flex-col items-center gap-y-5">
            <div className="flex gap-x-3">
              {/* User profile picture */}
              {data.fromUser.image == "" ? (
                <img
                  src={defaultProf}
                  alt="user profile picture"
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover shrink-0"
                />
              ) : (
                <img
                  src={data.fromUser.image}
                  alt="user profile picture"
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover shrink-0"
                />
              )}

              {/* Information about the user. Not the image section */}
              <div className="flex flex-col">
                <p className="font-bold text-indigo-300 text-xl">
                  {data.fromUser.name}
                </p>
                <p className="text-sm">{data.description}</p>
              </div>
            </div>

            {/* Accept or Decline */}

            {data.status == "accepted" ? (
              <>
                <p className="text-green-300  border-b-2 border-green-500 ">
                  Accepted
                </p>
              </>
            ) : data.status == "declined" ? (
              <>
                <p className="text-red-300 border-b-2 border-red-500 ">
                  Declined
                </p>
              </>
            ) : (
              <div className="flex gap-x-4">
                <button
                  onClick={acceptInvitation}
                  className="text-green-300 hover:text-green-500 border-b-2 border-green-500 "
                >
                  Accept
                </button>
                <button
                  onClick={declineInvitation}
                  className="text-red-300 hover:text-red-500 border-b-2 border-red-500 "
                >
                  Decline
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center gap-y-5">
            <div className="flex gap-x-3 w-full">
              {/* User profile picture */}
              {data.toUser.image == "" ? (
                <img
                  src={defaultProf}
                  alt="user profile picture"
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover shrink-0"
                />
              ) : (
                <img
                  src={data.toUser.image}
                  alt="user profile picture"
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover shrink-0"
                />
              )}

              {/* Information about the user. Not the image section */}
              <div className="flex flex-col">
                <p className="font-bold text-indigo-300 text-xl">
                  {data.toUser.name}
                </p>

                <p className="font-bold text-indigo-300">
                  {data.event.eventName}
                </p>
                {data.status == "pending" ? (
                  <p className="text-yellow-400  border-b-2 border-yellow-500 font-semibold mx-auto mt-3">
                    Pending
                  </p>
                ) : data.status == "accepted" ? (
                  <p className="text-green-300  border-b-2 border-green-500 font-semibold mx-auto mt-3">
                    Accepted
                  </p>
                ) : (
                  <p className="text-red-400  border-b-2 border-red-500 font-semibold mx-auto mt-3">
                    Declined
                  </p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
