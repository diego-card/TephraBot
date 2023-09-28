const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

// inside a command, event listener, etc.
const embedMessage = new EmbedBuilder()
	.setTitle('Resumo das regras.')
	.setURL('https://drive.google.com/file/d/1qN7SZZ3gPccXDqfkB9gnXFZpijQruUhW/view?usp=sharing')
	.setDescription('Resumo das regras, contendo as fichas de personagem e de bando. Também com facções, distritos, ilhas, itens etc. originais.')
	.setFooter({ text: 'Por serem as regras originais, conteúdo descrito pode ou não pode ser usado durante a campanha.' });

module.exports = {
	data: new SlashCommandBuilder()
		.setName('resumoregras')
		.setDescription('Kit em português com resumo de regras.'),
	async execute(interaction) {
		await interaction.reply({ embeds: [embedMessage] });
	},
};