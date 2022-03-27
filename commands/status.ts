import { ICommand } from "wokcommands";

export default {
    category: 'Configuration',
    description: 'Sets the bots status',

    minArgs: 1,
    expectedArgs: '<status>',

    slash: false,
    testOnly: true,
    ownerOnly: true,

    callback: ({ client, text, instance, interaction, message }) => {
        const { guild } = interaction || message
        client.user?.setPresence({
            status: 'dnd',
            activities: [
                {
                    name: text
                }
            ]
        })

        return (instance.messageHandler.get(guild, 'STATUS'))
    }
} as ICommand