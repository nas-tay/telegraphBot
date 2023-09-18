import UserHistory from "../../db/userHistory/index.js";

export type SaveUserHistoryType = {
  userId: number;
  adId: string;
  viewed: boolean;
};

export class UserHistoryData {
  public static async getUserHistory(userId: number, adId: string): Promise<SaveUserHistoryType | null> {
    if (!UserHistory.findOne({ userId, adId })) {
      return null;
    }
    return await UserHistory.findOne({ userId, adId });
  }

  // public static async updateUserHistory(userId: number, adId: string): Promise<SaveUserHistoryType | null> {
  //   if (!UserHistory.findOne({ userId, adId })) {
  //     return null;
  //   }
  //   return await UserHistory.findOneAndUpdate({ userId, adId }, { field });
  // }

  public static async saveUserHistory(userHistory: SaveUserHistoryType): Promise<SaveUserHistoryType | null> {
    const savedUserHistory = await UserHistory.findOne({ userId: userHistory.userId, adId: userHistory.adId });
    if (savedUserHistory) {
      console.log("such user history already exists");
      return null;
    }
    const newUserHistory = new UserHistory(userHistory);
    const saved: SaveUserHistoryType = await newUserHistory.save();
    console.log("UserHistory is saved to MongoDB");
    return saved;
  }
}
