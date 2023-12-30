export type MessageType = "success" | "error" | "warning" | "info";

export interface IMessage {
  type: MessageType;
  message: string;
}
