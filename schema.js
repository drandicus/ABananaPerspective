var mongoose = require('mongoose');

exports.foodSchema = mongoose.Schema({
	Date: {type: Date, default: Date.now},
	Restaurant: String,
	Location: String,
	Img: String,
	Blurb: String,
	Description: String
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