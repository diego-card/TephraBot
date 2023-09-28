const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	userID: { type: String, require: true, unique: true },
	serverID: { type: String, require: true },
	coins: { type: Number, default: 10 },
	lastCoinDate: { type: Date, default: new Date(0) },
	timeToResetChances: { type: Date, default: new Date(0) },
	chances: { type: Number, default: 5 },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;