import { toast } from "react-toastify";
import { MessageType } from "../../interfaces/Message";
import "react-toastify/dist/ReactToastify.css";

const options = {
  position: toast.POSITION.BOTTOM_LEFT,
  autoClose: 2500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const notifyUser = (message: string, messageType: MessageType) =>
  toast(message, { ...options, type: messageType });
