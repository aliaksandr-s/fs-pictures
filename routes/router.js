const express = require('express'),
      router = express.Router(),
      MongoClient = require('mongodb').MongoClient,
      ObjectID = require('mongodb').ObjectID;

router.get('/', (req, res) => {
    res.send('API')
})

module.exports = router;