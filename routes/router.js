const express = require('express'),
      router = express.Router(),
      MongoClient = require('mongodb').MongoClient,
      config = require('../config.js'),
      ObjectID = require('mongodb').ObjectID;


router.post('/save-picture', function(req, res) {
    MongoClient.connect('mongodb://localhost:27017/' + config.database, function(err, db) {
        if (!err) {
            db.collection('pictures').insert(req.body, function(err, result) {
                if (result) {
                    res.send(result);
                }
                console.log('saved')
            });
            db.close();
        }
    })
});

router.get('/', (req, res) => {
    res.send(config.database)
})

module.exports = router;