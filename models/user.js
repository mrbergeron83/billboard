var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    _id: String,    
    firstName: String,
    lastName: String,
    email: String,
    createdAt: {type: Date, default: Date.now},
    isAuth: {type: Boolean, default: false},    
    isAdmin: {type: Boolean, default: false}
});

module.exports = mongoose.model("User", userSchema);