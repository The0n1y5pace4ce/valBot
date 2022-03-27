import { Client, MessageEmbed, TextChannel } from "discord.js";

export default (client: Client) => {
    client.on('guildCreate', async (interaction) => {
        const guild = interaction;

        const embed = new MessageEmbed()
        .setColor("GREEN")
        .setTitle("The bot joined a new server")
        .setDescription(`${client.user.tag} was added to a new server.`)
        .setFields(
            {name: "Guild Name:", value: `${guild.name}`, inline: true},
            {name: "Guild Members:", value: `${guild.memberCount}`, inline: true},
            {name: "Total Guilds", value: `${client.guilds.cache.size}`},
            {name: "Total Users", value: `${client.users.cache.size}`}
        )
        .setTimestamp();

        const logC = client.channels.cache.get("936829760330403901") as TextChannel

        logC.send({ embeds: [embed] })

        const channel = guild.channels.cache.find(
            (c) =>
            c.type === "GUILD_TEXT" &&
            c.permissionsFor(guild.me).has("SEND_MESSAGES")
        ) as TextChannel

        await channel.send({ content: `Hi! Thanks for Inviting me!` });
    })
}