import IInvitation from "../../interfaces/Invitation";
import defaultProf from "../../assets/defaultProf.jpg"

interface SentInvitationsProps {
  sentInvitations: IInvitation[];
}

export const SentInvitations = ({ sentInvitations }: SentInvitationsProps) => {
  return (
    <>
      <div className="grid grid-cols-1 w-full place-items-center gap-y-5 sm:grid-cols-2 sm:gap-x-4 md:grid-cols-3 mt-4">
        {sentInvitations.map((invitation) => (
          <div className="bg-input h-full w-full rounded-lg p-4">
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
                </div>
              </div>

              {/* Accept or Decline */}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
