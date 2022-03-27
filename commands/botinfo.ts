import { ICommand } from "wokcommands";
import ms from 'pretty-ms'
import moment from "moment";
import os from 'os'
import { MessageEmbed, version } from 'discord.js'

export default {
    category: 'Utility',
    description: 'Get the bots info',
    aliases: ['status'],
    slash: 'both',
    testOnly: true,
    callback: ({ client, interaction, message }) => {
        let model = os.cpus()[0].model;
        let cores = os.cpus().length;
        let platform = os.platform();
    
        let Response = new MessageEmbed()
        .setTitle("Jebediah Kermans Information")
        .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({format: 'png'})})
        .setDescription("Below is the bot\'s information")
        .setTimestamp()
        .setColor("AQUA")
        .addField("> Statistics", `\`\`\`js\n Total Guilds: ${client.guilds.cache.size}\n Total Channels: ${client.channels.cache.size}\n Total Emojis: ${client.emojis.cache.size}\n Total Shards : ${client.guilds.cache.size} \`\`\`` )
        .addField("> Other", `\`\`\`js\n Node: ${process.version}\n Platform: ${process.platform}\n Arch: ${process.arch}\n Discord.js: ${version}\n Developer: TheSpaceAce#2107\n ID: 656306365534437386\n Bot Created: ${moment.utc(client.user.createdAt).format("dddd, MMMM Do YYYY")}\n Username :  ${client.user.username}\n Discriminator: ${client.user.discriminator}\`\`\``)
        .addField("> Hosting", `\`\`\`js\n Websocket Ping: ${client.ws.ping}ms\n Uptime: ${ms(client.uptime)}\n Host : Replit\n Monitor : Uptime Robot\n Memory : ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB RSS ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB Heap\n Cores : ${cores} \n CPU Model : ${model} \`\`\``)
        return Response
    }
    
} as ICommand