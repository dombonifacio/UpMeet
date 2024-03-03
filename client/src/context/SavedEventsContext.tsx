// Create an interface for the Context API

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { IEvent } from "../interfaces/Event";

interface ISavedEventsContext {
  savedEvents: IEvent[];
  setSavedEvents: Dispatch<SetStateAction<IEvent[]>>;
}

const defaultState = {
  savedEvents: [],
  setSavedEvents: () => {},
};

export const SavedEventsContext =
  createContext<ISavedEventsContext>(defaultState);

type SavedEventsProviderProps = {
  children: ReactNode;
};

export const SavedEventsContextProvider = ({
  children,
}: SavedEventsProviderProps) => {
  const [savedEvents, setSavedEvents] = useState<IEvent[]>([] as IEvent[]);

  return (
    <SavedEventsContext.Provider value={{ savedEvents, setSavedEvents }}>
      {children}
    </SavedEventsContext.Provider>
  );
};
