var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    ownerId: String,
    department: String,
    title: String,
    objective: String,
    description: String,
    date: {type: Date, default: Date.now},
    
});

module.exports = mongoose.model("Post", postSchema);