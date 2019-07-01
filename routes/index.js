var express = require('express');
var router = express.Router();
var db = require('../models')
var axios = require('axios')

router.get('/', function(req, res) {
    // TODO: Get all records from the DB and render to view
    // call db.pokemon.findall
    // get data and render it into an ejs
    // 
    db.stories.findAll().then(function (data) {
        res.render('index', {data: data});
    });
  });