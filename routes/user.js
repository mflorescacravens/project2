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
        res.render('categories', {categories});
    });
});




//* don't need this route anymore. Keeping here for reference
// router.post('/favorites', function(req,res) {
//     db.user.findByPk(req.user.id).then(function (user) {
//         db.story.findOrCreate({
//             where: {
//             title: req.body.title,
//             url: req.body.url
//             }
//         }).spread(function (story, created) {
//             user.addStory(story);
//             res.redirect('/')
//         })
//     })
// });

// delete




module.exports = router;