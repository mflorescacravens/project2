const express = require('express');
const db = require('../models');
const router = express.Router();

router.post('/', function(req,res) {
    db.story.findOrCreate({
        where: {
            title: req.body.url,
            

        }
    })
}
)