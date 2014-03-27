var express = require('express'),
	mongoose = require('mongoose'),
	schema = require('./schema'),
	pass = require('./pass'),
	lifeHandler = require('./life'),
	foodHandler = require('./food'),
	adminHandler = require('./admin');

var expressLayouts = require('express-ejs-layouts')
mongoose.connect('mongodb://diego:deveras@troup.mongohq.com:10095/Project');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function callback(){});

var app = express();

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


app.get('/login', function(req, res) {
	res.render('login', {
		admin:false
	});
})

app.get('/admin', adminHandler.admin);
app.post('/user-login', adminHandler.login);
app.get('/food', foodHandler.findAll);
app.get('/food/:id', foodHandler.findById);
app.get('/life', lifeHandler.findAll);
app.get('/life/:id', lifeHandler.findById);

app.listen(8080);