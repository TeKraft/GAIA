"use strict";

//Dependencies, requirements that need to be installed (package.json) so that the server operates how it should
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// var R = require('r-script');

var app = express();
/* get home page */
app.use(express.static("../server"));
app.use(express.static("../app"));
// to enable processing of the received post content
app.use(bodyParser.urlencoded({extended: true}));

//Server port configuration
var config = {
    httpPort: 8080,
    mongoPort: 27017
}


// database schema, describes how features are saved in the database
var profilSchema = mongoose.Schema({
    // vorname: String,
    // nachname: String,
    // email: String,
    // passwort: String,
    // institution: String,

    name: String,
    dateInserted: Date,
    data: {}
});
var Feature = mongoose.model('Feature', profilSchema);


/* database connection */
mongoose.connect('mongodb://localhost:' + config.mongoPort + '/gaia');
var database = mongoose.connection;

database.on('error', console.error.bind(console, 'connection error:'));
database.once('open', function (callback) {
  console.log('connection to database established on port ' + config.mongoPort);
});


/* http routing */
// code which is executed on every request
app.use(function(req, res, next) {
    console.log(req.method + ' ' + req.url + ' was requested by ' + req.connection.remoteAddress);

    res.header('Access-Control-Allow-Origin', '*');    // allow CORS
    //res.header('Access-Control-Allow-Methods', 'GET,POST');

    next();
});


//get & post

/* GET home page. */
// app.get('/', function(req, res, next) {
//     console.log("get home");
//   res.render('login');
//   // res.render('../app/html/login&registry');
// });

// respond with "hello world" when a GET request is made to the homepage
// app.get('/', function(req, res) {
//   res.send('hello world');
// });

// returns json of all stored features
app.get('/getFeatures', function(req, res) {
    Feature.find(function(error, features) {
        if (error) return console.error(error);
        res.send(features);
    });
});

// takes a json document via POST, which will be added to the database
// name is passed via URL
// url format: /addFeature?name=
app.post('/addFeature*', function(req, res) {
	console.log(JSON.stringify(req.body));

    var feature = new Feature({
    	name: req.url.substring(17, req.url.length), // extract name from url
    	dateInserted: new Date(),
    	data: req.body
    });
    feature.save(function(error){
        var message = error ? 'failed to save feature: ' + error
                            : 'feature saved: ' + feature.name;
        console.log(message + ' from ' + req.connection.remoteAddress);
        res.send(message);
    });
});




// launch server
app.listen(config.httpPort, function(){
    console.log('serverruns on  ' + config.httpPort);
});
