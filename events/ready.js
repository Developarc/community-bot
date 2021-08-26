const { Client } = require("discord.js");

/**
 * @param {Client} client
 */

module.exports = async (client) => {
  console.log(`${client.user.tag} is online!`);
  client.user.setStatus("dnd");
  setInterval(() => {
    client.user.setActivity(`${client.users.cache.size} users in Developarc`, {
      type: "WATCHING",
    });
  }, 5000);
};
