import { Schema, model } from "mongoose";

// interface for User Schema
interface IUser {
  email: string;
  name: string;
  password: string;
  age: Number;
  country?: string;
  image?: string;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: [true, "Please enter an email."] },
  name: { type: String, required: [true, "Please enter a name."] },
  // select; false -> ensures that they are not returned by default
  password: {
    type: String,
    required: [true, "Please enter a password."],
  },
  age: { type: Number, required: [true, "Please enter your age."] },
  country: { type: String },
  image: { type: String },
});

// create a collection called users and define its structure using the schema created above
// use this UserModel to create a new user, or for finding documents in the users collection
// UserModel.findOne
export const UserModel = model<IUser>("users", UserSchema);
