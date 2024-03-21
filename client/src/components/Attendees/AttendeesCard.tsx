import noPicture from "../../assets/noPicture.png";
import { IUser } from "../../interfaces/User";

interface AttendeesCardProps {
  user: IUser;
  headerImages: string[];
  userLoggedIn: string;
  sendInvitations: () => void;
}

const AttendeesCard: React.FC<AttendeesCardProps> = ({
  user,
  headerImages,
  sendInvitations,
  userLoggedIn,
}) => {
  const randomImage =
    headerImages[Math.floor(Math.random() * headerImages.length)];

  return (
    <div className="relative w-full sm:w-full overflow-hidden rounded-2xl bg-input h-full">
      <img
        src={randomImage}
        className="object-cover h-36 w-full"
        alt="background"
      />

      <div className="absolute w-full h-full flex top-0 mt-24 justify-center ">
        <img
          src={user?.image === "" ? noPicture : user.image}
          className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover"
        />
      </div>

      <div className="flex items-center justify-between  mt-3 p-3 pb-4 sm:pb-5 md:mt-6 ">
        <div className="bg-input rounded-b-2xl flex flex-col  justify-center h-full">
          <div className="flex gap-x-2">
            <p className="sm:text-sm md:text-md lg:text-lg font-semibold text-white">
              {user?.name?.charAt(0).toUpperCase() +
                user?.name?.slice(1).toLowerCase()}
            </p>
            <p className="sm:text-sm md:text-md lg:text-lg text-slate-300">
              {user?.age}
            </p>
          </div>
        </div>
        <div className="overflow-hidden z-10">
          {user?._id != userLoggedIn ? (
            <>
              <button
                onClick={sendInvitations}
                className="bg-lavender hover:bg-slate-500 px-5 p-1 text-sm md:text-md md:px-4 md:py-2 text-white rounded-lg"
              >
                Invite
              </button>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendeesCard;
