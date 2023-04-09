const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
	productName: {
		type: String,
		required: true,
	},
	productURL: {
		type: String,
		required: true,
	},
});

module.exports = Submission = mongoose.model('submission', SubmissionSchema);
