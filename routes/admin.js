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
	console.log('here');
	res.render('admin');
	
}