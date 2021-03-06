var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    dotenv = require('dotenv'),
    mongojs = require('mongojs'),
    multer  = require('multer'),
    fs = require('fs'),
    AWS = require('aws-sdk'),
    moment = require('moment');

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });
var image = upload.single('file');
var s3 = new AWS.S3({signatureVersion: 'v4'});



// Load environment variables from .env at project root
dotenv.load();
var db = mongojs('aklery', ['posts']);

var app = express();


db.runCommand({ping: 1}, function (err, res) {
    if(!err && res.ok) {
        console.log('database connected');
    } 
    else {
        console.log('database error', err);
        process.exit(1);
    }
});

app.use(express.static(__dirname + "/public"));
app.use('/scripts', express.static(__dirname + '/node_modules/'));

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Find random document from posts collection
app.get('/posts', function(req, res) {
    
    db.posts.aggregate({ $sample: { size: 1 } }, function(err, doc) {
        // concat image name with s3 address
        doc[0].image = process.env.AWS_S3_BUCKET + doc[0].image;
        res.json(doc);
    });
});

// Find document by id
app.get('/posts/post/:id', function(req, res) {
    console.log(req.params.id);
    var imageId = req.params.id;
    db.posts.findOne({
        _id: mongojs.ObjectId(imageId)
    }, function(err, doc) {
        doc.image = process.env.AWS_S3_BUCKET + doc.image;
        res.json(doc);
    });
});

// Generate a random string to use as image name
function randString(x){
    var s = "";
    while(s.length<x&&x>0){
        var r = Math.random();
        s+= (r<0.1?Math.floor(r*100):String.fromCharCode(Math.floor(r*26) + (r>0.5?97:65)));
    }
    return s;
}

app.post('/comments/add', function(req, res) {
    var username = req.body.username;
    var comment = req.body.comment;
    var id = mongojs.ObjectId(req.body.id);
    
    var newComment = {
        username: username,
        comment: comment,
        createdAt: new Date()
    };
    
    db.posts.update({_id:id}, {$push: {comments: newComment}}, function(err, res) {
        console.log(res);
    });
});

app.post('/posts/add', image, function(req, res) {
    
    var username = req.body.username;
    var title = req.body.title;
    var description = req.body.description;
    var comments = [];
        
    // Get the file extension with dot.
    var extension = req.file.originalname.substr(req.file.originalname.lastIndexOf('.'));
    
    // Generate a random name for the file, appending the extension.
    var name = randString(10) + extension;

    var date = moment().format('DD-MM-YYYY');
    
    // path / location for image
    var key = date + '/' + name;
    
    var params = {
        ACL: 'public-read',
        Bucket: 'aklery',
        Key: key,
        Body: req.file.buffer,
        ContentType: req.file.mimetype
    };
    s3.upload(params, function(err, data) {
        if (err) {
          console.log("Error uploading data: ", err);
        } else {
          console.log("Successfully uploaded data to", data);
        }
      });
    
    
    var post = {
        username: username,
        title: title,
        description: description,
        image: key,
        createdAt: new Date(),
        comments: comments
    };
    
    // Insert post to DB
    db.posts.save(post);
    res.sendStatus(200);
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