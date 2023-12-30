import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

type AuthContextType = {
  isAuthenticated: boolean | undefined;
  setAuthentication: Dispatch<SetStateAction<boolean>>;
};

const defaultState: AuthContextType = {
  isAuthenticated: undefined,
  setAuthentication: () => {},
};

export const AuthContext = createContext(defaultState);

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [isAuthenticated, setAuthentication] = useState<boolean>(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthentication }}>
      {children}
    </AuthContext.Provider>
  );
};
