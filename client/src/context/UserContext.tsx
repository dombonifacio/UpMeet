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

export interface UserContextInterface {
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
  loading: boolean;
}

const defaultState: UserContextInterface = {
  user: null,
  loading: false,
  setUser: () => {},
};

type UserProviderProps = {
  children: ReactNode;
};



export const UserContext = createContext(defaultState);

export const UserContextProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  
  // useEffect(() => {
  //     setLoading(true);

  //   axios
  //     .get("/api/users/profile")
  //     .then((res) => {
  //       setUser(res.data)
  //       console.log("User data:", res.data);
  //     })
  //     .catch((error) => console.log(error))
  //     .finally(() => {
  //       setLoading(false)
  //     })
    
  // }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading}}>
      {children}
    </UserContext.Provider>
  );
};
