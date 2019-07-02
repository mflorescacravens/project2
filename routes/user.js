const express = require('express');
const db = require('../models');
const router = express.Router();

router.get('/', function(req,res) {
    db.stories.findAll().then(function(stories) {
        res.render('index', {stories})
    });
});