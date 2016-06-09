var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser');
    
var app = express();
app.use(express.static(__dirname + "/public"));

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set server port to listen
app.set('port', (process.env.PORT || 3000));

// Run the server 
app.listen(app.get('port'), function() {
   console.log('Server running on: ' + app.get('port'));
});
