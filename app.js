var express = require('express'),
app = express(),
mongoose = require('mongoose'),
config = require('./config'),
router = express.Router(),
bodyParser = require('body-parser');


var promise = mongoose.connect(config.url, {
    useMongoClient: true,
});

router.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('./public'));

app.get('*', function (req, res) {
    res.sendFile('/public/index.html', { root: '.' });
});

app.listen(config.port, function () {
    console.log("server running on port " + config.port);
});