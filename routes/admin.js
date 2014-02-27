var mongoose = require('mongoose'),
	schema = require('../schema');
	
//mongoose.connect('mongodb://diego:deveras@troup.mongohq.com:10095/Project');


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function callback(){});

var Human = mongoose.model('Human', schema.humanSchema);

var validate = true;

exports.login = function(req, res) {
	var username = req.param('username');
	var password = req.param('password');
	
	res.redirect('/');
	
}

exports.isHuman = validate;