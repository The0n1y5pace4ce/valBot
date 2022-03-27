import { ICommand } from "wokcommands";

export default {
    category: 'Testing',
    description: 'add 2 numbers',
    options: [
        {
            name: 'num1',
            description: 'First number',
            required: true,
            type: 'NUMBER'
        },
        {
            name: 'num2',
            description: 'The second number',
            required: true,
            type: 'NUMBER'
        }
    ],

    slash: true,
    testOnly: true,

    callback: ({ interaction, instance }) => {
        const num1 = interaction.options.getNumber('num1') || 0
        const num2 = interaction.options.getNumber('num2') || 0
        const { guild } = interaction
        interaction.reply(instance.messageHandler.get(guild, 'ADD', {
          TEST: `${num1 + num2}`
        }))
    
    }
} as ICommand