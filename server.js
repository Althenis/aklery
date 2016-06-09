var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser');
    
var app = express();
app.use(express.static(__dirname + "/public"));

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use('/about', express.static(__dirname + 'views/about'));
// app.use('/dist', express.static(__dirname + '/../dist'));
// app.use('/stylesheets', express.static(__dirname + 'public/stylesheets'));
// app.use('/partials', express.static(__dirname + '/partials'));

// rewrite for html5mode
app.all('/*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('index.html', { root: __dirname + '/public' });
});

// Set server port to listen
app.set('port', (process.env.PORT || 3000));

// Run the server 
app.listen(app.get('port'), function() {
   console.log('Server running on: ' + app.get('port'));
});
