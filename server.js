var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    dotenv = require('dotenv'),
    mongojs = require('mongojs'),
    multer  = require('multer');

// Load environment variables from .env at project root
dotenv.load();
var db = mongojs('aklery', ['posts']);


// db.posts.save({test:'test'});

// var posts = require('./routes/posts');


var app = express();
app.use(express.static(__dirname + "/public"));
// require('./routes/posts')(db);
// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// app.get('/posts', require('./routes/posts'));

app.get('/posts', function(req, res) {
    console.log('fetching posts');
    db.posts.find(function(err, docs) {
        console.log(docs);
        res.json(docs);
    });
});

app.post('/posts/add', function(req, res) {
    var username = req.body.username;
    var title = req.body.title;
    var description = req.body.description;
    var image = req.body.image;
    var comments = {};
    
    var post = {
        username: username,
        title: title,
        description: description,
        image: image,
        createdAt: new Date(),
        comments: comments
    };
    
    db.posts.save(post);
    
    console.log(title, " ", description);
});

//rewrite for html5mode
app.all('/*', function(req, res) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('index.html', {
        root: __dirname + '/public'
    });
});

// Set server port to listen
app.set('port', (process.env.PORT || 3000));

// Run the server 
app.listen(app.get('port'), function() {
    console.log('Server running on: ' + app.get('port'));
});

module.exports = app;