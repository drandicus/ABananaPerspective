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
				res.redirect('/admin'); 
			})
		} else {
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

exports.addRestaurant = function(req, res) {
	
	var Rest = schema.food;
	var restaurant, loc, blurb, description;
	
	if (req.param('restaurant') === null) {
		restaurant = "";
	}
	
	if (req.param('location') === null) {
		loc = "";
	}
	if (req.param('blurb') === null) {
		blurb = "";
	}
	if (req.param('description') === null) {
		description = "";
	}
	

	
	var obj = new Rest({
		Restaurant: req.param('restaurant'),
		location: req.param('location'),
		img:"http://placehold.it/600x200",
		Blurb: req.param('blurb'),
		Description: req.param('description'),
	});
	
	obj.save(function(err){
		if (err) {
			console.log(err);
		}
	})
	
	var url = "/add_food/" + obj._id;
	res.redirect(url);
}

exports.addFoods = function(req, res) {
	var id = req.param('id');
	var Restaurant = schema.food;
	
	Restaurant.findOne({_id: id}, function(err, r) {
		if (r) {
			res.render('add-food', {
				admin:true,
				r: r
			});
		}
	})
}

exports.addDish = function(req, res) {
	var Dish = schema.dish;
	var Restaurant = schema.food;
	
	var obj = new Dish({
		name: req.param('item-name'),
		RestaurantID: req.param('id'),
		img: "http://placehold.it/200x200",
		Description: req.param('description'),
		Price: req.param('price')
		
	});
	
	obj.save(function(err){
		if (err) {
			console.log(err);
		} else {
			var url = "/add_food/" + req.param('id');
			res.redirect(url);
		}
	});
	
	
}