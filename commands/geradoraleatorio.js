// Data para construções
const comum = require('../data/buildings/common_use.json');
const detalheExterior = require('../data/buildings/exterior_details.json');
const detalheInterior = require('../data/buildings/interior_details.json');
const material = require('../data/buildings/material.json');
const raro = require('../data/buildings/rare_use.json');

// Data para demônios
const elemento = require('../data/demons/affinity.json');
const forma = require('../data/demons/aspect.json');
const desejo = require('../data/demons/desire.json');
const caracteristica = require('../data/demons/feature.json');
const nomeDemo = require('../data/demons/name.json');

// Data para fantasmas
const tracosFanta = require('../data/ghosts/trait.json');
const efeitosFanta = require('../data/ghosts/effect.json');

// Data para golpes
const alvo = require('../data/scores/client_target.json');
const complicacao = require('../data/scores/complication.json');
const conneccao = require('../data/scores/connection.json');
const faccao = require('../data/scores/factions.json');
const estiloGolpe = require('../data/scores/score_type.json');

// Data para leviatãs
const atividade = require('../data/leviathans/activity.json');
const tracosDemoniacos = require('../data/leviathans/demon_traits.json');
const epiteto = require('../data/leviathans/epithet.json');
const nomeLevia = require('../data/leviathans/names.json');
const formaLevia = require('../data/leviathans/shapes.json');
const prole = require('../data/leviathans/spawn.json');
const tesouro = require('../data/leviathans/treasures.json');

// Data para npc's
const apelido = require('../data/people/aliases.json');
const aparencia = require('../data/people/appearance.json');
const profissaoComum = require('../data/people/common_profession.json');
const nomeFamilia = require('../data/people/family_name.json');
const primeiroNome = require('../data/people/first_name.json');
// const genero = require('../data/people/gender.json');
const objetivos = require('../data/people/goals.json');
const heranca = require('../data/people/heritage.json');
const interesses = require('../data/people/interests.json');
const metodos = require('../data/people/methods.json');
const pecularidade = require('../data/people/quirks.json');
const profissaoRara = require('../data/people/rare_profession.json');
const estilo = require('../data/people/style.json');
const tracos = require('../data/people/traits.json');
const raca = require('../data/people/race.json');

// Data para ruas
const detalhesPrimario = require('../data/streets/details_primary.json');
const detalhesSecondario = require('../data/streets/details_secondary.json');
const infraestrutura = require('../data/streets/infraestructure_type.json');
const humor = require('../data/streets/moods.json');
const visao = require('../data/streets/sights.json');
const cheiros = require('../data/streets/smells.json');
const sons = require('../data/streets/sounds.json');
const uso = require('../data/streets/use.json');

// Data para seitas
const deusesEsquecidos = require('../data/cults/forgottenGods.json');
const praticas = require('../data/cults/practices.json');


const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

// random, opção de raro ou comum & não repetir detalhe interior
// Returns a string that describes the building based on its attributes
// Não foi possível com embed

function aleatorio(array) {
	const randomNum = Math.floor(Math.random() * array.length);
	return array[randomNum];
}

// For unique values
const used = [];

