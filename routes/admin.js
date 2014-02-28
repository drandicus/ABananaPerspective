var express = require('express'),
	mongoose = require('mongoose'),
	schema = require('../schema');
	

var app = express();

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function callback(){});

var Human = mongoose.model('Human', schema.humanSchema);

var validate = true;

exports.login = function(req, res) {
	var username = req.param('username');
	var password = req.param('password');
	
	res.redirect('/admin');
	
}

exports.isHuman = validate;

exports.admin = function(req, res){
	
	//Check session handling
	
	app.set('view options', { layout: "adminlayout.ejs" })
	res.render('admin');
	
}