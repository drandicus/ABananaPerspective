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

var userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	
	password: {
		type: String,
		required: true
	},
	
	salt: {
		type: String,
		required: true
	},
	
	email: {
		type: String,
		required: true
	},
	
	admin:{
		type: Boolean,
		required: true,
		default: false
	}
});

var dishSchema = mongoose.Schema({
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
	}
});

exports.dish = mongoose.model('Dish', dishSchema);
exports.food = mongoose.model('Food', restaurantSchema);
exports.life = mongoose.model('Life', lifeSchema);
exports.user = mongoose.model('User', userSchema);