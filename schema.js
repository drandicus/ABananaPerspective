var mongoose = require('mongoose');

exports.foodSchema = mongoose.Schema({
	id: String,
	restaurant: String,
	location: String,
	img: String,
	description: String,
	rating: Number
})

exports.lifeSchema = mongoose.Schema({
	id: String,
	topic: String,
	post: String,
	img: String
})

exports.humanSchema = mongoose.Schema({
	id: String,
	username: String,
	password: String,
	email: String
})