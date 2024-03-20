import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

import ProfileHeader from '../components/Profile/ProfileHeader';
import Events from '../components/Profile/Events';
import Favourites from '../components/Profile/Favourites';


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

    const getUserInfo = () => {
        axios.get("/api/users/me").then((res: AxiosResponse) => {
            setUser(res.data);
        });
    };

    useEffect(() => {
        getUserInfo();
    });

    const defaultState = {
        showEvents: true,
        showFavourites: false
    }

    interface OpenState {
        showEvents: boolean,
        showFavourites: boolean
    }

    const [isOpen, setIsOpen] = useState<OpenState>(defaultState)



    // showEvents is default when entering the profile page - check
    // if I click on Favourites page, change showEvents to false and showFavourites to true -> !showEvents and !showFavourites
    // 

    function toggle() {
        setIsOpen((prevState) => (
            {
                ...prevState,
                showEvents: !prevState.showEvents,
                showFavourites: !prevState.showFavourites
            }
        ));

    }

    useEffect(() => {
        console.log('button is: ', isOpen)
    }, [isOpen])



    return (
        <>
            <ProfileHeader />

            <div className="flex flex-row">
                < div className="flex flex-row p-8">

                    < div className="p-5 ">
                      <img className="rounded-full" src="https://i.pinimg.com/236x/44/b9/65/44b965ef15668cf3ec5d7888be48ec3a.jpg" />
                    </div>

                    <div className="pt-10 text-[20px] text-purple-300 mt-8">
                        <p> Name: </p> <p>{user?.name}</p>
                        <p> Age: </p>  <p>{user?.age}</p>
                        <p> Country: </p>  <p>{user?.country}</p>
                    </div>

                </div>

                {/* <div>
            <p> Number of events:</p>
            <p></p>
        </div> */}


            </div>

            <div className="flex flex-row  text-white text-[20px] mx-[20px] ">

                <div className="flex-1 ">

                    {isOpen.showEvents ? <p className="text-purple-300 text-[30px] no-underline border-b-[3px] border-solid border-white text-center">Events</p> : <p className=" text-purple-300 text-[30px] text-center cursor-pointer border-b-[1px] border-solid border-gray-400 " onClick={toggle} > Events</p>}

                </div>
                <div className="flex-1 ">
                    {isOpen.showFavourites ? <p className="text-purple-300 text-[30px] text-center border-b-[3px] border-solid border-white ">Favourites</p> : <p className="text-purple-300 text-[30px] text-center cursor-pointer border-b-[1px] border-solid border-gray-400 " onClick={toggle} > Favourites</p>}
                </div>

            </div>


            <br />

            <div className="bg-white/10 pt-10 mx-5">



                {isOpen.showEvents ? <Events /> : <Favourites />}

            </div>
        </>
    )

}

export default ProfilePage;