function aleatorioUnique(array) {
	const randomIndex = Math.floor(Math.random() * array.length);
	const randomValue = array[randomIndex];
	if (used.includes(randomValue)) {
		return aleatorioUnique(array);
	} else {
		used.push(randomValue);
		return randomValue;
	}
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('geradoraleatorio')
		.setDescription('Gere um elemento aleatório.')
		.addStringOption(option =>
			option.setName('elemento')
				.setDescription('Opções disponíveis para a geração.')
				.setRequired(true)
				.addChoices(
					{ name: 'Construção Comum', value: 'construção comum' },
					{ name: 'Construção rara', value: 'construção rara' },
					{ name: 'Demônio', value: 'demônio' },
					{ name: 'Fantasma', value: 'fantasma' },
					{ name: 'Golpe', value: 'golpe' },
					{ name: 'Leviatã', value: 'leviatã' },
					{ name: 'Npc Comum', value: 'npc comum' },
					{ name: 'Npc Raro', value: 'npc raro' },
					{ name: 'Rua', value: 'rua' },
					{ name: 'Seita', value: 'seita' },
				)),
	async execute(interaction) {
		const opcao = interaction.options._hoistedOptions[0].value;
		switch (opcao) {
		case 'construção comum':
			// await interaction.reply(`**Descrição**\nEsse(a) ${aleatorio(comum)} de ${aleatorio(material)} é decorado(a) com ${aleatorio(detalheExterior)}.\n**Características:**\n${aleatorio(detalheInterior)} e ${aleatorio(detalheInterior)}.`);
			await interaction.reply({ embeds: [new EmbedBuilder()
				.setTitle(`${aleatorio(comum)} de ${aleatorio(material)}`)
				.setDescription(`É decorado(a) com ${aleatorio(detalheExterior)}.`)
				.addFields({ name: 'Características:', value: `${aleatorio(detalheInterior)} e ${aleatorio(detalheInterior)}.` }),
			] });
			break;
		case 'construção rara':
			// await interaction.reply(`**Descrição**\nEsse(a) ${aleatorio(raro)} de ${aleatorio(material)} é decorado(a) com ${aleatorio(detalheExterior)}.\n**Características:**\n${aleatorio(detalheInterior)} e ${aleatorio(detalheInterior)}.`);
			await interaction.reply({ embeds: [new EmbedBuilder()
				.setTitle(`${aleatorio(raro)} de ${aleatorio(material)}`)
				.setDescription(`É decorado(a) com ${aleatorio(detalheExterior)}.`)
				.addFields({ name: 'Características:', value: `${aleatorio(detalheInterior)} e ${aleatorio(detalheInterior)}.` }),
			] });
			break;
		case 'demônio':
			await interaction.reply({ embeds: [new EmbedBuilder()
				.setTitle(`*${aleatorio(nomeDemo)}*`)
				.setDescription(`Esse demônio é notável por, ${aleatorioUnique(caracteristica)} e ${aleatorioUnique(caracteristica)}`)
				.addFields({ name: 'Aparência:', value: `Esse demônio do(a) ${aleatorio(elemento)} é ${aleatorio(forma)}` },
					{ name: 'Desejo:', value: `Esse demônio deseja ${aleatorio(desejo)} acima de tudo` }),
			] });
			break;
		case 'fantasma':
			await interaction.reply({ embeds: [new EmbedBuilder()
				.setTitle(`${aleatorio(primeiroNome)} "*${aleatorio(apelido)}*" ${aleatorio(nomeFamilia)}`)
				.setDescription(`Há ${aleatorio(efeitosFanta)} quando esse espírito ${aleatorio(tracosFanta)} aparece!`),
			] });
			break;
		case 'golpe': {
			// await interaction.reply(`Um(a) ${aleatorio(alvo)} quer que o bando realize um(a) **${aleatorio(estiloGolpe)}** contra um(a) ${aleatorio(alvo)}.\nÉ meio complicado, porque... ${aleatorio(complicacao)}.\nUm(a) ${aleatorio(conneccao)} pode te dizer mais sobre, porém, **${aleatorio(faccao)}** também estão envolvido(a)s.`);
			const golpe = aleatorio(estiloGolpe);
			await interaction.reply({ embeds: [new EmbedBuilder()
				.setTitle(`Tipo de trabalho: "*Realizar um(a) ${golpe}*"`)
				.setDescription(`Um(a) ${aleatorio(alvo)} quer que o bando realize um(a) **${golpe}** contra um(a) ${aleatorio(alvo)}.`)
				.addFields({ name: '**Complicações**', value:`${aleatorio(complicacao)}.`, inline: true },
					{ name: '**Envolvidos**', value: `\nUm(a) ${aleatorio(conneccao)}, pode te dizer mais sobre, porém, **${aleatorio(faccao)}** também estão envolvido(a)s.`, inline: true }),
			] });
			break;
		}
		case 'leviatã':
			await interaction.reply({ embeds: [new EmbedBuilder()
				.setAuthor({ name: `"*${aleatorio(epiteto)}*"` })
				.setTitle(`*${aleatorio(nomeLevia)}* está ${aleatorio(atividade)} diante de você, na água.`)
				.setDescription(`Esse leviatã tem a cabeça de ${aleatorioUnique(formaLevia)}, corpo de ${aleatorioUnique(formaLevia)} e se move como um(a) ${aleatorioUnique(formaLevia)}`)
				.addFields({ name: 'Traços Regionais', value: `${aleatorio(tracosDemoniacos)}\n${aleatorio(tracosDemoniacos)}\n${aleatorio(tracosDemoniacos)}\n${aleatorio(tracosDemoniacos)}\n${aleatorio(tracosDemoniacos)}\n${aleatorio(tracosDemoniacos)}\n${aleatorio(tracosDemoniacos)}\n`, inline: true },
					{ name: 'Possíveis Recompensas', value: `${aleatorio(tesouro)}\n${aleatorio(tesouro)}\n${aleatorio(tesouro)}\n`, inline: true },
					{ name: 'Crias', value: `${aleatorio(prole)}` }),
			] });
			break;
		case 'npc comum':
			// await interaction.reply(`**Nome**\n${aleatorio(primeiroNome)} *'${aleatorio(apelido)}'* ${aleatorio(nomeFamilia)}.\n**Aparência**\nUm(a) ${aleatorio(genero)} ${aleatorio(raca)} ${aleatorio(aparencia)}, nascido(a) em ${aleatorio(heranca)}, usando um(a) ${aleatorio(estilo)}.\n**Descrição**\nNo geral, ele(a) parece ser ${aleatorio(tracos)}, além de ${aleatorio(pecularidade)}\nEle(a) é interessado(a) em ${aleatorio(interesses)}.\nEle(a) trabalha de ${aleatorio(profissaoComum)} e tem como objetivo ${aleatorio(objetivos)} com ${aleatorio(metodos)}.`);
			await interaction.reply({ embeds: [new EmbedBuilder()
				.setAuthor({ name: `${aleatorio(primeiroNome)} ${aleatorio(nomeFamilia)}` })
				.setTitle(`Apelido: "*${aleatorio(apelido)}*"`)
				// Aparência
				.setDescription(`Um(a) ${aleatorio(raca)} ${aleatorio(aparencia)}, nascido(a) em ${aleatorio(heranca)}, usando um(a) ${aleatorio(estilo)}.`)
				.addFields({ name: '**Descrição:**', value:`No geral, ele(a) parece ser ${aleatorio(tracos)}, além de ${aleatorio(pecularidade)}\nEle(a) é interessado(a) em ${aleatorio(interesses)}.\nEle(a) trabalha de ${aleatorio(profissaoComum)} e tem como objetivo ${aleatorio(objetivos)} com ${aleatorio(metodos)}.` }),
			] });
			break;
		case 'npc raro':
			// await interaction.reply(`**Nome**\n${aleatorio(primeiroNome)} *'${aleatorio(apelido)}'* ${aleatorio(nomeFamilia)}.\n**Aparência**\nUm(a) ${aleatorio(genero)} ${aleatorio(raca)} ${aleatorio(aparencia)}, nascido em ${aleatorio(heranca)}, usando um(a) ${aleatorio(estilo)}.\n**Descrição**\nNo geral, ele(a) parece ser ${aleatorio(tracos)}, além de ${aleatorio(pecularidade)}\nEle(a) é interessado(a) em ${aleatorio(interesses)}.\nEle(a) trabalha de ${aleatorio(profissaoRara)} e tem como objetivo ${aleatorio(objetivos)} com ${aleatorio(metodos)}.`);
			await interaction.reply({ embeds: [new EmbedBuilder()
				.setAuthor({ name: `${aleatorio(primeiroNome)} ${aleatorio(nomeFamilia)}` })
				.setTitle(`Apelido: "*${aleatorio(apelido)}*"`)
				// Aparência
				.setDescription(`Um(a) ${aleatorio(raca)} ${aleatorio(aparencia)}, nascido(a) em ${aleatorio(heranca)}, usando um(a) ${aleatorio(estilo)}.`)
				.addFields({ name: '**Descrição:**', value:`No geral, ele(a) parece ser ${aleatorio(tracos)}, além de ${aleatorio(pecularidade)}\nEle(a) é interessado(a) em ${aleatorio(interesses)}.\nEle(a) trabalha de ${aleatorio(profissaoRara)} e tem como objetivo ${aleatorio(objetivos)} com ${aleatorio(metodos)}.` }),
			] });
			break;
		case 'rua':
			// await interaction.reply(`Esse(a) **${aleatorio(infraestrutura)}** **${aleatorio(humor)}** é usado(a) principalmente por propósitos de **${aleatorio(uso)}**.\nVocê observa **${aleatorio(visao)}**.\nVocê escuta sons de **${aleatorio(sons)}** e cheiro de **${aleatorio(cheiros)}** no ar.\nVocê não pode deixar de notar **${aleatorio(detalhesPrimario)}** e **${aleatorio(detalhesSecondario)}**.`);
			await interaction.reply({ embeds: [new EmbedBuilder()
				.setAuthor({ name: `${aleatorio(infraestrutura)} ${aleatorio(humor)}` })
				.setTitle(`Essa rua é usado(a) principalmente para propósitos de ${aleatorio(uso)}.`)
				.setDescription(`Você não pode deixar de notar ${aleatorio(detalhesPrimario)} e ${aleatorio(detalhesSecondario)}.`)
				.addFields({ name: 'Você observa', value: `${aleatorio(visao)}` },
					{ name: 'Você escuta', value: `${aleatorio(sons)}` },
					{ name: 'Você sente cheiro de', value: `${aleatorio(cheiros)}` }),
			] });
			break;
		case 'seita':
			await interaction.reply({ embeds: [new EmbedBuilder()
				.setAuthor({ name: 'Esta seita cultua:' })
				.setTitle(`*${aleatorio(deusesEsquecidos)}*`)
				.setDescription(`Essa seita tem como prática, ${aleatorio(praticas)}`),
			] });
			break;
		}
	},
};