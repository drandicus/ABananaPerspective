var mongoose = require('mongoose');

var restaurantSchema = mongoose.Schema({
	date: {
		type: Date, 
		default:Date.now, 
		required:true
	},
	
	Restaurant: {
		type: String, 
		required:true
	},
	
	location: {
		type: String, 
		required:true
	},
	
	img: {
		type: String, 
		required:true
	},
	
	Blurb: {
		type: String, 
		required:true
	},
	
	Description: {
		type: String, 
		required:true
	}
	
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
	email: String,
	admin:Boolean
});

var itemSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	
	RestaurantID: {
		type: String,
		required: true
	},
	
	img: {
		type: String
	},
	
	Description: {
		type: String,
		required: true,
		default: ""
	},
	
	Price: {
		type: Number
	},
	
	Rating: {
		type: Number,
		required: true
	}
	
});

exports.item = mongoose.model('Item', itemSchema);
exports.food = mongoose.model('Food', restaurantSchema);
exports.life = mongoose.model('Life', lifeSchema);
exports.human = mongoose.model('Human', humanSchema);