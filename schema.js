var mongoose = require('mongoose');

var foodSchema = mongoose.Schema({
	date: {type: Date, default:Date.now, required:true},
	Restaurant: {type: String, required:true},
	location: {type: String, required:true},
	img: {type: String, required:true},
	Blurb: {type: String, required:true},
	Description: {type: String, required:true}
});

var lifeSchema = mongoose.Schema({
	topic: String,
	post: {type: String},
	img: String
});

var humanSchema = mongoose.Schema({
	id: String,
	username: String,
	password: String,
	email: String
});


exports.food = mongoose.model('Food', foodSchema);
exports.life = mongoose.model('Life', lifeSchema);
exports.human = mongoose.model('Human', humanSchema);