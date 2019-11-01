'use strict'
const express = require('express'),
      router = express.Router();

router
    .get('/signin', (req, res) => {
        res.render('users/signin');
    })
    .get('/signup', (req, res) => {
        res.render('users/signup');
    })
module.exports = router;