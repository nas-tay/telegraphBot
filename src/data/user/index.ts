import User from "../../db/user/index.js";

export type SaveUserType = {
  id: number;
};

export class UserData {
  public static async getUser(id: string): Promise<SaveUserType | null> {
    if (!User.findOne({ id })) {
      return null;
    }
    return await User.findOne({ id });
  }

  public static async updateUser() {}

  public static async saveUser(user: SaveUserType): Promise<SaveUserType | null> {
    const savedUser = await User.findOne({ id: user.id });
    if (savedUser) {
      return null;
    }
    const newUser = new User(user);
    const saved = await newUser.save();
    console.log("User is saved to MongoDB");
    return saved;
  }
}
