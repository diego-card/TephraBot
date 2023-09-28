// Para deletar um comando: Discord -> Server Settings -> Integrations -> Bots and Apps -> Right Click -> Copiar

const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');

const rest = new REST({ version: '10' }).setToken(token);

// ...

// for guild-based commands
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
	.then(() => console.log('Successfully deleted all guild commands.'))
	.catch(console.error);

// for global commands
rest.put(Routes.applicationCommands(clientId), { body: [] })
	.then(() => console.log('Successfully deleted all application commands.'))
	.catch(console.error);


/*
To delete all commands in the respective scope (one guild, all global commands) you can pass an empty array when setting commands:
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
*/