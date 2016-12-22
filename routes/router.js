const express = require('express'),
    router = express.Router(),
    MongoClient = require('mongodb').MongoClient,
    config = require('../config.js'),
    fs = require('fs'),
    path = require('path'),
    ObjectID = require('mongodb').ObjectID;

// save img to the server
router.post('/save-picture', function(req, res) {
    // get base64 img decode it and save on disc
    var img = req.body.img,
        imgName = req.body.name,
        ext = img.split(';')[0].match(/jpeg|png|gif/)[0],
        base64Data = img.replace(/^data:image\/\w+;base64,/, ""),
        buf = new Buffer(base64Data, 'base64');
    
    fs.writeFile(config.uploadFolder + imgName, buf, function(err, data){
        console.log(path.join(__dirname, '..', config.uploadFolder))
    })

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