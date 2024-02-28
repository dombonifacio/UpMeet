import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { IUser } from "../interfaces/User";
import axios from "axios";

interface UserAuthenticate {
  user: IUser | null;
  isLoggedIn: boolean;
}

export interface UserContextInterface {
  data: UserAuthenticate;
  setData: Dispatch<SetStateAction<UserAuthenticate>>;
}

const defaultState: UserContextInterface = {
  data: {
    user: null,
    isLoggedIn: false,
  },
  setData: () => {},
};

type UserProviderProps = {
  children: ReactNode;
};

export const UserContext = createContext<UserContextInterface>(defaultState);

export const UserContextProvider = ({ children }: UserProviderProps) => {
  const [data, setData] = useState(defaultState.data);

  return (
    <UserContext.Provider value={{ data, setData }}>
      {/* Wrap data and setData in an object */}
      {children}
    </UserContext.Provider>
  );
};
