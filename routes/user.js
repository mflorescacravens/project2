const express = require('express');
const db = require('../models');
const router = express.Router();
const app = express();


router.get('/', function (req,res) {
    res.render('../views/profile.ejs');
});
// router.post('/', function(req,res) {

//     //     db.story.findOrCreate({
// //         where: {
// //             title: req.body.title,
// //             url: req.body.url

// //         }
// //     })
// // }
// });

module.exports = router;