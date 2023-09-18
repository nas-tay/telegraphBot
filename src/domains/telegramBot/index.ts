import { Telegraf } from "telegraf";
import { UserData } from "../../data/user/index.js";

export class TelegramBot {
  public bot: Telegraf;

  constructor(botToken: string) {
    this.bot = new Telegraf(botToken);
    this.setupHandlers();
  }
  public setupHandlers() {
    this.bot.command("start", async (ctx) => {
      this.bot.telegram.sendMessage(ctx.chat.id, `Здравствуйте ${ctx.from.first_name}!`);
      await UserData.saveUser({
        id: ctx.chat.id,
      });
    });
  }
  start() {
    this.bot.launch();
  }
}
