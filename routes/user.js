const express = require('express');
const db = require('../models');
const router = express.Router();
const app = express();


router.get('/', function (req,res) {
    res.render('../views/profile.ejs');
});

//! GET show users created categories
router.get('/', function(req,res) {
    db.categories.findAll().then(function(categories) {
        res.render('../views/profile', {categories});
    });
});



module.exports = router;