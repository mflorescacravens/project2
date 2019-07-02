const express = require('express');
const db = require('../models');
const router = express.Router();

// router.get('/', function(req,res) {
//     db.user.findAll().then(function(stories) {
//         res.render('index', {stories})
//     });
// });

router.get('/', function(req,res) {
    res.send('here i am');
})