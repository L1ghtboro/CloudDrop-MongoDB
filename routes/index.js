'use strict';
var express = require('express');
var router = express.Router();

var currentUser = {
    loggedIn: false,
    jwt: '',
}

/* GET home page. */
router.get('/', function (req, res) {
    if (currentUser.loggedIn) {
        res.render('index', { title: 'CloudDrop' });
    } else {
        res.redirect('/login');
    }
    
});

/* GET login page. */
router.get('/login', function (req, res) {
    res.render('login', { title: 'Login CloudDrop' });
});

module.exports = router;
