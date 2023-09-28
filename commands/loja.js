const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

// Buttons
const row = new ActionRowBuilder()
	.addComponents(
		// Segredo Arcano
		new ButtonBuilder()
			.setCustomId('75')
			.setLabel('1')
			.setStyle(ButtonStyle.Primary),
		// Jogador Consistente
		new ButtonBuilder()
			.setCustomId('20')
			.setLabel('2')
			.setStyle(ButtonStyle.Primary),
		// Apostador de Elite
		new ButtonBuilder()
			.setCustomId('40')
			.setLabel('3')
			.setStyle(ButtonStyle.Primary),
		// Mestre das Apostas
		new ButtonBuilder()
			.setCustomId('70')
			.setLabel('4')
			.setStyle(ButtonStyle.Primary),
	);

// Embed
const embedMessage = new EmbedBuilder()
	.setTitle('Loja 💰')
	.setColor('#6495ed')
	.setDescription('1 - Segredo Arcano - **$75**\n2 - *Título:* Jogador Consistente - **$20**\n3 - *Título:* Apostador de Elite - **$40**\n4 - *Título:* Mestre das Apostas - **$70**');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('loja')
		.setDescription('Compre alguma coisa na loja.'),
	async execute(interaction) {

		// interaction.member.roles.add('1072956799285743709');
		/* if (interaction.isButton()) {
			console.log('Oi');
		}*/

		interaction.reply({
			embeds: [embedMessage],
			components: [row],
		});
	},
};
// COloca essa porra lá