const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
	},
	product: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'product',
	},
	headline: {
		type: String,
		required: true,
	},
	starRating: {
		type: Number,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
});

module.exports = Review = mongoose.model('review', ReviewSchema);
