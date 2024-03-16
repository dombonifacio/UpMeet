
import { InvitationContainer } from "../components/Invitations/InvitationContainer";
import { Navbar } from "../components/Navbar/Navbar";

export const InvitationsPage = () => {
  return (
    <>
     <div className="max-w-[1260px] mx-auto">
        <Navbar />
      </div>

      <div className="mx-auto flex justify-center md:block max-w-[1260px] w-screen  md:w-screen px-4">
        <InvitationContainer />
      </div>
    </>
  );
};
