const express = require('express');
const db = require('../models');
const router = express.Router();
const app = express();


router.get('/', function (req,res) {
    res.render('../views/profile.ejs');
});


router.post('/favorites', function(req,res) {
    db.user.findByPk(req.user.id).then(function (user) {
        db.story.findOrCreate({
            where: {
            title: req.body.title,
            url: req.body.url
            }
        }).spread(function (story, created) {
            user.addStory(story);
            res.redirect('/')
        })
    })
});






module.exports = router;