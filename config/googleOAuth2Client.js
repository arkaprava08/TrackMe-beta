var google = require('googleapis');
var OAuth2Client = google.auth.OAuth2;
var plus = google.plus('v1');

var config = require("./auth");

var oauth2Client = new OAuth2Client(config.googleAuth.CLIENT_ID, 
                                    config.googleAuth.CLIENT_SECRET, 
                                    config.googleAuth.REDIRECT_URL);

module.exports = {
	"oauth2Client" : oauth2Client, 
	"plus" : plus
};
