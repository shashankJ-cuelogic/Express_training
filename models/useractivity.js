var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var Schema = mongoose.Schema;

var UsersActivity = new Schema({
    IP: String,
    UA: String,
    Date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('useractivity', UsersActivity);