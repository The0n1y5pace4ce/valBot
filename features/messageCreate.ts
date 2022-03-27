import { Message, Client } from "discord.js";
import Levels from 'discord-xp'

export default (client: Client) => {
    client.on('messageCreate', async (message) => {
        if (!message.guild) return;
        if (message.author.bot) return;
      
        const randomAmountOfXp = Math.floor(Math.random() * 29) + 1;
        const hasLeveledUp = await Levels.appendXp(
          message.author.id,
          message.guild.id,
          randomAmountOfXp
        );
        if (hasLeveledUp) {
          const user = await Levels.fetch(message.author.id, message.guild.id);
          message.channel.send({
            content: `${message.author}, congratulations! You have leveled up to **${user.level}**.`,
          });
        }
    })
}

export const config = {
    dbName: 'LEVELLING',
    displayName: 'messageCreate for levelling system'
}