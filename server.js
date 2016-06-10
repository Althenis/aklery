var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    dotenv = require('dotenv'),
    mongojs = require('mongojs');

// Load environment variables from .env at project root
dotenv.load();

// Connect to db
var db = mongojs('aklery');

db.on('error', function (err) {
    console.log('database error', err)
});

db.on('connect', function () {
    console.log('database connected')
});

var app = express();
app.use(express.static(__dirname + "/public"));

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// rewrite for html5mode
app.all('/*', function(req, res) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('index.html', { root: __dirname + '/public' });
});

// Set server port to listen
app.set('port', (process.env.PORT || 3000));

// Run the server 
app.listen(app.get('port'), function() {
   console.log('Server running on: ' + app.get('port'));
});
