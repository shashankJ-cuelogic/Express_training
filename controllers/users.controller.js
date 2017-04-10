var userModel = require('../models/users');
var userActivity = require('../models/useractivity');

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


exports.getAll = function (req, res) {
    console.log('-----Find all------------------');
    userModel.find({}, function (err, users) {
        res.render('list', { title: 'All users', userrecords: users });
    });
    console.log('-----Find all end--------------');
}

exports.edit = function (req, res) {
    console.log('-----Edit-----------------');
    userModel.find({ _id: req.params.id }, function (err, user) {
        res.render('edit', {
            title: 'Edit',
            username: user[0].username,
            firstname: user[0].firstname,
            lastname: user[0].lastname,
            messages: '',
            id: user[0]._id
        });
    });

    console.log('-----End Edit-------------');
}

exports.update = function (req, res) {
    console.log('-----update-----------------');
    userModel.update(req, function (err) {
        if (err) throw err;
        res.redirect('/users');
    });

    console.log('-----update-----------------');
}

exports.logs = function (req, res) {




    userActivity.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "UA",
                foreignField: "_id",
                as: "productObjects"
            }
        }, {
            $match: {
                "productObjects": { $eq: [] }
            }
        }
    ], function (err, users) {
        if (err) console.log(err);
        //  console.log(users);
        res.send(users);
        // res.render('list', { title: 'All users', userrecords: users });
    });
}