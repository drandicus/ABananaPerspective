var express = require('express'),
	mongoose = require('mongoose'),
	schema = require('../schema');
	

var app = express();

var counter = 0;

exports.login = function(req, res) {
	var username = req.param('username');
	var password = req.param('password');
	
	if (username === "Christian Huang" && password === "abc") {
		console.log('here');
		res.redirect('/admin');	
	} else {
		counter ++;
		if (counter === 5) {
			res.send("Incorrect Login Information");
		}
	}
	
}

exports.admin = function(req, res){
	var drafts = [];
	
	res.render('admin', {
		admin:true,
		drafts:drafts
	});
}