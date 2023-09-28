const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const userModel = require('../models/profileSchema');
const partida = require('../testApostar');

const wait = require('node:timers/promises').setTimeout;

function payout(value) {
	// Valores secos dos odds. 6 = 0.6
	const positiveOdd = 1 + (value * 0.1);
	const negativeOdd = 1 / (1 - value * 0.1);

	if (value > 0) {
		// small random factor
		const randomBetween = (Math.random() * positiveOdd);
		return Math.round((positiveOdd + randomBetween) * 10) / 10;
	} else {
		// small random factor
		const randomBetween = (Math.random() * negativeOdd);
		return Math.round((1 + (2 * (negativeOdd + randomBetween))) * 10) / 10;
	}
}

// Algorítmo que detecta o RockPaperScissors de 5 do tatica.json
function rpsDoskvol(times1, times2) {
	const taticaObj1 = times1['tatica'];
	const taticaObj2 = times2['tatica'];

	if (taticaObj1.titulo === 'Força Bruta 💪') {
		if (taticaObj2.titulo === 'Assombração 👻' || taticaObj2.titulo === 'Precisão Pura 🎯') {
			taticaObj1.valor = 7;
		} else if (taticaObj2.titulo === 'Força Bruta 💪') {
			return 	taticaObj1.valor;
		} else {
			return 	taticaObj2.valor = 7;
		}
	} else if (taticaObj1.titulo === 'Enganação & Malandragem 🪤') {
		if (taticaObj2.titulo === 'Força Bruta 💪' || taticaObj2.titulo === 'Precisão Pura 🎯') {
			return taticaObj1.valor = 7;
		} else if (taticaObj2.titulo === 'Enganação & Malandragem 🪤') {
			return taticaObj1.valor;
		} else {
			return taticaObj2.valor = 7;
		}
	} else if (taticaObj1.titulo === 'Velocidade & Finta 💨') {
		if (taticaObj2.titulo === 'Força Bruta 💪' || taticaObj2.titulo === 'Enganação & Malandragem 🪤') {
			return taticaObj1.valor = 7;
		} else if (taticaObj2.titulo === 'Velocidade & Finta 💨') {
			return taticaObj1.valor;
		} else {
			return taticaObj2.valor = 7;
		}

	} else if (taticaObj1.titulo === 'Precisão Pura 🎯') {
		if (taticaObj2.titulo === 'Velocidade & Finta 💨' || taticaObj2.titulo === 'Assombração 👻') {
			return taticaObj1.valor = 7;
		} else if (taticaObj2.titulo === 'Precisão Pura 🎯') {
			return taticaObj1.valor;
		} else {
			return taticaObj2.valor = 7;
		}

	} else if (taticaObj1.titulo === 'Assombração 👻') {
		if (taticaObj2.titulo === 'Enganação & Malandragem 🪤' || taticaObj2.titulo === 'Velocidade & Finta 💨') {
			return taticaObj1.valor = 7;
		} else if (taticaObj2.titulo === 'Assombração 👻') {
			return taticaObj1.valor;
		} else {
			return taticaObj2.valor = 7;
		}
	}
}

