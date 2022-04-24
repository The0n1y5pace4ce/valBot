import { createTranscript } from "discord-html-transcripts";
import { MessageEmbed } from 'discord.js'
import { ICommand } from "wokcommands";

export default {
    category: 'Moderation',
    description: 'Saves the channel',
    permissions: ['MANAGE_MESSAGES'],
    testOnly: true,
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: '<channel>',
    expectedArgsTypes: ['CHANNEL'],
    slash: 'both',
    callback: async ({ channel, message, interaction }) => {
        const embed = new MessageEmbed()
        .setTitle (`Chat saved`)
        .setDescription (`Saved chat : ${channel}`)
        .setColor ("BLUE")

        const attachment = await createTranscript(channel, {
            limit: -1,
            returnBuffer: false,
            fileName: `${channel}.html`,
        });

        if(message) {
            return message.reply({embeds: [embed], files: [attachment]})
        }

        interaction.reply({embeds: [embed], files: [attachment]})
    }
} as ICommand