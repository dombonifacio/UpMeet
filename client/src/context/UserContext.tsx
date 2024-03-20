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
}

const defaultState: UserContextInterface = {
  user: null,
  setUser: () => {},
};

type UserProviderProps = {
  children: ReactNode;
};

export const UserContext = createContext(defaultState);

export const UserContextProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    if (!user) {
      axios
        .get("/api/users/me")
        .then((res) => {
          setUser(res.data);
          console.log("User data:", res.data);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
