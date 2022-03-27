import { ICommand } from "wokcommands";
import Levels from 'discord-xp'
import { User, MessageAttachment } from "discord.js";
import { Canvas, createCanvas, loadImage } from 'canvas'

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
    callback: async ({ client, interaction, message, member, text }) => {
        const applyText = (canvas: Canvas , text: string) => {
            const context = canvas.getContext('2d');
            let fontSize = 70;
        
            do {
                context.font = `${fontSize -= 10}px sans-serif`;
            } while (context.measureText(text).width > canvas.width - 300);
        
            return context.font;
        };
        const user = interaction.options.getUser("user");
        const levels = await Levels.fetch(user.id, interaction.guildId);
        if (!levels) {
          return interaction.reply("User has no xp.");
        }
        
        const canvas = createCanvas(700, 250);
		const context = canvas.getContext('2d');

		const background = await loadImage('./images/back.jpg');
		context.drawImage(background, 0, 0, canvas.width, canvas.height);

		context.strokeStyle = '#0099ff';
		context.strokeRect(0, 0, canvas.width, canvas.height);

		context.font = '28px sans-serif';
		context.fillStyle = '#ffffff';
		context.fillText(`XP: ${levels.xp}`, canvas.width / 2.5, canvas.height / 3.5);

        context.font = '28px sans-serif';
        context.fillStyle = '#ffffff';
        context.fillText(`Level: ${levels.level}`, canvas.width / 2.5, canvas.height / 2.5)

		context.font = applyText(canvas, `${user.username}`);
		context.fillStyle = '#ffffff';
		context.fillText(`${user.username}`, canvas.width / 2.2, canvas.height / 1.2);

		context.beginPath();
		context.arc(125, 125, 100, 0, Math.PI * 2, true);
		context.closePath();
		context.clip();

		const avatar = await loadImage(user.displayAvatarURL({ format: 'jpg' }));
		context.drawImage(avatar, 25, 25, 200, 200);

		const attachment = new MessageAttachment(canvas.toBuffer(), 'profile-image.png');

		interaction.reply({ files: [attachment] });
    }
} as ICommand