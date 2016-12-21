const express = require('express'),
    router = express.Router(),
    MongoClient = require('mongodb').MongoClient,
    config = require('../config.js'),
    fs = require('fs'),
    path = require('path'),
    ObjectID = require('mongodb').ObjectID;


router.post('/save-picture', function(req, res) {
    // get base64 img decode it and save on disc
    var img = req.body.img,
        ext = img.split(';')[0].match(/jpeg|png|gif/)[0],
        base64Data = img.replace(/^data:image\/\w+;base64,/, ""),
        buf = new Buffer(base64Data, 'base64');
    
    fs.writeFile('image.' + ext, buf)

    // save it to db ---- revrite to save links not the whole file
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