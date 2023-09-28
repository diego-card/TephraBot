const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const embedMessage = new EmbedBuilder()
	.setColor('#62c401')
	.setTitle('Saldo Atual 💰');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('saldo')
		.setDescription('Verifique quantas moedas você tem.'),
	async execute(interaction, profileData) {

		interaction.reply({ embeds: [embedMessage.setDescription(`Você possui 🪙**${profileData.coins}** moedas.`)] });
	},
};