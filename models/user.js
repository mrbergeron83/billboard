var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    _id: String,
    isAuth: {type: Boolean, default: false},
    firstName: String,
    lastName: String,
    email: String,
    department: String,
    position: String,
    isAdmin: {type: Boolean, default: false}
});

module.exports = mongoose.model("User", userSchema);