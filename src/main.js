const Discord = require("discord.js");
const chalk = require("chalk");
const fs = require("fs")
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_MESSAGES] });
require("dotenv").config();

const prefix = "!";
client.commands = new Discord.Collection();

client.on("ready", ()=> {
    console.log(chalk.green(client.user.username+" is Online!"));

    var Commands = fs.readdirSync(`${process.cwd()}/src/Commands/`).filter(file => file.endsWith('.js'));
    for(const file of Commands) {
        try {
            var command = require(`${process.cwd()}/src/Commands/${file}`);
            client.commands.set(command.name.toLowerCase(), command);
        } catch(err) {
            console.error(err)
        } 
    }   
});

client.on("messageCreate", async(message) => {
    if(message.channel.id === "959135271054630963"){
        if(message.webhookID || !message.content || message.author.bot || message.channel.type === "dm") return;
        if(!message.content.startsWith(prefix)) return
        const args = message.content.slice(prefix.length).split(/ +/);
        const sCommand = args.shift().toLowerCase()
        let command;
        if(client.commands.has(sCommand)){
          command = client.commands.get(sCommand);
        }
        if(command){
            command.run(client, message, args);
        } else {
            message.channel.send("I don't have something like that.");
        }
    }
});

client.login(process.env.TOKEN);