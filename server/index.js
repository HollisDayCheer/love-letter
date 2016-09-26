var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path')
var env = require('node-env-file');
env(__dirname + '/.env');


var passport = require('passport');
var GoogleStrategy = require('passport-oath-google').Oath2Strategy;

passport.use(new GoogleStrategy({
	clientID: GOOGLE_CLIENT_ID,
	clientSecret: GOOGLE_CLIENT_SECRET,
	callbackURL: "/auth/google/callback"
},
function(accessToken, refreshToken, profile, done){
	User.findOrCreate({googleId: profile.id}, function(err, user){
		return done(err, user);
	})
}
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
		res.redirect('/');
	});
app.use(express.static(path.join(__dirname, '../web/public')))

io.on('connection', function(socket){
    console.log('Got connection');
    socket.on('client_emit', console.log);
});

http.listen(3000, function(){
    console.log('listening 3000 for new sockets');
});