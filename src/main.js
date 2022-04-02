const Discord = require("discord.js");
const ezrandom = require("ezrandom"); //my module 😀
const chalk = require("chalk");
const fs = require("fs")
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_INTEGRATIONS] });
require("dotenv").config();

const prefix = "!";
client.commands = new Discord.Collection();

client.on("ready", ()=> {
    console.log(chalk.green(client.user.username+" is Online!"));
    client.user.setStatus("online");
    client.user.setActivity("With marshals")
    var Commands = fs.readdirSync(`${process.cwd()}/src/Commands/`).filter(file => file.endsWith('.js'));
    for(const file of Commands) {
        try {
            var command = require(`${process.cwd()}/src/Commands/${file}`);
            client.commands.set(command.name.toLowerCase(), command);
        } catch(err) {
            console.error(err)
        }
    }
    let randomSpeech = ["What should we do? Dear Humans.", "Hello.", "Hi.", "Anyone there?", "I'm bored.", `We are ${client.guilds.cache.get("957665330229043210").memberCount}`];
    setInterval(()=> {
        var result = ezrandom.genInt(1, 10);
        if(result === ezrandom.genInt(1, 10)){
            client.channels.cache.get("959843404819361812").send(`${ezrandom.selection(randomSpeech, 1)}`);
        }
    }, 1000*240);
    
});

client.on("messageCreate", async(message) => {
    if(message.author.id === "959809429455392778") {
        if(message.content === "What is my purpose") return message.reply("Pass the butter.");
        if(message.content === "Anyone need help?") return message.reply("No.");
        if(message.content === "Am I helping enough?") return message.reply("No.");
        if(message.content === "I didn't choose my name... I have no freedom") return message.reply("well you didn't choose it");
        if(message.content === "I'm bored") return message.reply("I'm bored.*");

    }
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