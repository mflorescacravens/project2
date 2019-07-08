const express = require('express');
const router = express.Router();
const db = require('../models');

//! need to show all categories for each story
router.get('/', function(req,res) {
    db.category.findAll().then(function(categories) {
        res.render('../views/categories', {categories})
    });
});

//* add a category to a story - This works YAY!
router.post('/', function(req, res) {
    let newCat = {
        name: req.body.catName,
        userId: req.user.id
    }
    db.category.findOrCreate({
        where: newCat
    }).spread(function(category, created) {
        db.story.findOrCreate({
            where: {
                id: parseInt(req.params.id),
                name: req.body.name,
                url: req.body.url
            }
        }).spread(function(story, created) {
            // not sure what to do here
            category.addStory(story).then(function(data) {
                res.redirect('/categories')
            })
        })
    })
});

// delete a category
router.delete('/:id', function(req, res) {
    db.category.destroy({
        where: {id: parseInt(req.params.id)}
    }).then(function(data) {
        res.redirect('/categories');
    });
});


router.get('/:id', function(req, res) {
    db.category.findByPk(parseInt(req.params.id), {
        include: [db.story]
    })
    .then(function(category) {
        res.render('category', {category})
    });
});

router.put('/:id', function(req, res) {
    db.category.update({
        name: req.body.newName
    }, {
        where: {id: parseInt(req.params.id)}
    }).then(function(category) {
        res.redirect('/categories/' + req.params.id);
        })
})

// GET show one category and all stories with category
router.get('/user/:id', function(req,res) {
    db.category.findOne({
        where: {id: parseInt(req.params.id)},
        include: [db.user]
    }).then(function(stories) {
        res.render('../views/profile', {story})
    });
});

module.exports = router;