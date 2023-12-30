import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { IEvent } from "../interfaces/Event";

export interface EventsContextInterface {
  events: IEvent[];
  setEvents: Dispatch<SetStateAction<IEvent[]>>;
}

const defaultState: EventsContextInterface = {
  events: [],
  setEvents: () => {},
};

type EventsProviderProps = {
  children: ReactNode;
};

export const EventsContext = createContext(defaultState);

export const EventsContextProvider = ({ children }: EventsProviderProps) => {
  const [events, setEvents] = useState<IEvent[]>([]);

  return (
    <EventsContext.Provider value={{ events, setEvents }}>
      {children}
    </EventsContext.Provider>
  );
};
