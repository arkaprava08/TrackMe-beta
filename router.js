var google = require('./config/googleOAuth2Client');
var userSession;

module.exports = function (app) {

	app.get('/', function(req, res){
		userSession = req.session;

  		console.log("login");
  		console.log(userSession);

	  	res.render('login', { user: req.user });
	});

	app.get('/auth/google', function(req, res, next){
		console.log("in auth google");

	    var url = google.oauth2Client.generateAuthUrl({
	      access_type: 'offline',
	      scope: ['profile', 'email']
	    });
	    res.redirect(url);
	});

	app.get( '/auth/google/callback', function(req, res, next){
		userSession = req.session;
		console.log("callback");
		code = req.param('code');
		google.oauth2Client.getToken(code, function(err, tokens) {
		// Now tokens contains an access_token and an optional refresh_token. Save them.
		if(!err) {
		  console.log("success");
		  google.oauth2Client.setCredentials(tokens);
		  callback(res);
		}
		else {
		  console.log("error");
		  res.redirect('/');
		}
		});
	});

	app.get('/account', ensureAuthenticated, function(req, res){
		console.log("account");
		console.log(data);
		res.render('account', { user: data , image: url});
	});

	app.get('/logout', function(req, res){
	  req.logout();
	  res.redirect('/');
	});
};

function ensureAuthenticated(req, res, next) {

  console.log("authenticate here");
  google.plus.people.get({ userId: 'me', auth: google.oauth2Client }, function(err, profile) {
    if (err) {
      console.log('An error occured', err);
      res.redirect('/');
    }
    next();
  });
}

function callback(res) {
  // retrieve user profile
  google.plus.people.get({ userId: 'me', auth: google.oauth2Client }, function(err, profile, email) {
    if (err) {
      console.log('An error occured', err);
      return;
    }
    else {
      data = profile.displayName;
      url = profile.image.url;
      console.log(profile.emails);

      res.redirect('/account');
    }
  });
}

