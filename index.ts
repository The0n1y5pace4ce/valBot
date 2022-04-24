import DiscordJS, { Intents} from 'discord.js'
import WOKCommands from 'wokcommands'
import mongoose from 'mongoose'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()


const client = new DiscordJS.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS
  ],
})

client.on('ready', async () => {
  mongoose.connect(process.env.MONGO_URI)

  new WOKCommands(client, {
    commandsDir: path.join(__dirname, 'commands'),
    featuresDir: path.join(__dirname, 'features'),
    messagesPath: path.join(__dirname, 'messages.json'),
    typeScript: true,
    testServers: ['935088278271578132'],
    ignoreBots: true,
    botOwners: ['656306365534437386'],
    mongoUri: process.env.MONGO_URI,
    
  })
  .setDefaultPrefix('?')
  .setCategorySettings([
    {
      name: 'Testing',
      emoji: '🔶',
      hidden: true
    },
    {
      name: 'Utility',
      emoji: '🛠'
    },
    {
      name: 'Moderation',
      emoji: '<:moderation:957567782197788722>'
    },
    {
      name: 'Configuration',
      emoji: '<:configuration:957567767228346408>'
    },
    {
      name: 'Levelling',
      emoji: '⏫'
    },
    {
      name: 'Info',
      emoji: 'ℹ'
    },
    {
      name: 'Fun',
      emoji: '😊'
    }

  ])


})

client.login(process.env.TOKEN)