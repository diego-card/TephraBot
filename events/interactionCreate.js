const userModel = require('../models/profileSchema');
const secrets = require('../data/secrets/secrets.json');
const partida = require('../commands/apostar');
const { ComponentType } = require('discord.js');

// Server Tephra: Doskvol
const ROLES = {
	'20': '1075550592686100542',
	'40': '1075551018705756181',
	'70': '1075550781513666620',
};

// Para server privado
// const ROLES = {
// 	'20': '1072982226754605166',
// 	'40': '1072982763747168318',
// 	'70': '1072982839391436840',
// };

function aleatorio(array) {
	const randomNum = Math.floor(Math.random() * array.length);
	return array[randomNum];
}

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		// Create database profile for user
		let profileData;
		try {
			profileData = await userModel.findOne({ userID: interaction.user.id });
			if (!profileData) {
				const profile = await userModel.create({
					userID: interaction.user.id,
					serverID: interaction.channel.id,
					coins: 10,
					chances: 5,
				});
				profile.save();
			}
		} catch (error) {
			console.log(error);
		}
		// Database finish

		if (!interaction.isChatInputCommand() && !interaction.isButton()) return;

		console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);

		// Filter and user from db
		const filter = i => i.user.id === interaction.user.id;
		const user = await userModel.findOne({ userID: interaction.user.id });
		//

		// Loja command
		if (interaction.commandName === 'loja') {

			// collect interactions for 30s
			const collector = interaction.channel.createMessageComponentCollector({ filter, componentType: ComponentType.Button, time: 30000 });

			collector.on('collect', async i => {

				// Retrieving price
				const priceLoja = Number(i.customId);
				console.log(i);
				console.log(priceLoja);

				if (i.customId === '75') {
					if (user.coins >= priceLoja) {
						await userModel.findOneAndUpdate(
							{
								userID: i.user.id,
							},
							{
								$inc: {
									coins: -priceLoja,
								},
							},
						);
						await i.reply({ content: 'Segredo arcano foi enviado no seu privado.', ephemeral: true });
						// Segredos Arcanos
						return i.user.send(aleatorio(secrets));
					} else {
						return i.reply({ content: 'Você não tem moedas o suficiente.', ephemeral: true })
							.catch(() => {
								return i.editReply({ content: 'Você não tem moedas o suficiente.', ephemeral: true });
							});
					}
				}

				// For the roles buttons
				const role = i.guild.roles.cache.get(ROLES[i.customId]);
				const hasRole = i.member.roles.cache.has(role.id);
				console.log(role);

				/* if (!role) {
					return i.reply({ content: 'Role not found', ephemeral: true });
				}*/

				if (hasRole) {
					console.log('Member already has role;');
					await i.reply({ content: 'Você já possui esse título.', ephemeral: true })
						.catch(async () => {
							i.followUp({ content: 'Você já possui esse título.', ephemeral: true });
						});
				} else if (user.coins >= priceLoja) {
					await userModel.findOneAndUpdate(
						{
							userID: i.user.id,
						},
						{
							$inc: {
								coins: -priceLoja,
							},
						},
					);

					return i.member.roles
						.add(role)
						.then(async (member) => {
							await i.reply({
								content: `A role foi adicionada a você ${member}`,
								ephemeral: true,
							})
								.catch(() => {
									i.followUp({ content: `A role foi adicionada a você ${member}`, ephemeral: true });
								});
						},
						).catch(async (err) => {
							console.log(err);
							await i.reply({
								content: `Algo de errado não deu certo. O ${role} role não foi adicionado a você.`,
								ephemeral: true,
							})
								.catch(() => {
									i.followUp({ content: `Algo de errado não deu certo. O ${role} role não foi adicionado a você.`, ephemeral: true });
								});
						});

				} else {
					await i.reply({ content: 'Você não possui dinheiro o suficiente.', ephemeral: true })
						.catch(() => {
							i.followUp({ content: `Algo de errado não deu certo. O ${role} role não foi adicionado a você.`, ephemeral: true });
						});
				}
			});
			collector.on('end', () => {
				return;
			});
		}

		// Apostar command
		if (interaction.commandName === 'apostar') {

			// await interaction.deferReply({ ephemeral: true });

			// collect interactions for 20s
			const collector = interaction.channel.createMessageComponentCollector({ filter, max: 1, time: 20000 });

			collector.on('collect', async i => {

				// Apostar buttons
				const messageFilter = m => { m.author.id == interaction.user.id; };

				if (i.customId === 'one') {
					await i.reply({ content: 'Quanto você quer apostar?', components: [] })
						.then(() => {
							// Wait for user message
							i.channel.awaitMessages({ messageFilter, max: 1, time: 20000, errors: ['time'] })
								.then(async collected => {
									const apostado = collected.first().content;

									if (Number(apostado) <= 0 || isNaN(Number(apostado))) {
										i.followUp({ content: 'Resposta inválida.', ephemeral: true });
									} else if (apostado > user.coins) {
										i.followUp({ content: 'Você não tem moedas o suficiente.' });
									} else {

										const ganhado = (Math.round(partida.payout1 * apostado)).toString();
										await userModel.findOneAndUpdate(
											{
												userID: i.user.id,
											},
											{
												$inc: {
													coins: -Number(apostado),
												},
											},
										);

										if (partida.total1 > partida.total2) {
											await userModel.findOneAndUpdate(
												{
													userID: i.user.id,
												},
												{
													$inc: {
														coins: Number(ganhado),
													},
												},
											);

											// Making the button disappear when clicked
											i.message.edit({ components: [] });

											i.followUp({ content: `Parabéns, você apostou **${apostado}** e ganhou **${ganhado}**` });
											return collector.stop(['?']);
										} else {

											// Making the button disappear when clicked
											i.message.edit({ components: [] });

											i.followUp({ content: `Que azar. Você apostou **${apostado}** e perdeu tudo.` });
											return collector.stop();
										}
									}
								})
								.catch(collected => {
									console.log(collected);
									i.followUp({ content: 'Você demorou demais para responder.', ephemeral: true });
								});
						})
						.catch((err) => {
							console.log(err);
							i.followUp({ content: 'Tempo limite atingido', ephemeral: true });
						});
				} else if (i.customId === 'two') {
					await i.reply({ content: 'Quanto você quer apostar?', components: [] })
						.then(() => {
							// Wait for user message
							interaction.channel.awaitMessages({ messageFilter, max: 1, time: 20000, errors: ['time'] })
								.then(async collected => {
									const apostado = collected.first().content;

									// See if apostado (in number)
									if (Number(apostado) <= 0 || isNaN(Number(apostado))) {
										i.followUp({ content: 'Resposta inválida.', ephemeral: true });
									} else if (apostado > user.coins) {
										i.followUp({ content: 'Você não tem moedas o suficiente.' });
									} else {

										const ganhado = (Math.round(partida.payout2 * apostado)).toString();
										await userModel.findOneAndUpdate(
											{
												userID: i.user.id,
											},
											{
												$inc: {
													coins: -Number(apostado),
												},
											},
										);

										if (partida.total1 < partida.total2) {
											await userModel.findOneAndUpdate(
												{
													userID: i.user.id,
												},
												{
													$inc: {
														coins: Number(ganhado),
													},
												},
											);

											// Making the button disappear when clicked
											i.message.edit({ components: [] });

											i.followUp({ content: `Parabéns, você apostou **${apostado}** e ganhou **${ganhado}**` });
											return collector.stop();
										} else {

											// Making the button disappear when clicked
											i.message.edit({ components: [] });

											i.followUp({ content: `Que azar. Você apostou **${apostado}** e perdeu tudo.` });
											return collector.stop();
										}
									}
								})
								.catch(collected => {
									console.log(collected);
									i.followUp({ content: 'Você demorou demais para responder.', ephemeral: true });
								});
						})
						.catch((err) => {
							console.log(err);
							i.followUp({ content: 'Tempo limite atingido.', ephemeral: true });
						});
				}
			});

			collector.on('end', () => {
				return;
			});
		}
		// End

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) return;

		try {
			await command.execute(interaction, profileData);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	},
};