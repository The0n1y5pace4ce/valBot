import { Interaction } from 'discord.js'
import { ICommand } from 'wokcommands'

export default {
  category: 'Testing',
  description: 'Ping command!',
  
  callback: ({ message, instance }) => {
    const { guild } = message
    
    return (instance.messageHandler.get(guild, 'PING'))

  },
} as ICommand