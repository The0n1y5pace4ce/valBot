import { MessageEmbed, TextChannel } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Utility',
    description: 'Make a suggestion for the bot',
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: '<suggestion>',
    expectedArgsTypes: ['STRING'],
    cooldown: '10m',
    slash: true,
    callback: ({ message, interaction, args, client, guild }) => {
        const suggestion = args.join()
        const suggestChannel = client.channels.cache.get("936829760330403901") as TextChannel
        const embed = new MessageEmbed()
        .setTitle(`New Suggestion from ${guild.name}`)
        .setDescription(`Suggestion: ${suggestion}`)

        interaction.reply({content: 'Suggestion submitted', ephemeral: true})
        suggestChannel.send({embeds: [embed]})
    }
} as ICommand