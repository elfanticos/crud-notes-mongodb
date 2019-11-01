'use strict'
const express = require('express'),
      router = express.Router();

router
    .get('/', (req, res) => {
        res.render('index');
    })
    .get('/about', (req, res) => {
        res.render('about');
    })
module.exports = router;