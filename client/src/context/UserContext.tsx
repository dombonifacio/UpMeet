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
  setLoading: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
}

const defaultState: UserContextInterface = {
  user: null,
  loading: false,
  setLoading: () => {},
  setUser: () => {},
};

type UserProviderProps = {
  children: ReactNode;
};

export const UserContext = createContext(defaultState);

export const UserContextProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   setLoading(true)

  //   axios
  //     .get("/api/users/profile")
  //     .then((res) => {
  //       setUser(res.data);
  //       console.log("User data inside user context:", res.data);
  //     })
  //     .catch((error) => console.log(error))
  //     .finally(() => {
  //       setLoading(false);
  //       console.log("finally is being triggered. loading:", loading)
  //     });
  // }, []);
  return (
    <UserContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  );
};
