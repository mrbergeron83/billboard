var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Post = require('../models/post');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.post("/", function(req, res){
    
    var newPost = new Post({
        ownerId: req.body.ownerId,
        name: req.body.name,
        title: req.body.title
    });
    Post.create(newPost, function(err, post){
        if(err){
            res.send(err);
        } else {
            res.send({"postData": newPost});
        }
    });
});

router.get('/', function (req, res) {
    Post.find('posts', function (err, posts) {
        if (err) return res.status(500).send("There was a problem finding the posts.");
        res.status(200).send(posts);
    });
});

module.exports = router;
