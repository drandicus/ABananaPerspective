var mongoose = require('mongoose'),
	schema = require('./schema');

var Food = schema.food;

exports.findAll = function(req, res) {
	//Gets all of the Food from the database
	
	Food.find(function(err, foods) {
		if (err) {
			food = null;
			console.log(err);
		} else {
			var l = foods.length;
			res.render('food', {
				food: foods,
				admin: false,
				l: l
			});
		}
	});
}

exports.findById = function(req, res) {
	var id = req.param('id');
		
	Food.find({ _id:  id}, function(err, f){
		if (f) {
			console.log(f)
			res.render('topic-food', {
				food: f,
				admin: false
			});
		}
	});
}