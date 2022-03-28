import { ICommand } from "wokcommands";
import Levels from 'discord-xp'
import { User, MessageAttachment } from "discord.js";
import { Canvas, createCanvas, loadImage } from 'canvas'
import { Canvacord, Rank } from "canvacord";

export default {
    category: 'Levelling',
    description: 'Get the rank of a user',
    cooldown: '1m',
    maxArgs: 1,
    minArgs: 1,
    expectedArgs: '<user>',
    expectedArgsTypes: ['USER'],
    testOnly: true,
    slash: true,
    options: [
        {
            name: 'user',
            description: 'User you want to get the rank for',
            type: 'USER',
            required: true,
        }
    ],
    callback: async ({ interaction, client, message }) => {
        const target = interaction.options.getUser('user')
        const user = await Levels.fetch(target.id, interaction.guild.id, true);
        if(!user) {
            return interaction.reply({content: 'User has no XP', ephemeral: true})
        }

        await interaction.deferReply()

        const rank = new Rank()
        .setAvatar(target.displayAvatarURL({format: 'png'}))
        .setCurrentXP(user.xp)
        .setCustomStatusColor('BLUE')
        .setProgressBar('GREEN')
        .setProgressBarTrack('BLURPLE')
        .setLevel(user.level)
        .setStatus("dnd", true, 4)
        .setDiscriminator(target.discriminator)
        .setUsername(target.username)

        rank.build({fontX: 'arial'})
            .then(data => {
        const attachment = new MessageAttachment(data, "RankCard.png");
        interaction.editReply({ files: [attachment]})
        })
    } 
} as ICommand