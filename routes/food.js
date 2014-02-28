var mongoose = require('mongoose'),
	schema = require('../schema.js');

var Food = mongoose.model('Food', schema.foodSchema);

var food = [];

var obj = {
	"Date": "February 28, 2014",
	"Restaurant": "Batman",
	"Location": "Batcave",
	"img": "http://placehold.it/600x200",
	"Blurb": "Try the Batarangs",
	"Description": ""
};

food.push(obj);

exports.findAll = function(req, res) {
	//Gets all of the Food from the database
	
	/*Food.find(function(err, foods) {
		if (err) {
			food = null;
		} else {
			food = foods;
		}
	})*/
		
	res.render('food', {
		food: food
	});
}

exports.findById = function(req, res) {
	var id = req.params.id;

	var food;
	Food.find({ id:  id}, function callback(){
	});

	
	res.render('topic', {
		food: food
	});
}