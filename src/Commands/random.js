const Discord = require("discord.js");
const ezrandom = require("ezrandom"); //my module 😀

module.exports = {
    name: "random",
    run: async(client, message, args) => { //, {owner: "", image: ""}
        if(!args[0]) return message.channel.send("**cell** or **creation**");
        if(args[0] === "creation"){
        const creations = [
            {owner: "877279253987754024", image: "https://cdn.discordapp.com/attachments/958070041616736266/958443456450150460/unknown.png"},
            {owner: "877279253987754024", image: "https://cdn.discordapp.com/attachments/958070041616736266/958443765973024838/unknown.png"},
            {owner: "877279253987754024", image: "https://cdn.discordapp.com/attachments/958070041616736266/958443910282227803/unknown.png"},
            {owner: "877279253987754024", image: "https://cdn.discordapp.com/attachments/958070041616736266/958445675920621598/unknown.png"},
            {owner: "423870663942602764", image: "https://cdn.discordapp.com/attachments/958070041616736266/958445917374148638/unknown.png"},
            {owner: "877279253987754024", image: "https://cdn.discordapp.com/attachments/958070041616736266/958446184505155594/unknown.png"},
            {owner: "877279253987754024", image: "https://cdn.discordapp.com/attachments/958070041616736266/958447001392017438/love_zvkVgOAKIA.gif"},
            {owner: "877279253987754024", image: "https://cdn.discordapp.com/attachments/958070041616736266/958447377948213339/unknown.png"},
            {owner: "877279253987754024", image: "https://cdn.discordapp.com/attachments/958070041616736266/958447508584013834/unknown.png"},
            {owner: "534806202698432514", image: "https://cdn.discordapp.com/attachments/958070041616736266/958451035351945276/unknown.png"},
            {owner: "542653915099824138", image: "https://cdn.discordapp.com/attachments/958070041616736266/958453601271947264/unknown.png"},
            {owner: "847856181300559882", image: "https://cdn.discordapp.com/attachments/958070041616736266/958660203157545030/unknown.png"},
            {owner: "847856181300559882", image: "https://cdn.discordapp.com/attachments/958070041616736266/958742554571071588/unknown.png"},
            {owner: "877279253987754024", image: "https://cdn.discordapp.com/attachments/958070041616736266/958908968770617404/unknown.png"},
            {owner: "307553207067082752", image: "https://cdn.discordapp.com/attachments/958070041616736266/959529577846309014/unknown.png"},
            {owner: "307553207067082752", image: "https://cdn.discordapp.com/attachments/958070041616736266/959532919808991262/unknown.png"},
            {owner: "542653915099824138", image: "https://cdn.discordapp.com/attachments/958070041616736266/959806920754102292/unknown.png"}

        ];
        var chosen = await ezrandom.selection(creations, 1)[0];
        let profile = await message.guild.members.fetch(chosen.owner);
        const rC = new Discord.MessageEmbed()
            .setTitle("Random Creation")
            .setDescription(`**Author:** <@${chosen.owner}>`)
            .setThumbnail(`https://cdn.discordapp.com/avatars/${chosen.owner}/${profile.user.avatar}`) // I TRIED EVERYTHING AND THIS WORKED client.guilds.cache.get("").members.cache.get("") only worked on my id
            .setColor((profile.user.accentColor === undefined ? "RANDOM" : profile.user.accentColor))
            .setImage(chosen.image)
            .setTimestamp();
        message.channel.send({embeds: [rC]});
    } else if (args[0] === "cell"){
        message.channel.send("not ready yet!");
    } else {
        return message.channel.send("Please Choose **cell** or **creation**");
    }
    } 
}