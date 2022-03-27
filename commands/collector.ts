import { Message, MessageReaction, User } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Testing',
    description: 'Testing',
    callback: ({ message, channel }) => {
        message.reply({content: 'Please confirm this action'})
        message.react('👍')

        // const filter = (m: Message) => {
        //     return m.author.id === message.author.id
        // }

        const filter = (reaction: MessageReaction, user: User) => {
            return user.id === message.author.id
        }
        
        const collector = message.createReactionCollector({
            filter,
            max: 1,
            time: 1000 * 5,
        })

        collector.on('collect', reaction => {
            console.log(reaction.emoji)
        })

        collector.on('end', collected => {
            if(collected.size === 0) {
                message.reply({content: 'You did not react in time'})
                return
            }

            let text = 'Collected:\n\n'

            collected.forEach((message) => {
                text += `${message.emoji.name}\n`
            })

            message.reply(text)
        })
    }
} as ICommand