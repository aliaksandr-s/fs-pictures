const express = require('express'),
    router = express.Router(),
    MongoClient = require('mongodb').MongoClient,
    config = require('../config.js'),
    fs = require('fs'),
    path = require('path'),
    ObjectID = require('mongodb').ObjectID;

// save img to the server
router.post('/save-picture', function (req, res) {
    // get base64 img decode it and save on disc
    var img = req.body.img,
        imgName = req.body.name,
        ext = img.split(';')[0].match(/jpeg|png|gif/)[0],
        base64Data = img.replace(/^data:image\/\w+;base64,/, ""),
        buf = new Buffer(base64Data, 'base64');

    fs.writeFile(config.uploadFolder + imgName, buf, function (err, data) {
        //console.log(path.join(config.uploadFolder + imgName))

        // save img name to db --------- rewrite to get rid of duplicates

        // MongoClient.connect('mongodb://localhost:27017/' + config.database, function (err, db) {
        //     if (!err) {
        //         db.collection('pictures').insert({name: imgName}, function (err, result) {
        //             if (result) {
        //                 res.send(result);
        //             }
        //             console.log('saved')
        //         });
        //         db.close();
        //     }
        // })

        res.send('done')

    })

});

router.get('/get-pictures', function (req, res) {
    var images = [];

    fs.readdir(config.uploadFolder, (err, files) => {
        files.forEach(file => {
            images.push(file)
        });
        res.send(images)
    })

    
})

router.get('/', (req, res) => {
    res.send(config.database)
})

module.exports = router;