import { ICommand } from "wokcommands";
import { Canvacord } from "canvacord";
import { MessageAttachment } from "discord.js";

export default {
    category: 'Image',
    description: 'Customizable youtube comment',
    slash: true,
    testOnly: true,
    options: [
        {
            name: 'username',
            description: 'Username of the comment',
            type: 'STRING',
            required: true,
        },
        {
            name: 'content',
            description: 'Content of the comment',
            type: 'STRING',
            required: true,
        },
        {
            name: 'dark',
            description: 'Dark mode on/off',
            type: 'BOOLEAN',
            required: true,
        }
    ],
    callback: async ({interaction}) => {
        const username = interaction.options.getString('username')
        const content = interaction.options.getString('content')
        const dark = interaction.options.getBoolean('dark')

        const image = await Canvacord.youtube({username: username, content: content, avatar: interaction.user.displayAvatarURL({ format: 'png'}), dark: dark})

        const attachment = new MessageAttachment(image, 'youtube.gif')

        interaction.reply({files: [attachment]})
    }
} as ICommand