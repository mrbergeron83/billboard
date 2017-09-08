var mongoose = require('mongoose');

var teamSchema = new mongoose.Schema({
    teamName: String,
    description: String,
    train: String,
    type: String,
    project: String,
    mission: String,
    milestone: String,
    nextSprint: String,
    scrumMaster: String,
    productOwner: String,
    teamMembers: [
        {
            _id: String,
            firstName: String,
            lastName: String,
            email: String
        }
    ],
    date: { type: Date, default: Date.now },


});

module.exports = mongoose.model("Team", teamSchema);