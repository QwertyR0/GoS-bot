const Discord = require("discord.js");

module.exports = {
    name: "cell",
    run: async(client, message, args) => {
        function componentToHex(c) {
            var hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        }
        function rgbHex(r, g, b) {
            return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
        }
        var invalid = new Discord.MessageEmbed()
            .setTitle("Error")
            .setDescription("Invalid Code!")
            .setColor("RED")
            .setTimestamp();
        if(!args[0].startsWith("GoSC1;")) return message.channel.send({embeds: [invalid]});
        let code = args[0].replace("GoSC1;", "").split(":")
        if(!code[1].startsWith("D")) return message.channel.send({embeds: [invalid]});
        let rgb = code[0].split(",");
        let hex = rgbHex(rgb[0], rgb[1], rgb[2])
        let deathR = code[1].split("R")[0].replace("D", "");
        let regrR = code[1].split("R")[1].replace("R", "");

        let name = code[2]
        // i had no choice while making this if you have more eficient way please make a pull request
        let found = false;
        let i = 0;
        while(found === false){
            if(isNaN(regrR[i])){
                found = true;
            }
            i++;
        }
        function spplit(value, index){
            return value.substring(0, index) + ";" + value.substring(index);
        }
        let regR = spplit(code[1].split("R")[1].replace("R", ""), i - 1).split(";")[0];
        let params = spplit(code[1].split("R")[1].replace("R", ""), i - 1).split(";")[1];
        let neighbors;
        if (params === "n"){
            neighbors = "Adjacent & Diagonal"
        } else if(params === "a"){
            neighbors = "Adjacent"
        } else if(params === "d"){
            neighbors = "Diagonal"
        } else {
            return message.channel.send({embeds: [invalid]});
        }
        var cell = new Discord.MessageEmbed()
            .setTitle(name)
            .setDescription("The Cell:")
            .addFields([
                {
                    name: "Death",
                    value: `${deathR}`
                },
                {
                    name: "Regeneration",
                    value: `${regR}`
                },
                {
                    name: "Neighbors",
                    value: `${neighbors}`
                },
            ])
            .setColor(`${hex}`)
            .setTimestamp();
        message.channel.send({ embeds: [cell] });

    }
}