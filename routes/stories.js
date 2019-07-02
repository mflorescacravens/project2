const express = require('express');
const router = express.Router();
const db = require('../models');

// GET /tags - index - show all the tags!


// POST /tags - post them
router.post('/', function (req,res) {
    db.stories.findByPk(parseInt(req.stories.postId)).then( function(story) {
        db.tag.findOrCreate({
            where: {
                name: req.body.story
            }
        }).spread( function(tag, created) {
            if (!created) console.log('it was not created dawg')
            post.addTag(tag).then( function(tag) {
                console.log(`${tag} added to ${post}`);
                res.redirect('/posts/' + req.body.postId)
            })
        })
    })
})


// GET /tags/:id - show one tags and its associated posts


module.exports = router;