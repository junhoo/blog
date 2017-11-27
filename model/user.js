var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: {
		type: String,
		unique: true
	}, //昵称
	password: String
});

module.exports = mongoose.model('user', userSchema);