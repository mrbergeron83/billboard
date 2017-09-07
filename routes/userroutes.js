var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var User = require('../models/user');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

// Find User
router.get('/:id', function (req, res) {
    User.findById(req.params.id, function (err, foundUser) {
        if (err) {
            return res.status(500).send({ "userStatus": "Couldn't find a user with this ID" });
        } else {
            res.status(200).send(foundUser);
        }

    });
});
// Create User
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
            res.send({ "newUser": newUser });
        }
    });
});



module.exports = router;
