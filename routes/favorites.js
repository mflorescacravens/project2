const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', function(req,res) {
    res.render('../views/favorites.ejs')
});


module.exports = router;