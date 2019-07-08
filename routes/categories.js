const express = require('express');
const router = express.Router();
const db = require('../models');

//! need to show all categories for each story
router.get('/', function(req,res) {
    db.category.findAll().then(function(categories) {
        res.render('../views/categories', {categories})
    });
});

router.post('/', function(req, res) {
    let newCat = {
        name: req.body.catName.toLowerCase(),
        userId: req.user.id
    }
    db.category.findOrCreate({
        where: newCat
    }).spread(function(category, created) {
        db.story.findOrCreate({
            where: {
                title: req.body.title,
                url: req.body.url
            }
        }).spread(function(story, created) {
            category.addStory(story).then(function(data) {
                res.redirect('/categories')
            })
        })
    })
});

router.get('/:id', function(req,res) {
    let id = parseInt(req.params.id);
    db.category.findByPk(id).then(function(category) {
        category.getStories().then(function(stories){
            res.render("category", {category, stories})
        })
    });
})



// delete a category
router.delete('/:id', function(req, res) {
    db.category.destroy({
        where: {id: parseInt(req.params.id)}
    }).then(function(data) {
        res.redirect('/categories');
    });
});


// router.get('/:id', function(req, res) {
//     db.category.findByPk(parseInt(req.params.id), {
//         include: [db.story]
//     })
//     .then(function(category) {
//         res.render('category', {category})
//     });
// });

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
// router.get('/user/:id', function(req,res) {
//     db.category.findOne({
//         where: {id: parseInt(req.params.id)},
//         include: [db.user]
//     }).then(function(stories) {
//         res.render('../views/profile', {story})
//     });
// });



module.exports = router;