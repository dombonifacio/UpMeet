export interface IImage {
  ratio: String;
  url: string;
}

export interface IEvent {
  id: String;
  artist: String;
  eventName: String;
  guests?: String[];
  date: String;
  images?: IImage[];
  country: String;
  city: String;
  venue: String;
  time: String;
  dateTime: Date;
  timezone: String
  genre?: String[];
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
      localDate: String;
      localTime: String;
      dateTime: Date;
    };
    timezone: String
  };
  classifications: [
    {
      genre: { name: String };
      subGenre?: { name: String };
    }
  ];
}
