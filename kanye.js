// import Discord bot token from .env file
const TOKEN = require("dotenv").config();

// import discord.js module
const {Client,GatewayIntentBits} = require("discord.js");

// configure Discord bot permissions(intents)
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildScheduledEvents,
  ],
});

// console log bot startup
client.on("ready", () => {
  console.log(`I'M ALIVE!! LOGGED IN AS ${client.user.tag}`);
});

// function returns an AI response when text is sent to the server
client.on("messageCreate", async function (message) {

// ignore input from the bot itself
        if (message.author.bot) return;

//  must include kanye to trigger a response
        else if (message.content.toLowerCase().includes("kanye")) {
                        let response = await fetch("https://api.kanye.rest/");
                        let data = await response.json();
                        message.reply(`${data.quote}`)
                      }
});

// use token from env file to log in
client.login(process.env.TOKEN);