// let times = partida.times();
// let totalBom1 = times.team1['vantagens'].valor.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
// let totalBom2 = times.team2['vantagens'].valor.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
// let totalRuim1 = times.team1['desvantagens'].valor.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
// let totalRuim2 = times.team2['desvantagens'].valor.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
// let total1 = totalBom1 + totalRuim1;
// let total2 = totalBom2 + totalRuim2;
// let payout1 = payout(total1);
// let payout2 = payout(total2);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('apostar')
		.setDescription('Aposte seu dinheiro com partidas de Roofball.'),
	async execute(interaction) {

		const times = partida.times();

		const totalBom1 = times.team1['vantagens'].valor.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
		const totalBom2 = times.team2['vantagens'].valor.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
		const totalRuim1 = times.team1['desvantagens'].valor.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
		const totalRuim2 = times.team2['desvantagens'].valor.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

		// Payout
		const payoutTotal1 = totalBom1 + totalRuim1;
		const payoutTotal2 = totalBom2 + totalRuim2;
		const payout1 = payout(payoutTotal1);
		const payout2 = payout(payoutTotal2);

		// With taticas
		rpsDoskvol(times.team1, times.team2);
		const total1 = totalBom1 + totalRuim1 + times.team1['tatica'].valor;
		const total2 = totalBom2 + totalRuim2 + times.team2['tatica'].valor;

		console.log(times.team1);
		console.log('\n' + payout1 + '\n' + total1);
		console.log(times.team2);
		console.log(payout2 + '\n' + total2);

		this.payout1 = payout1;
		this.payout2 = payout2;
		this.total1 = total1;
		this.total2 = total2;

		// Command Structure
		const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('one')
					.setLabel(`${times.team1['name']}`)
					.setStyle(ButtonStyle.Primary),
				new ButtonBuilder()
					.setCustomId('two')
					.setLabel(`${times.team2['name']}`)
					.setStyle(ButtonStyle.Primary),
			);

		const embedResponse = new EmbedBuilder()
			.setTitle('Quem ganha?')
			.addFields({ name: `${times.team1['name']}`, value: '------------------' },
				{ name: '🟢Vantagens🟢', value: `${times.team1['vantagens'].titulo.join(' - ')}` },
				{ name: '🔴Desvantagens🔴', value: `${times.team1['desvantagens'].titulo.join(' - ')}` },
				{ name: '💸 Odds:', value: `*${payout1}*`, inline: true },
				{ name: '🗒️ Tática de jogo:', value: `${times.team1['tatica'].titulo}`, inline: true },
				{ name: '\u200B', value: '\u200B' },
				{ name: `${times.team2['name']}`, value: '------------------' },
				{ name: '🟢Vantagens🟢', value: `${times.team2['vantagens'].titulo.join(' - ')}` },
				{ name: '🔴Desvantagens🔴', value: `${times.team2['desvantagens'].titulo.join(' - ')}` },
				{ name: '💸 Odds:', value: `*${payout2}*`, inline: true },
				{ name: '🗒️ Tática de jogo:', value: `${times.team2['tatica'].titulo}`, inline: true });

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
		// Logic
		if (user.chances > 0) {
			// Removing 1 chance from db
			await userModel.findOneAndUpdate(
				{
					userID: interaction.user.id,
				},
				{
					$inc: {
						chances: -1,
					},
					$set: {
						timeToResetChances: new Date(),
					},
				},
			);

			// Sending the command
			await interaction.reply({
				content: '**Você tem *20 segundos* para decidir.**',
				embeds: [embedResponse],
				components: [row],
			});

			await wait(20000);

			// Time limit
			await interaction.editReply({
				content: '**Encerrado**',
				components: [],
			});
		} else {
			// Checking time
			if (intervalChecker(user.timeToResetChances)) {
				await userModel.findOneAndUpdate(
					{
						userID: interaction.user.id,
					},
					{
						$inc: {
							chances: 5,
						},
						$set: {
							timeToResetChances: new Date(),
						},
					},
				);
			}

			const remainingTime = (24 - (new Date() - user.timeToResetChances) / (60 * 60 * 1000));
			const remainingHours = Math.floor(remainingTime);
			const remainingMinutes = Math.floor((remainingTime - remainingHours) * 60);
			const remainingSeconds = Math.floor(((remainingTime - remainingHours) * 60 - remainingMinutes) * 60);

			const formattedRemainingTime = `${remainingHours}:${remainingMinutes}:${remainingSeconds}`;

			interaction.reply(`${interaction.user.toString()}, você precisa esperar **${formattedRemainingTime}** para conseguir jogar novamente. `);
		}
	},
	payout1: this.payout1,
	payout2: this.payout2,
	total1: this.total1,
	total2: this.total2,
};