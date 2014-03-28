var express = require('express'),
	mongoose = require('mongoose'),
	schema = require('./schema'),
	lifeHandler = require('./life'),
	foodHandler = require('./food'),
	adminHandler = require('./admin'),
	hash = require('./pass').hash,
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	session = require('express-session');


var app = express();
var expressLayouts = require('express-ejs-layouts');


mongoose.connect('mongodb://diego:deveras@troup.mongohq.com:10095/Project');
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
app.use(cookieParser('shhhh, very secret'));
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




app.get('/food', foodHandler.findAll);
app.get('/food/:id', foodHandler.findById);

app.get('/life', lifeHandler.findAll);
app.get('/life/:id', lifeHandler.findById);

app.get('/login', adminHandler.login);
app.post('/login', adminHandler.loginHandler);
app.get('/admin', restrict, adminHandler.admin);
app.get('/add', restrict, adminHandler.add)


app.listen(8080);