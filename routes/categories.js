const express = require('express');
const router = express.Router();
const db = require('../models');

// show all categories on categories page
router.get('/', function(req,res) {
    db.category.findAll().then(function(categories) {
        //! can't figure out why this doesn't work... i want it to go to the categories page and show all categories.
        res.redirect('/categories')
    });
});

// add a category to a story
router.post('/', function(req, res) {
    let newCat = {
        name: req.body.catName
    }
    db.category.create(newCat).then(function(category) {
        res.redirect('/');
    });
});

// delete a category
router.delete('/delete/category', function(req,res) {
    // delete category from a story
    db.category.findByPk().then(function(categories) {
        res.redirect('/')
    })
})


module.exports = router;