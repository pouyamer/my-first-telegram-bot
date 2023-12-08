"use strict"

const TelegramBot = require("node-telegram-bot-api")
const dotenv = require("dotenv")

// importing components
const btnShowUptime = require("./components/Buttons/btnShowUptime")
const btnShutDownBot = require("./components/Buttons/btnShutDownBot")

// importing util
const {
  getHhmmssFormat,
  toTwoDigitFormat,
  getOperatingSystemName
} = require("./util")

dotenv.config()

const token = process.env.TOKEN
const bot = new TelegramBot(token, { polling: true })
const adminID = process.env.ADMIN_ID

const time24Format = () => {
  const date = new Date()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()

  return `${toTwoDigitFormat(hours)}:${toTwoDigitFormat(
    minutes
  )}:${toTwoDigitFormat(seconds)}`
}
const sendUptimeMessage = msg => {
  const chatId = msg.chat.id
  bot.sendMessage(chatId, "Uptime: ".concat(getHhmmssFormat(uptime)), {
    parse_mode: "HTML"
  })
}

const sendTerminationMessage = processCode => {
  bot.sendMessage(
    adminID,
    "Status: \u274C Offline\nTime: ".concat(
      time24Format(),
      `\nProcess terminated with code: ${processCode}`
    )
  )
  setTimeout(() => {
    process.exit(processCode)
  }, 100)
}

const adminBotOnlineMessage = "Status: \u2705 Online\nTime: "
  .concat(time24Format(), "\n(Platform: <b>")
  .concat(getOperatingSystemName(process.platform), "</b>) ")

const showAllCommandsAutoComplete = () => {
  bot.setMyCommands([
    {
      command: "uptime",
      description: "Show bot uptime"
    },
    {
      command: "shutdown",
      description: "Shutdown bot"
    },
    {
      command: "start",
      description: "Start bot"
    }
  ])
}

// ===== BOT STARTS =====

showAllCommandsAutoComplete()

let uptime = 0
setInterval(() => {
  uptime++
}, 1000)

bot.sendMessage(adminID, adminBotOnlineMessage, {
  parse_mode: "HTML",
  reply_to_message_id: 1,
  reply_markup: {
    // it add rows
    inline_keyboard: [[btnShowUptime], [btnShutDownBot]]
  }
})

bot.onText(/\/uptime/, function (msg) {
  sendUptimeMessage(msg)
})
// create uptime function
bot.on("callback_query", msg => {
  if (msg.data === "uptime") {
    sendUptimeMessage(msg.message)
  }

  //   else if (msg.data === "shutdown") {
  //     sendTerminationMessage(1)
  //   }
})
// if you terminate the bot using ctrl + c
process.on("SIGINT", () => {
  sendTerminationMessage(0)
})

// Note: to edit a message you should track message id
/* Example: 
let message_id
bot.sendMessage(
    user_id
)

.then(msg => {
    message_id = msg.message_id
})

*/

// set welcome message on /start
bot.onText(/\/start/, msg => {
  const welcomeMessage =
    "Welcome to my Telegram Bot! How can I assist you today?"
  bot.sendMessage(msg.chat.id, welcomeMessage)

  console.log(
    `Said hello to ${msg.chat.id}, ${msg.chat?.first_name} ${
      msg.chat?.last_name || ""
    }(@${msg.chat.username})`
  )
})

// console log whatever message you send
bot.on("message", msg => {
  console.log(msg)
})
