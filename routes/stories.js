const express = require('express');
const router = express.Router();
const db = require('../models');

router.post('/', function(req, res) {
  res.send('you hit the stories route')
});


module.exports = router;