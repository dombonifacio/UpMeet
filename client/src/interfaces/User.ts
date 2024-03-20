export interface IUser {
  _id: string;
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  gender: string;
  age: Number;
  country?: string;
  image?: string;
}
