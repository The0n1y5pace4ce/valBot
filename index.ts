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
  // await mongoose.connect(process.env.MONGO_URI || '', {
  //   keepAlive: true,
  // })

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
      emoji: '🔶'
    },
    {
      name: 'Utility',
      emoji: '🛠'
    },
    {
      name: 'Moderation',
      emoji: '🔨'
    }
  ])


})

client.login(process.env.TOKEN)