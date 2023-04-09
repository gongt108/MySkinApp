const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	securityQuestions: {
		type: Array,
		require: true,
	},
	securityResponses: {
		type: Array,
		require: true,
	},
	skinType: {
		type: String,
		required: true,
	},
	skinTypeOptional: {
		type: Array,
	},
	reviews: {
		type: Array,
	},
});

module.exports = User = mongoose.model('user', UserSchema);
