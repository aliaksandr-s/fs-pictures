const express = require('express'),
      morgan = require('morgan'),
      bodyParser = require('body-parser'),
      app = express(),
      path = require('path')
      routes = require('./routes/router.js');

// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));

// log all requests to the console 
//app.use(morgan('dev'));

// set static files location
// used for requests that our frontend will make
app.use(express.static(__dirname + '/public'));

// routes for our api
app.use('/api', routes);


// fallback for other router 
app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(8000);
console.log('app is listening on port 8000');