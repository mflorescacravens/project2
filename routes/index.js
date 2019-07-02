var express = require('express');
var router = express.Router();
var db = require('../models')
var axios = require('axios')

router.get('/', function(req, res) {
    // TODO: Get all records from the DB and render to view
    // call db.pokemon.findall
    // get data and render it into an ejs
    db.stories.findAll().then(function (data) {
        res.render('index', {data: data});
    });
});

router.post('/login', function(req, res) {
// TODO: Get form data and add a new record to DB
// call db.pokemone.create and pass in the data from the form
// when the promise returns, we need to redirect to /pokemon
db.stories.create({
    name: req.body.name
}).then( function(data) {
    res.redirect('/login')
})
});