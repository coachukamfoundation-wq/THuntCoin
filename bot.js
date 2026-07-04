require("dotenv").config();

const TelegramBot = require("node-telegram-bot-api");

const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, {

    polling: true

});

// ===========================
// Start Command
// ===========================

bot.onText(/\/start/, (msg) => {

    bot.sendMessage(

        msg.chat.id,

        "👋 Welcome to THuntCoin!\n\nClick the button below to open the Mini App.",

        {

            reply_markup: {

                inline_keyboard: [[

                    {

                        text: "🚀 Open THuntCoin",

                        web_app: {

                            url: process.env.APP_URL

                        }

                    }

                ]]

            }

        }

    );

});

// ===========================
// Bot Started
// ===========================

console.log("🤖 THuntCoin Bot is running...");
