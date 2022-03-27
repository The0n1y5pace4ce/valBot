import { MessageEmbed, User } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Utility',
    description: 'Get a users avatar',
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: '<user>',
    expectedArgsTypes: ['USER'],
    aliases: ['pfp', 'icon'],
    slash: 'both',
    testOnly: true,
    callback: ({ message, interaction }) => {
        const Target = message ? message.mentions.users.first() : interaction.options.getUser('user') as User

        const avatarEmbed = new MessageEmbed()
        .setTitle(`${Target.tag}'s Avatar`)
        .setColor('RANDOM')
        .setImage(`${Target.displayAvatarURL({ dynamic: true })}?size=256`)

        return avatarEmbed
    }
} as ICommand