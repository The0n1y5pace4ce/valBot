import { GuildMember, MessageEmbed, User } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Moderation',
    description: 'Ban a user',
    permissions: ['KICK_MEMBERS'],
    requireRoles: true,
    minArgs: 2,
    maxArgs: 2,
    expectedArgs: '<user> <reason>',
    expectedArgsTypes: ['USER', 'STRING'],
    aliases: ['boot', 'remove'],
    guildOnly: true,
    cooldown: '10s',
    testOnly: true,
    slash: 'both',
    callback: ({ message, interaction, args, member: staff }) => {
        const user = message ? message.mentions.members.first() : interaction.options.getMember('user') as GuildMember
        if(!user) {
            return 'Please mention a user to kick'
        }
        if(!user.kickable) {
            return 'User is not kickable'
        }
        args.shift()
        const reason = args.join(' ')

        const embed = new MessageEmbed()
        .setTitle('User kicked')
        .setDescription(`${user} was banned by ${staff}\nReason: ${reason}`)

        user.kick(reason)

        return embed

    }
} as ICommand