interface IInvitation {
  fromUser: {
    fromUserId: string;
    name: string;
    image: string;
  };
  toUser: {
    toUserId: string;
    name: string;
    image: string;
  };
  event: {
    eventId: string;
    eventName: string;
    timezone: string;
    dateTime: Date;
  };
  description: string;
  date: Date;
  status: string;
}

export default IInvitation;
