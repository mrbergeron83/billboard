var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    configJS = require('./config'),
    router = express.Router(),
    Promise = require('bluebird'),
    bodyParser = require('body-parser');


var Post = require('./models/post');
var postRoutes = require('./routes/postroutes');
var User = require('./models/user');
var userRoutes = require('./routes/userroutes');


mongoose.Promise = require('bluebird');
mongoose.connect(configJS.dbUrl, {
    useMongoClient: true,
});

router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());

app.use(express.static('./public'));
app.use('/post', postRoutes);
app.use('/users', userRoutes);

app.get('*', function (req, res) {
    res.sendFile('/public/index.html', { root: '.' });
});



app.listen(configJS.port, function () {
    console.log("server running on port " + configJS.port);
});