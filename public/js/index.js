$(document).ready(function() {

	var images = $('<img>');

	images.on('load', function() {
		console.log($(this).height());
	});

})
