'use strict';
var express = require('express');
var router = express.Router();


/*Make run only on deployment */
//Sample, need to be moved
const { MongoDBConnector }= require('../private/connections/client');

const dbAdmin = process.env.dbAdmin;
const dbPassword = process.env.dbPassword;
const dbName = process.env.dbName;

const makeConnection = new MongoDBConnector(dbAdmin, dbPassword, dbName);

async function onStartApp() {
    await makeConnection.connect();
    await makeConnection.close();
}

onStartApp().catch(console.dir);

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'CloudDrop' });
});

/* GET home page. */
router.get('/upload', function (req, res) {
    res.render('index', { title: 'CloudDrop' });
});

module.exports = router;
