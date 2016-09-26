var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path')
require('dotenv').config();


var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy({
	clientID: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	callbackURL: "/auth/google/callback"
},
function(accessToken, refreshToken, profile, done){
	//create our own user database and insert or find user here
		return done(JSON.stringify(profile.id));
	})) 

app.get('/', function(req, res){
    res.sendfile(path.join(__dirname, '../web/public/index.html'));
});

app.get('/auth/google', passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/plus.login']}))


app.get('/auth/google/callback', 
	passport.authenticate('google', {
		failureRedirect: '/login', 
		failureFlash: 'invalid login, something went wrong',
		successFlash: 'Logged In!'}), 
	function(req, res){
		res.sendfile(path.join(__dirname, '../web/public/index.html'));
	});

app.use(express.static(path.join(__dirname, '../web/public')))

io.on('connection', function(socket){
    console.log('Got connection');
    socket.on('client_emit', console.log);
});

http.listen(3000, function(){
    console.log('listening 3000 for new sockets');
});