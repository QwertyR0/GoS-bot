const Discord = require("discord.js");

module.exports = {
    name: "download",
    run: (client, message, args) => {
        const download = new Discord.MessageEmbed()
            .setTitle("Download the Leak")
            .setDescription("We Only Have The Leaks rn\n<#958442350143754320>")
            .setThumbnail(message.guild.iconURL())
            .setImage("https://cdn.discordapp.com/attachments/958774565885075486/959745257149460540/t3est.png")
            .setTimestamp();
        message.channel.send({embeds: [download]});
    }
}