import { useState, useEffect } from "react";
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import Popup from "./Popup";
import axios, { AxiosResponse } from "axios";
import { IEvent } from "../../interfaces/Event";

export default function Favourites() {
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen((isOpen) => !isOpen);
  }

  const getSavedEvents = () => {
    axios
      .get("/api/eventAttendance/get_saved_events")
      .then((res: AxiosResponse) => {
        console.log(res, "data response");
      });
  };

  useEffect(() => {
    getSavedEvents();
  }, []);

  return (
    <>
      <p className="text-white text-center text-[30px] mb-5">Favourites</p>

      {/* Event containers */}

      <div className="mx-10 mb-5 ">
        <div className="border-purple-900/75 bg-purple-900/75 h-fit w-full p-3 border-4 mb-5">
          <div className="flex flex-row justify-between text-purple-300 mb-5 ...">
            <div className="flex">
              <img
                className="h-[100px] w-[180px] object-cover"
                src="https://cdn.theatlantic.com/thumbor/NtpFdVRyOwBbCs9sNVAYxv6VseI=/1x167:4839x2888/1600x900/media/img/mt/2023/03/tayloropener-1/original.jpg"
              ></img>

              <div className="ml-20 mt-7 text-[20px] font-bold">
                <p> Taylor Swift: The Eras Tour </p>
              </div>
            </div>
            <div className="App">
              {/* <button onClick={toggle} className="p-2 w-[200px] bg-purple-300 text-purple-900 h-fit rounded mt-6 mr-10 pl-[20px]"> More Info <KeyboardArrowDownIcon /></button> */}
            </div>
          </div>

          {isOpen && <Popup />}
        </div>
        <div className="border-purple-900/75 bg-purple-900/75 h-fit w-full p-3 border-4 mb-5">
          <div className="flex flex-row justify-between text-purple-300 mb-5 ...">
            <div className="flex">
              <img
                className="h-[100px] w-[180px] object-cover"
                src="https://cdn.theatlantic.com/thumbor/NtpFdVRyOwBbCs9sNVAYxv6VseI=/1x167:4839x2888/1600x900/media/img/mt/2023/03/tayloropener-1/original.jpg"
              ></img>

              <div className="ml-20 mt-7 text-[20px] font-bold">
                <p> Taylor Swift: The Eras Tour </p>
              </div>
            </div>
            <div className="App">
              {/* <button onClick={toggle} className="p-2 w-[200px] bg-purple-300 text-purple-900 h-fit rounded mt-6 mr-10 pl-[20px]"> More Info <KeyboardArrowDownIcon /></button> */}
            </div>
          </div>

          {isOpen && <Popup />}
        </div>
        <div className="border-purple-900/75 bg-purple-900/75 h-fit w-full p-3 border-4 mb-5">
          <div className="flex flex-row justify-between text-purple-300 mb-5 ...">
            <div className="flex">
              <img
                className="h-[100px] w-[180px] object-cover"
                src="https://cdn.theatlantic.com/thumbor/NtpFdVRyOwBbCs9sNVAYxv6VseI=/1x167:4839x2888/1600x900/media/img/mt/2023/03/tayloropener-1/original.jpg"
              ></img>

              <div className="ml-20 mt-7 text-[20px] font-bold">
                <p> Taylor Swift: The Eras Tour </p>
              </div>
            </div>
            <div className="App">
              {/* <button onClick={toggle} className="p-2 w-[200px] bg-purple-300 text-purple-900 h-fit rounded mt-6 mr-10 pl-[20px]"> More Info <KeyboardArrowDownIcon /></button> */}
            </div>
          </div>

          {isOpen && <Popup />}
        </div>
        <div className="border-purple-900/75 bg-purple-900/75 h-fit w-full p-3 border-4 mb-5">
          <div className="flex flex-row justify-between text-purple-300 mb-5 ...">
            <div className="flex">
              <img
                className="h-[100px] w-[180px] object-cover"
                src="https://cdn.theatlantic.com/thumbor/NtpFdVRyOwBbCs9sNVAYxv6VseI=/1x167:4839x2888/1600x900/media/img/mt/2023/03/tayloropener-1/original.jpg"
              ></img>

              <div className="ml-20 mt-7 text-[20px] font-bold">
                <p> Taylor Swift: The Eras Tour </p>
              </div>
            </div>
            <div className="App">
              {/* <button onClick={toggle} className="p-2 w-[200px] bg-purple-300 text-purple-900 h-fit rounded mt-6 mr-10 pl-[20px]"> More Info <KeyboardArrowDownIcon /></button> */}
            </div>
          </div>

          {isOpen && <Popup />}
        </div>
      </div>
    </>
  );
}
