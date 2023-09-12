import { Telegraf } from "telegraf";
import { Config } from "./config/index.js";
const botToken = Config.bot;
const bot = new Telegraf(botToken);
// const chatId: string = process.env.CHAT_ID as string;
bot.start((ctx) => {
    ctx.reply("Здравствуйте " + ctx.from.first_name + "!");
    ctx.reply("Введите id объявления");
});
bot.help((ctx) => {
    ctx.reply("Send /start to receive a greeting");
    ctx.reply("Send /keyboard to receive a message with a keyboard");
    ctx.reply("Send /quit to stop the bot");
});
bot.on("text", (ctx) => {
    ctx.reply(`Вы ввели следующий id: ${ctx.message?.text}`);
});
bot.command("quit", (ctx) => {
    ctx.telegram.leaveChat(ctx.message.chat.id);
    ctx.leaveChat();
});
// bot.start((ctx) => {
//   ctx.reply("Welcome to my Telegram bot! Send /help to see available commands.");
// });
// bot.help((ctx) => {
//   ctx.reply("Here are some available commands:\n/start - Start the bot\n/help - Show this help message");
// });
// bot.command("keyboard", (ctx) => {
//     ctx.reply("Keyboard", Markup.inlineKeyboard([Markup.button.callback("First option", "first"), Markup.button.callback("Second option", "second")]));
//   });
// bot.on("text", (ctx) => {
//   ctx.reply(`You said: ${ctx.message?.text}`);
// });
// bot.on("text", (ctx) => {
//     ctx.reply("You choose the " + (ctx.message.text === "first" ? "First" : "Second") + " Option!");
// });
bot.launch();
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
//# sourceMappingURL=bot.js.map