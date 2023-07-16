// import Discord bot token from .env file
const TOKEN = require("dotenv").config();

// import discord.js module
const {Client,GatewayIntentBits} = require("discord.js");

// import openai module, key, new config
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({apiKey: process.env.OPENAI_API_KEY,});
const openai = new OpenAIApi(configuration);

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

// function returns AI response every time text is sent to server
client.on("messageCreate", async function (message) {

// ignore input from the bot itself
        if (message.author.bot) return;

//  must include gpt to trigger a response
        else if (message.content.toLowerCase().includes("kanye")) {
                        let response = await fetch("https://api.kanye.rest/");
                        let data = await response.json();
                        message.reply(`${data.quote}`)
                      }
});

// use token from env file to log in
client.login(process.env.TOKEN);
