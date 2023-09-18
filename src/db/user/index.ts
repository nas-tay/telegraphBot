import mongoose from "mongoose";
const { Schema, model } = mongoose;

interface IUser {
  id: number;
}

const userSchema = new Schema<IUser>({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
});

const UserModel = model<IUser>("User", userSchema);
export default UserModel;
