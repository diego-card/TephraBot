const { SlashCommandBuilder } = require('discord.js');
const userModel = require('../models/profileSchema');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('daily')
		.setDescription('Receba um pequeno valor de moedas por dia.'),
	async execute(interaction) {
		// Valor de moeda que pode receber
		const randomNumber = Math.floor(Math.random() * 10 + 1);

		// Intervalo de 24h
		function intervalChecker(lastTime) {
			const currentTime = new Date();
			const timeDiff = currentTime - lastTime;
			const oneDay = 24 * 60 * 60 * 1000;
			if (timeDiff >= oneDay) {
				return true;
			} else {
				return false;
			}
		}

		const user = await userModel.findOne({ userID: interaction.user.id });
		// Checking if user can use daily, then updating time in model.
		// If not, show the time message.
		if (intervalChecker(user.lastCoinDate)) {
			await userModel.findOneAndUpdate(
				{
					userID: interaction.user.id,
				},
				{
					$inc: {
						coins: randomNumber,
					},
					$set: {
						lastCoinDate: new Date(),
					},
				},
			);
			return interaction.reply(`${interaction.user.toString()}, você conseguiu achar **${randomNumber}** moedas no chão.`);
		} else {
			// Formatting time so it can display like: 23:58:45
			const remainingTime = (24 - (new Date() - user.lastCoinDate) / (60 * 60 * 1000));
			const remainingHours = Math.floor(remainingTime);
			const remainingMinutes = Math.floor((remainingTime - remainingHours) * 60);
			const remainingSeconds = Math.floor(((remainingTime - remainingHours) * 60 - remainingMinutes) * 60);

			const formattedRemainingTime = `${remainingHours}:${remainingMinutes}:${remainingSeconds}`;
			return interaction.reply(`${interaction.user.toString()}, você precisa esperar **${formattedRemainingTime}** para conseguir mais moedas. `);
		}
	},
};