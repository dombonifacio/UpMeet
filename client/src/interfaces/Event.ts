export interface IImage {
  ratio: String;
  url: string;
}

export interface IEvent {
  eventId: string;
  artist: String;
  eventName: String;
  guests?: String[];
  date: Date;
  images?: IImage[];
  country: String;
  city: String;
  venue: String;
  startTime: String;
  dateTime: Date;
  timezone: string;
  genre?: String[];
  isSaved?: boolean;
}

export interface IEventData {
  id: String;
  name: String;
  _embedded: {
    attractions?: [{ name: String }];
    venues?: [
      { country: { name: String }; city: { name: String }; name: String }
    ];
  };
  images: {
    ratio: String;
    url: String;
  };
  dates: {
    start: {
      localDate: Date;
      localTime: String;
      dateTime: Date;
    };
    status: {
      code: string;
    };
    timezone: string;
  };
  classifications: [
    {
      genre: { name: String };
      subGenre?: { name: String };
    }
  ];
}
