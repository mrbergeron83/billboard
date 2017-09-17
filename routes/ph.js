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
    teamMembers: [{
        _id: req.body.userId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    }],
    date: { type: Date, default: Date.now },


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
        teamMembers: [{
            _id: String,
            firstName: String,
            lastName: String,
            email: String
        }],
        date: { type: Date, default: Date.now },


        updateTeam() {
            var inputs = Polymer.dom(this.root).querySelectorAll('.tId');
            var arr = []
            var obj = {};
            for (var i = 0; i < inputs.length; i++) {
                arr.push([inputs[i].id, inputs[i].value]);
            }
            arr.forEach(function (data) {
                obj[data[0]] = data[1]
            });
            this.$.updateTeamInfo.body = obj;
            this.$.updateTeamInfo.generateRequest();
            // open toast
        }