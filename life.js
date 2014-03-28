var models = require('./schema');



exports.findAll = function(req, res) {
	models.life.find({}, function(err, life){
		if(err) res.send('ERROR BITCH' + err);
		
		res.render('life', {
			life: life,
			admin: false
		});
	});
}

exports.findById = function(req, res) {
	var id = req.param('id');
	
	models.life.findById(id, function(err, topic){
		if(err) res.send('ERROR BITCH' + err);
		
		res.render('topic', {
			topic: topic.topic
		});
	});
}