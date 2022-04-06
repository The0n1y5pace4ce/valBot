import { ICommand } from "wokcommands";
import Levels from 'discord-xp'
import { MessageEmbed } from "discord.js";

export default {
    category: 'Levelling',
    description: 'Add XP to a user',
    permissions: ["ADMINISTRATOR"],
    slash: true,
    options:  [
        {
            name: 'user',
            description: 'User you want to add XP to',
            type: 'USER',
            required: true,
        },
        {
            name: 'amount',
            description: 'Amount of XP to change',
            type: 'NUMBER',
            required: true,
        }
    ],
    testOnly: true,
    callback: async ({ interaction, guild }) => {
        const User = interaction.options.getUser("user");
        const XPAmount = interaction.options.getNumber("amount");
        Levels.appendXp(User.id, interaction.guildId, XPAmount);
        const embed = new MessageEmbed().setTitle(`Removed ${XPAmount} XP from ${User.tag}`).setColor('DARK_GOLD')

        interaction.reply({
            embeds: [embed],
        })
    }
} as ICommand