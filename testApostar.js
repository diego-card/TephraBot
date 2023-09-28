const allTeams = require('./data/roofball/teams.json');
// const allTeams = ['Barcelona', 'Real Madrid', 'Milan', 'Bayern München'];

const coisasBoas = require('./data/roofball/advantages.json');
/* const coisasBoas = {
	'Bons Ânimos': 1,
	'Entrosado': 2,
	'Confiantes': 3,
};*/

const coisasRuins = require('./data/roofball/disadvantages.json');
/* const coisasRuins = {
	'Desfalque': -1,
	'Ambiente Desagradável': -2,
	'Clima Tenso': -3,
};*/

const tatica = require('./data/roofball/tatica.json');

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

function aleatorio(array) {
	const randomNum = Math.floor(Math.random() * array.length);
	return array[randomNum];
}

/* function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * i) + 1;
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}*/


// Para coisas ruins
const keysCR = Object.keys(coisasRuins);
// const shuffledKeysCR = shuffleArray(keysCR);
// const randomNumberOfKeysCR = Math.floor(Math.random() * (keysCR.length + 1));
// const randomCombinationOfKeysCR = shuffledKeysCR.slice(0, randomNumberOfKeysCR);
// const randomCombinationOfValuesCR = randomCombinationOfKeysCR.map(key => coisasRuins[key]);


// Para coisas boas
const keysCB = Object.keys(coisasBoas);
// const shuffledKeysCB = shuffleArray(keysCB);
// const randomNumberOfKeysCB = Math.floor(Math.random() * (keysCB.length + 1));
// const randomCombinationOfKeysCB = shuffledKeysCB.slice(0, randomNumberOfKeysCB);
// const randomCombinationOfValuesCB = randomCombinationOfKeysCB.map(key => coisasBoas[key]);

function newMatch(teams) {
	// Shuffle the teams array
	const shuffledTeams = shuffleArray(teams);

	// Select a random number of teams (not including 0)
	const randomNumberOfTeams = Math.max(1, Math.floor(Math.random() * (shuffledTeams.length)));

	// Select a random combination of teams
	const randomCombinationOfTeams = shuffledTeams.slice(0, randomNumberOfTeams + 1);

	// Select the random keys and values of 'boa'
	// const boaTitulo1 = shuffleArray(keysCB).slice(0, Math.max(0, Math.floor(Math.random() * (keysCB.length))));
	const boaTitulo1 = shuffleArray(keysCB).slice(0, Math.floor(Math.random() * keysCB.length) + 1);
	// const boaTitulo1 = randomCombinationOfKeysCB;
	// const boaTitulo2 = shuffleArray(keysCB).slice(0, Math.max(0, Math.floor(Math.random() * (keysCB.length))));
	const boaTitulo2 = shuffleArray(keysCB).slice(0, Math.floor(Math.random() * keysCB.length) + 1);
	const boaValor1 = boaTitulo1.map(key => coisasBoas[key]);
	// const boaValor1 = randomCombinationOfValuesCB;
	const boaValor2 = boaTitulo2.map(key => coisasBoas[key]);


	// Select the random keys and values of 'ruim'
	// const ruimTitulo1 = randomCombinationOfKeysCR;
	// const ruimTitulo1 = shuffleArray(keysCR).slice(0, Math.max(Math.floor(Math.random() * (keysCR.length))));
	// const ruimTitulo2 = shuffleArray(keysCR).slice(0, Math.max(Math.floor(Math.random() * (keysCR.length))));
	const ruimTitulo1 = shuffleArray(keysCR).slice(0, Math.floor(Math.random() * keysCR.length) + 1);
	const ruimTitulo2 = shuffleArray(keysCR).slice(0, Math.floor(Math.random() * keysCR.length) + 1);

	// const ruimValor1 = randomCombinationOfValuesCR;
	const ruimValor1 = ruimTitulo2.map(key => coisasRuins[key]);
	const ruimValor2 = ruimTitulo2.map(key => coisasRuins[key]);

	// Taticas
	const taticaKeys1 = aleatorio(Object.keys(tatica));
	const taticaTitulo1 = Object.keys(tatica[taticaKeys1])[0];
	const taticaValor1 = tatica[taticaKeys1][taticaTitulo1];

	const taticaKeys2 = aleatorio(Object.keys(tatica));
	const taticaTitulo2 = Object.keys(tatica[taticaKeys2])[0];
	const taticaValor2 = tatica[taticaKeys2][taticaTitulo2];

	// Create a new object with the two teams
	const match = {
		team1: {
			name: randomCombinationOfTeams[0],
			vantagens: {
				titulo: boaTitulo1,
				valor: boaValor1,
			},
			desvantagens: {
				titulo: ruimTitulo1,
				valor: ruimValor1,
			},
			tatica: {
				titulo: taticaTitulo1,
				valor: taticaValor1,
			},
		},
		team2: {
			name: randomCombinationOfTeams[1],
			vantagens: {
				titulo: boaTitulo2,
				valor: boaValor2,
			},
			desvantagens: {
				titulo: ruimTitulo2,
				valor: ruimValor2,
			},
			tatica: {
				titulo: taticaTitulo2,
				valor: taticaValor2,
			},
		},
	};
	return match;
}


console.log(newMatch(allTeams).team2);

module.exports = {
	times: () => {
		return newMatch(allTeams);
	},
};