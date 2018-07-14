const Discord = require('discord.js');

const client = new Discord.Client();

var prefix = "/";

client.login(process.env.TOKEN)

client.on("ready", () => {
    console.log("A votre service My Lord");
    client.user.setActivity("servir son maître");
});
