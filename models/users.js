var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/local_demo');
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

module.exports = mongoose.model('users', Users);