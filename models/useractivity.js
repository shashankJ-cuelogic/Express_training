var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UsersActivity = new Schema({
    IP: String,
    UA: Schema.Types.ObjectId,
    Date: { type: Date, default: Date.now }
});

UsersActivity.statics.create = function create(data, callback) {
    var useractivity = new this(data);
    console.log(data);
    useractivity.save(callback);
}



module.exports = mongoose.model('useractivity', UsersActivity);