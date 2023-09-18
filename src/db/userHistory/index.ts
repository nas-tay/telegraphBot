import mongoose from "mongoose";
const { Schema, model } = mongoose;

interface IUserHistory {
  userId: number;
  adId: string;
  viewed: boolean;
}

const userHistorySchema = new Schema<IUserHistory>({
  userId: {
    type: Number,
    required: true,
  },
  adId: {
    type: String,
    required: true,
  },
  viewed: {
    type: Boolean,
    default: false,
  },
});

const UserHistoryModel = model<IUserHistory>("UserHistory", userHistorySchema);
export default UserHistoryModel;
