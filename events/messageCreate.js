/* module.exports = {
	name: 'messageCreate',
	async execute(message) {
		const filter = (reaction, user) => {
			return reaction.emoji.name === '👍' && user.id === message.author.id;
		};

		const collector = message.createReactionCollector({ filter, time: 5000 });

		collector.on('collect', (reaction, user) => {
			console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
		});

		collector.on('end', collected => {
			console.log(`Collected ${collected.size} items`);
		});
		// console.log(message);
	},
};*/