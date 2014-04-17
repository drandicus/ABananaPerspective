var chatRef = new Firebase('https://abananaperspective.firebaseio.com/users');
var auth = new FirebaseSimpleLogin(chatRef, function(error, user) {
	if (error) {
		alert(error);
  	} else if (user) {
			$.post('/login-check', {
				user: user
			}).done(function(data) {
				if(data.ok){
					window.location = "/admin";
				}
		  });
  	} else {

  }
});

console.log(auth);

$(document).ready(function(){
	$("form").submit(function(event){
		event.preventDefault();

		var username = $('#username').val();
		var password = $('#password').val();

		console.log(username);
		console.log(password);

		auth.login('password', {
			email: username,
			password: password
		});
	});
})
