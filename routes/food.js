var mongoose = require('mongoose'),
	schema = require('../schema.js');
	
//mongoose.connect('mongodb://diego:deveras@troup.mongohq.com:10095/Project');


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function callback(){});

var Food = mongoose.model('Food', schema.foodSchema);

exports.findAll = function(req, res) {
	//Gets all of the Food from the database
	
	
	var food = [];
	
	Food.find(function(err, foods) {
		if (err) {
			food = null;
		} else {
			food = foods;
		}
	})
	
	res.render('food', food);
}

exports.findById = function(req, res) {
	var id = req.params.id;

	var food;
	Food.find({ id:  id}, function callback(){
	})

	
	res.render('topic', food)
}