const Discord = require("discord.js");
const fs = require("fs");
require("dotenv").config();

const client = new Discord.Client({
  intents: [
    "DIRECT_MESSAGES",
    "DIRECT_MESSAGE_REACTIONS",
    "DIRECT_MESSAGE_TYPING",
    "GUILDS",
    "GUILD_BANS",
    "GUILD_EMOJIS_AND_STICKERS",
    "GUILD_INTEGRATIONS",
    "GUILD_INVITES",
    "GUILD_MEMBERS",
    "GUILD_MESSAGES",
    "GUILD_MESSAGE_REACTIONS",
    "GUILD_MESSAGE_TYPING",
    "GUILD_PRESENCES",
    "GUILD_VOICE_STATES",
    "GUILD_WEBHOOKS",
  ],
  partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"],
});
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
cooldowns = new Discord.Collection();

fs.readdirSync(`./commands`).forEach((dir) => {
  const commands = fs
    .readdirSync(`./commands/${dir}/`)
    .filter((file) => file.endsWith(".js"));

  for (let file of commands) {
    let pull = require(`./commands/${dir}/${file}`);
    if (pull.config.name) {
      client.commands.set(pull.config.name, pull);
    } else {
      console.log(`Give ${file} a command name you monkey!`);
    }
    pull.config.aliases.forEach((alias) => {
      client.aliases.set(alias, pull.config.name);
    });
  }
});
fs.readdirSync(`./events`).forEach((file) => {
  const event = require(`./events/${file}`);
  let eventName = file.split(".")[0];
  client.on(eventName, event.bind(null, client));
});

client.login(process.env.token);
