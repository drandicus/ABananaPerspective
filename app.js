var express = require('express'),
	mongoose = require('mongoose'),
	schema = require('./schema'),
	lifeHandler = require('./life'),
	foodHandler = require('./food'),
	adminHandler = require('./admin'),
	meHandler = require('./me'),
	hash = require('./pass').hash,
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	session = require('express-session');


var app = express();
var expressLayouts = require('express-ejs-layouts');



mongoose.connect('mongodb://Diego:Deveras@oceanic.mongohq.com:10033/Project');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function callback(){});

app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.set('layout', 'layout');
	app.use(expressLayouts);
	app.use(express.urlencoded());
	app.use(express.json());
    app.use(express.methodOverride());
	app.use(express.static(__dirname + '/public'));
});

app.use(bodyParser());
app.use(cookieParser('too many dicks on the dance floor'));
app.use(session());

app.use(function(req, res, next){
	var err = req.session.error,
		msg = req.session.success;

	delete req.session.error;
	delete req.session.success;

	res.locals.message = '';
	if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
	if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';

	next();
});

var Users = schema.user;
var Items = schema.item;
var Foods = schema.food;
var Lifes = schema.life;





app.get('/', function(req, res){

	var data = {
		'description': "I like pie"
	}

	var food = {
		"restaurant": "Spirals",
		"blurb": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin id consequat risus, tristique condimentum enim. Maecenas eu auctor dui, nec hendrerit ligula."
	};

	var life = {
		"topic": "Batman and Company",
		"blurb": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin id consequat risus, tristique condimentum enim. Maecenas eu auctor dui, nec hendrerit ligula."
	}



	res.render('index', {
		item: data,
		food: food,
		life: life,
		admin: false
	});
});


function restrict(req, res, next){
	if (req.session.user){
		next();
	} else {
		res.redirect('/login');
	}
}

function hasSession(req, res, next) {
	if(req.session.user){
		res.redirect('/admin');
	}else{
		next();
	}
}




app.get('/food', foodHandler.findAll);
app.get('/food/:id', foodHandler.findById);

app.get('/life', lifeHandler.findAll);
app.get('/life/:id', lifeHandler.findById);

app.get('/login', hasSession, adminHandler.login);
app.post('/login-check', adminHandler.loginHandler);
app.get('/admin', restrict, adminHandler.admin);
app.get('/add', restrict, adminHandler.add);
app.post('/add_restaurant', restrict, adminHandler.addRestaurant);
app.get('/add_food/:id', adminHandler.addFoods);
app.post('/add_dish', restrict, adminHandler.addDish);
app.get('/edit', restrict, adminHandler.edit);
app.get('/edit/:id', restrict, adminHandler.editItem);
app.post('/edit/edit_restaurant', restrict, adminHandler.editRestaurant);

app.get('/me', meHandler.me);

app.listen(8080);
