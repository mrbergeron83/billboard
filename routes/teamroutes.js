var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Team = require('../models/team');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.post("/", function (req, res) {

    var newTeam = new Team({
        teamName: req.body.teamName,
        description: req.body.description,
        train: req.body.train,
        type: req.body.type,
        project: req.body.project,
        mission: req.body.mission,
        milestone: req.body.milestone,
        nextSprint: req.body.nextSprint,
        scrumMaster: req.body.scrumMaster,
        productOwner: req.body.productOwner,
    });
    Team.create(newTeam, function (err, team) {
        if (err) {
            res.send(err);
        } else {
            res.send({ "teamData": newTeam });
        }
    });
});

router.put("/:id", function (req, res) {
    //find/update
    Team.findByIdAndUpdate(req.params.id, {$push: {teamMembers: req.body}},{safe: true, upsert: true}, function (err, updatedTeam) {
        if (err) {
            res.status(500).send("ERRORRRRRRR");
        } else {
            
            res.status(200).send(req.params);
        }
    });
});

router.get('/', function (req, res) {
    Team.find('teams', function (err, teams) {
        if (err) return res.status(500).send("There was a problem finding the teams.");
        res.status(200).send(teams);
    });
});

module.exports = router;
