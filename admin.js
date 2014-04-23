var express = require('express'),
	mongoose = require('mongoose'),
	schema = require('./schema');

var app = express();

var Users = schema.user;
var Food = schema.food;

exports.login = function(req, res) {
	res.render('login', {
		admin:false
	})
}

exports.loginHandler = function(req, res) {

	var user = req.param('user');

	req.session.regenerate(function() {
		req.session.user = user;
		res.json({ok: true});
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

exports.edit = function(req, res) {
	Food.find({}, function(err, foods) {
		if (err) {
			console.log(err);
			return;
		}
		res.render('edit', {
			restaurants: foods,
			admin:true
		});

	})
};

exports.editItem = function(req, res) {

	var id = req.param('id');
	Food.find({_id:id}, function(err, restaurant){
		if (err) {
			console.log(err);
			return;
		}

		restaurant = restaurant[0];
		res.render('edit-restaurant', {
			restaurant: restaurant,
			admin:true
		});
	})
};

exports.editRestaurant = function(req, res) {
	var id = req.param('id');
	Food.findOne({_id:id}, function(err, doc){

		doc.Restaurant = req.param('restaurant');
		doc.location = req.param('location');
		doc.img  = "http://placehold.it/600x200";
		doc.Blurb =  req.param('blurb');
		doc.Description =  req.param('description');

		doc.save(function(err) {
			if (err) {
				console.log(err);
				return;
			}
			console.log(doc);

			var Dishes = schema.dish;
			Dishes.find({RestaurdantID: id}, function(err, dishes){
					if (err) {
						console.log(err);
						return;
					}
					res.render('edit-dishes', {
						admin:true,
						dishes:dishes,
						restaurant:doc
					});
				});


		})


	}, { $set: {



	}}, function(err, restaurant){
		if (err) {
			console.log(err);
			return;
		}
		console.log(restaurant);

		var Dishes = schema.dish;
	/*	*/

	});
}
