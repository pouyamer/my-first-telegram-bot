import TelegramBot from "node-telegram-bot-api"
import dotenv from "dotenv"

dotenv.config()

const token = process.env.TOKEN
const bot = new TelegramBot(token, { polling: true })
const adminID = process.env.ADMIN_ID

// when bot starts sends message to the admin
bot.sendMessage(adminID, "Hello, I'm running on <b>Node.js</b>", {
  parse_mode: "HTML"
})
