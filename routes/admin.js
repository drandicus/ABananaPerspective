var express = require('express'),
	mongoose = require('mongoose'),
	schema = require('../schema');
	

var app = express();


exports.login = function(req, res) {
	var username = req.param('username');
	var password = req.param('password');
	
	res.redirect('/admin');
	
}

exports.admin = function(req, res){
	
	var auth = app.use(express.basicAuth(function(user, pass){
		if (user === 'a' && pass==="a") {
			res.render('admin', {
				admin:true
			});
		}
	}));
	
	
	
}