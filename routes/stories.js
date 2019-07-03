const express = require('express');
const router = express.Router();
const db = require('../models');

router.post('/', function(req, res) {
    // TODO: Get form data and add a new record to DB
    // call db.pokemone.create and pass in the data from the form
    // when the promise returns, we need to redirect to /pokemon
    db.story.findOrCreate({
      name: req.body.story
    }).then( function(data) {
      res.redirect('/pokemon')
    })
    
  });

// GET /tags/:id - show one tags and its associated posts


module.exports = router;