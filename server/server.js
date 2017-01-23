"use strict";

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

/* get home page */
app.use(express.static("../server"));
app.use(express.static("../app"));
app.use(express.static("../app/html"));

// to enable processing of the received post content
app.use(bodyParser.urlencoded({extended: true}));

var config = {
    httpPort: 3000,
    mongoPort: 27017
}

/* database schema */
var featureSchema = mongoose.Schema({
    name: String,
    dateInserted: Date,
    data: {}
});

var scriptSchema = mongoose.Schema({
  name: String,
  dateInserted: Date,
  data: {}
});

var Feature = mongoose.model('Feature', featureSchema);

var Script = mongoose.model('Script', scriptSchema)

/* database connection */
mongoose.connect('mongodb://localhost:' + config.mongoPort + '/GAIA');
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

// takes a json document via POST, which will be added to the database
// and the already existing document will be updated by the new
// name is passed via URL
// url format: /updateFeature?name=*
app.post('/updateFeature*', function(req, res) {
	var title = req.url.substring(20, req.url.length);
	Feature.update(
		{ name: title },
		{$set: { data: req.body } },
		function(error){
		var message = error ? 'failed to update feature: ' + error
							: 'feature updated: ' + title;
		console.log(message + ' from ' + req.connection.remoteAddress);
		res.send(message);
	});
	console.log("update successfull");
});

app.post('/renameFeature*', function(req, res) {
	var title = req.url.substring(20, req.url.length);
	Feature.update(
		{ name: title },
		{$set: { name: req.body }},
		function(error){
		var message = error ? 'failed to update feature: ' + error
							: 'feature updated: ' + title;
		console.log(message + ' from ' + req.connection.remoteAddress);
		res.send(message);
	});
	console.log("update successfull");
});

//db.students.update( { _id: 1 }, { $rename: { 'nickname': 'alias', 'cell': 'mobile' } } )
// takes a json document via POST, which will be added to the database
// and the already existing document will be updated by the new
// name is passed via URL
// url format: /updateFeature?name=*
app.post('/deleteFeature*', function(req, res) {
	var title = req.url.substring(20, req.url.length);
	Feature.remove(
		{ name: title},
		function(error){
		var message = error ? 'failed to delete feature: ' + error
							: 'feature deleted: ' + title;
		console.log(message + ' from ' + req.connection.remoteAddress);
		res.send(message);
	});
	console.log("delete successfull");
});

app.get('/execScript', function(req, res) {
  var childProcess = require('child_process');
  childProcess.exec('Rscript test.R', function (err, stdout, stderr) {
          if (err) {
          console.error(err);
          console.log("ERROR :(");
          return;
      }
      console.log("hey");
      console.log(stdout);
  })
});

var fs = require('fs');
// add Folder for project to node db
app.post('/addFolder*', function(req, res) {
  var projecttitle = req.url.substring(16, req.url.length);
  var dir = '../projects/'+ projecttitle;

  if (!fs.existsSync(dir)) {

    fs.mkdir(dir, function(error) {
      if (error) {
        console.error(error);
        res.send(error);
      } else {
        folderStructure(projecttitle);
        console.log("Directory created successfully!");
        res.send('folder added: ' + projecttitle);
      }
    })
  }
  // else {                         //TODO: error not defined ?! how to fix?
  //   // console.log(error);
  //   res.send(error);
  // }
});

// when add project folder also create deeper structure
function folderStructure(foldertitle) {
  var folderStructure = new Array();
  folderStructure = ["Scripts", "Images", "Results"];
  console.log(folderStructure);

  for (var i = 0; i < folderStructure.length; i++) {
    fs.mkdir('../projects/'+ foldertitle + '/' + folderStructure[i], function(err) {
      // path exists unless there was an error
      console.log("added folder: " + foldertitle +  '/' + folderStructure[i]);
    })
  }
};

// gives back array of folder names
var folderFiles = new Array();
app.get('/readFolder*', function(req, res) {
  var projecttitle = req.url.substring(17, req.url.length);
  var dir = '../projects/'+ projecttitle;

  fs.readdir(dir, function (error, files) {
    files.forEach(file => {
      console.log(file);
      folderFiles.push(file);
    });
    if (error) return console.error(error);
    res.send(folderFiles);
  })
});

// delete project folder
app.post('/deleteProjectFolder*', function(req, res) {
  var projecttitle = req.url.substring(26, req.url.length);
  var dir = '../projects/'+ projecttitle;

  deleteFolderRecursive(dir);

});

// delete file recursive
var deleteFolderRecursive = function(path) {
if( fs.existsSync(path) ) {
  fs.readdirSync(path).forEach(function(file, index){
    var curPath = path + "/" + file;
    if(fs.lstatSync(curPath).isDirectory()) { // recurse
      deleteFolderRecursive(curPath);
    } else { // delete file
      fs.unlinkSync(curPath);
    }
  });
  fs.rmdirSync(path);
}
};

// launch server
app.listen(config.httpPort, function(){
    console.log('serverruns on  ' + config.httpPort);
});
