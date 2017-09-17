var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var User = require('../models/user');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

// Find  a User
router.get('/:id', function (req, res) {
    User.findById(req.params.id, function (err, foundUser) {
        if (err) {
            return res.send(err);
        } else {
            res.status(200).send(foundUser);
        }

    });
});

//FIND ALL USERS
router.get('/', function (req, res) {
    User.find('users', function (err, users) {
        if (err) return res.send(err);
        res.status(200).send(users);
    });
});

//UPDATE A USER
router.put("/:id", function (req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, function (err, updatedUser) {
        if (err) {
            res.send(err);
        } else {

            res.status(200).send(updatedUser);
        }
    });
});

// CREATE USER
router.post("/", function (req, res) {
    var newUser = new User({
        _id: req.body._id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        isAuth: req.body.isAuth
    });
    User.create(newUser, function (err, user) {
        if (err) {
            res.send(err);
        } else {
            res.status(200).send({ "newUser": newUser });
        }
    });
});

//CLEAR USER
router.put("/", function (req, res) {
    User.updateMany(req.body, { $set: { "team": null } }, function (err, users) {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({ "users": users });
        }
    });
});

// DESTROY A USER
router.delete("/", function (req, res) {
    User.deleteOne({ "_id": req.body._id }, function (err) {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send("User detroyed")
        }

    });
});

module.exports = router;
