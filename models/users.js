var mongoose = require('mongoose');

var bcrypt = require('bcrypt');
const saltRounds = 10;


var Schema = mongoose.Schema;
//var passportLocalMongoose = require('passport-local-mongoose');

var Users = new Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String
});

//Users.plugin(passportLocalMongoose);

Users.statics.create = function create(req, callback) {
    var hash = bcrypt.hashSync(req.body.Password, saltRounds);
    console.log(hash);
    response = {
        username: req.body.Username,
        password: hash,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    };
    var users = new this(response);
    users.save(callback);
}

Users.statics.update = function update(req, callback) {
    this.findOneAndUpdate({ _id: req.body.id }, {
        firstname: req.body.firstname,
        username: req.body.Username,
        lastname: req.body.lastname
    }, callback);
}


Users.statics.getUserByUsername = function getUserByUsername(username, callback){
	var query = {username: username};
	this.findOne(query, callback);
}

Users.statics.comparePassword = function comparePassword(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}

module.exports = mongoose.model('users', Users);