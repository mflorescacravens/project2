const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', function(req,res) {
    db.category.findAll().then(function(categories) {
        res.render('category', {categories});
    });
});




module.exports = router;