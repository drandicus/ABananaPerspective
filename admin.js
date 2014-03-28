var express = require('express'),
	mongoose = require('mongoose'),
	schema = require('./schema'),
	hash = require('./pass').hash;

var app = express();

var Users = schema.user;

function authenticate(name, pass, fn){
	if (!module.parent) console.log('authenticating %s:%s', name, pass);

	Users.find(function(err, users){
		var user = {};
		//loops through the list of users to find the one matching the username
		for (var i=0; i<users.length; i++){
			if (users[i].username === name) {
				user = users[i];
			}
		}
		
		if (!user) return fn(new Error('User not Found'));
		
		hash (pass, user.salt, function(err, hash){
			if (err) return fn(err);
			if (hash === user.password) return fn(null, user);
			fn(new Error('Invalid Password'));
		});
	});
}


exports.login = function(req, res) {
	res.render('login', {
		admin:false
	})
}

exports.loginHandler = function(req, res) {
	var username = req.param('username');
	var password = req.param('password');
	
	authenticate(username, password, function(err, user) {
		if (user) {
			req.session.regenerate(function() {
				req.session.user = user;
				req.session.sucess = "Authenticated as " + user.username
					+ " click to <a href='/logout'>logout</a>"
					+ " you can now access <a href='/admin'>admin data</a>";
				res.redirect('/admin'); 
			})
		} else {
		    req.session.error = 'Authentication failed, please check your '
		        + ' username and password.'
		        + ' (use "tj" and "foobar")';
		      res.redirect('login');
		
		}
	});
}

exports.admin = function(req, res){
	var drafts = [];
	
	res.render('admin', {
		admin:true,
		drafts:drafts
	});
}

exports.add = function(req, res) {
	res.render('add', {
		admin:true
	});
}

exports.addPost = function(req, res) {
	
}