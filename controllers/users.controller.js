var userModel = require('../models/users');

exports.create = function (req, res) {
    console.log('---------------------------Insert data----------------------');
    userModel.create(req, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('User inserted successfully!');
            userModel.find({}, function (err, result) {
                res.render('view', { userData: result, title: 'User view' });
                console.log(result[0]);
            }).sort({ _id: -1 }).limit(1);

        }

    });
    console.log('---------------------------End Insert data------------------');
}

exports.getOne = function (req, res) {
    console.log('----------------Fetch one-------------------');
    userModel.find({ _id: req.params.id }, function (err, user) {
        res.render('view', { userData: user, title: 'User view' });
    });
    console.log('----------------Fetch one End-------------------')
}