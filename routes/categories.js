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
        name: req.body.catName
    }
    db.category.create(newCat).then(function(category) {
        res.redirect('/');
    });
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
    db.category.findByPk(parseInt(req.params.id))
    .then(function(category) {
        res.render('../views/category', {category})
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



module.exports = router;