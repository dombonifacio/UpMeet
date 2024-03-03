// Create an interface for the Context API

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { IEvent } from "../interfaces/Event";

interface IPreviousEventsContext {
  previousEvents: IEvent[];
  setPreviousEvents: Dispatch<SetStateAction<IEvent[]>>;
}

const defaultState = {
  previousEvents: [],
  setPreviousEvents: () => {},
};

export const PreviousEventsContext =
  createContext<IPreviousEventsContext>(defaultState);

type PreviousEventsProps = {
  children: ReactNode;
};

export const PreviousEventsContextProvider = ({
  children,
}: PreviousEventsProps) => {
  const [previousEvents, setPreviousEvents] = useState<IEvent[]>(
    [] as IEvent[]
  );

  return (
    <PreviousEventsContext.Provider
      value={{ previousEvents, setPreviousEvents }}
    >
      {children}
    </PreviousEventsContext.Provider>
  );
};
