import { ICommand } from "wokcommands";
import { Client, MessageEmbed } from 'discord.js'
import Levels from 'discord-xp'

export default {
    category: 'Levelling',
    description: 'Get the leaderboard for the server',
    cooldown: '10s',
    slash: 'both',
    testOnly: true,
    callback: async ({ client, interaction, message, args, guild }) => {
        const lead = await Levels.fetchLeaderboard(interaction.guild.id, 5);
        if (lead.length < 1) return interaction.reply("No leaderboard found");
        const led = await Levels.computeLeaderboard(client, lead, true);
        const lb = led.map(
          (e) =>
            `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${
              e.level
            }\nXP: ${e.xp.toLocaleString()}`
        );

        const embed = new MessageEmbed()
        .setTitle('Leaderboard for this guild')
        .setDescription(`${lb.join("\n")}`)
        .setColor('RANDOM')
        .setAuthor({name: `${guild.name}`, iconURL: 'https://cdn.discordapp.com/emojis/859424401971609600.webp?size=96&quality=lossless'})

        return interaction.reply({embeds: [embed]});
    }
} as ICommand