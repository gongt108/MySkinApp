const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
	productName: {
		type: String,
		required: true,
	},
	brand: {
		type: String,
		required: true,
	},
	imgURL: {
		type: String,
		required: true,
	},
	starRating: {
		type: Number,
		default: 0,
	},
	productShop: {
		type: Array,
	},
	recommendedSkinType: {
		type: Array,
	},
});

module.exports = Product = mongoose.model('product', ProductSchema);
