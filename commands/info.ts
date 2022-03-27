import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Info',
    description: 'Information on the bot',
    aliases: ['about', 'inf'],
    slash: 'both',
    callback: ({ message, interaction, client }) => {
        const embed = new MessageEmbed()
        .setTitle('Info for valBot')
        .addFields(
            { name: 'Creator', value: 'The creator of the bot is TheSpaceAce#2107'},
            { name: 'Emojis', value: 'Most emojis from the bot can be found [here](https://discord.gg/icons)'},
            { name: 'Packages used', value: 'Axios\nCanvas\ndiscord-xp\ndiscord.js\ndotenv\nmongoose\nms\nWOKCommands'},
            { name: 'Contributors', value: 'Currently, the only contributor is the owner, TheSpaceAce#2107. If you would wish to contribute, please dm TheSpaceAce#2107!'},
        )
        .setAuthor({name: 'valBot Info', iconURL: 'https://cdn.discordapp.com/emojis/859424400959602718.webp?size=96&quality=lossless'})
        .setColor('DARK_BUT_NOT_BLACK')
        .setFooter({text: 'If there are any concerns/questions about the bot, DM TheSpaceAce#2107', iconURL: `https://cdn.discordapp.com/emojis/859388129932214292.webp?size=96&quality=lossless`})
        .setTimestamp()

        return embed
    }
} as ICommand