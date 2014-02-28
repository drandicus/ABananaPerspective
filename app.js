var express = require('express'),
	mongoose = require('mongoose'),
	schema = require('./schema'),
	foodHandler = require('./routes/food'),
	adminHandler = require('./routes/admin');

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
    app.use(express.bodyParser());
    app.use(express.methodOverride());
	app.use(express.static(__dirname + '/public'));
});

app.get('/', function(req, res){

	var data = [];
	var counter = 1;

	while (counter < 4) {
		var img = "/img/carousel";
		img += "" + counter + ".jpg";
	
		var o = {
			"name": "Hello" + counter,
			"description":counter,
			"img":img
		};
	
		data.push(o);
		counter ++;
	}

	var food = [];
	counter = 0;
	while (counter < 5) {
		var o = {
			"id": counter,
			"restaurant": counter,
			"location": counter,
			"rating": counter
		};
	
		food.push(o);
		counter++;
	}

	var life = [
	
		{
			"id": 0,
			"topic": "Batman",
		},
		{
			"id": 1,
			"topic": "Batman",
		},
		{
			"id": 2,
			"topic": "Batman",
		},
		{
			"id": 3,
			"topic": "Batman",
		},
		{
			"id": 4,
			"topic": "Batman",
		}
	];


	res.render('index', {
		item: data,
		food: food,
		life: life
	});
});

app.get('/food', foodHandler.findAll);
app.get('/food/:id', foodHandler.findById);

app.get('/login', function(req, res) {
	res.render('login');
})

app.get('/admin', adminHandler.admin);
app.post('/user-login', adminHandler.login);


app.listen(8080);