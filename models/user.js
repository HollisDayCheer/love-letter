var mongoose = require('mongoose')
//insert other items we want in this dictionary
var userSchema = mongoose.Schema({
	userName: String,
	googleId: String
})
var User = mongoose.model('User', userSchema);

module.exports= User