import { ICommand } from "wokcommands";
import { MessageEmbed } from "discord.js";
import Levels from 'discord-xp'

export default {
    category: 'Levelling',
    description: 'Add/remove XP and levels from a user',
    permissions: ['ADMINISTRATOR'],
    testOnly: true,
    slash: true,
    options: [
        {
            name: 'target',
            description: 'User you wish to add/remove XP from',
            type: 'USER',
            required: true
        },
        {
            name: 'options',
            description: 'Choose to add or remove XP from a user',
            type: 'STRING',
            required: true,
            choices: [
                {
                    name: 'add',
                    value: 'add'
                },
                {
                    name: 'remove',
                    value: 'remove'
                },
                {
                    name: 'leveladd',
                    value: 'leveladd'
                },
                {
                    name: 'levelremove',
                    value: 'levelremove'
                }
            ]
        },
        {
            name: 'amount',
            description: 'Amount of XP you wish to add/remove from a user',
            type: 'NUMBER',
            required: true,
        }
    ],
    callback: ({interaction, guild}) => {
        const choices = interaction.options.getString('options')
        const target = interaction.options.getUser('target')
        const amount = interaction.options.getNumber('amount')

        switch(choices) {
            case 'add' : {
                Levels.appendXp(target.id, interaction.guildId, amount)
                const embed = new MessageEmbed().setTitle(`Added ${amount} XP to ${target.tag}`).setColor('DARK_BUT_NOT_BLACK')

                interaction.reply({embeds: [embed]})
            break;
            }
            case 'remove' : {
                Levels.subtractXp(target.id, interaction.guild.id, amount)
                const embed = new MessageEmbed().setTitle(`Added ${amount} XP to ${target.tag}`).setColor('DARK_BUT_NOT_BLACK')

                interaction.reply({embeds: [embed]})
            break;
            }
            case 'leveladd' : {
                Levels.appendLevel(target.id, interaction.guild.id, amount)
                const embed = new MessageEmbed().setTitle(`Added ${amount} Levels to ${target.tag}`).setColor('DARK_BUT_NOT_BLACK')

                interaction.reply({embeds: [embed]})
            break;
            }
            case 'levelremove' : {
                Levels.subtractLevel(target.id, interaction.guild.id, amount)
                const embed = new MessageEmbed().setTitle(`Removed ${amount} Levels from ${target.tag}`).setColor('DARK_BUT_NOT_BLACK')

                interaction.reply({embeds: [embed]})
            break;
            }
        }
    }
} as ICommand