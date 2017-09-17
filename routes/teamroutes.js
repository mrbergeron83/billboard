var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Team = require('../models/team');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

//GET ALL TEAMS
router.get('/', function (req, res) {
    Team.find('teams', function (err, teams) {
        if (err) {
            return res.send(err);
        } else {
            res.status(200).send(teams);
        }
    });
});

//GET SINGLE TEAM
router.get('/:id', function (req, res) {
    Team.findById(req.params.id, function (err, foundTeam) {
        if (err) {
            return res.send(err);
        } else {
            res.status(200).send(foundTeam);
        }
    });
});

// CREATE NEW TEAM
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
            res.status(200).send("New team created...");
        }
    });
});

// UPDATE TEAM
router.put("/info/:id", function (req, res) {
    Team.findByIdAndUpdate(req.params.id, req.body, function (err, updatedTeam) {
        if (err) {
            res.send(err);
        } else {
            res.status(200).send("Team date succesfully saved...");
        }
    });
});

// UPDATE TEAM MEMBER
router.put("/:id", function (req, res) {
    Team.findByIdAndUpdate(req.params.id, { $addToSet: { teamMembers: req.body } }, { unique: true }, function (err, updatedTeam) {
        if (err) {
            res.send(err);
        } else {
            res.status(200).send("Member succesfully added...");
        }
    });
});

// REMOVE TEAM MEMBER
router.put("/", function (req, res) {
    Team.updateMany({}, { $pull: { teamMembers: req.body } }, function (err, item) {
        if (err) {
            res.send(err)
        } else {
            res.status(200).send("User sucessfully removed...");
        }
    })
});

// UPDATE TEAM MEMBER
router.put("/delete/:id", function (req, res) {
    Team.findByIdAndUpdate(req.params.id, { $pull: { teamMembers: req.body } }, { unique: true }, function (err, updatedTeam) {
        if (err) {
            res.send(err);
        } else {
            res.status(200).send("User sucessfully removed...");
        }
    });
});

// DESTROY A TEAM
router.delete("/", function (req, res) {
    Team.deleteOne({ "_id": req.body._id }, function (err) {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send("Team detroyed")
        }

    });
});

module.exports = router;
