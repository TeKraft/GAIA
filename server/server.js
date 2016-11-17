"use strict";

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();
app.use(bodyParser.urlencoded({extended: true})); // to enable processing of the received post content

var config = {
    httpPort: 8080,
    mongoPort: 27017
}


/* database schema */
var profilSchema = mongoose.Schema({
    vorname: String,
    nachname: String,
    email: String,
    passwort: String,
    instution: String,
});
var Feature = mongoose.model('Feature', profilSchema);


/* database connection */
mongoose.connect('mongodb://localhost:' + config.mongoPort + '/ex06DB');
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






// launch server
app.listen(config.httpPort, function(){
    console.log('serverruns on  ' + config.httpPort);
});