"use strict";

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var app = express();
var formidable = require('formidable');
var fs = require('fs');
var EasyZip = require('easy-zip').EasyZip;
var zip = new EasyZip();

/* get home page */
app.use(express.static("../server"));
app.use(express.static("../app"));

// to enable processing of the received post content
app.use(bodyParser.urlencoded({
    extended: true
}));

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
app.use(function (req, res, next) {
    console.log(req.method + ' ' + req.url + ' was requested by ' + req.connection.remoteAddress);
    res.header('Access-Control-Allow-Origin', '*'); // allow CORS
    //res.header('Access-Control-Allow-Methods', 'GET,POST');
    next();
});

// returns json of all stored features
app.get('/getFeatures', function (req, res) {
    Feature.find(function (error, features) {
        if (error) return console.error(error);
        res.send(features);
    });
});

// takes a json document via POST, which will be added to the database
// name is passed via URL
// url format: /addFeature?name=
app.post('/addFeature*', function (req, res) {
    console.log(JSON.stringify(req.body));

    var feature = new Feature({
        name: req.url.substring(17, req.url.length), // extract name from url
        dateInserted: new Date(),
        data: req.body
    });
    feature.save(function (error) {
        var message = error ? 'failed to save feature: ' + error : 'feature saved: ' + feature.name;
        console.log(message + ' from ' + req.connection.remoteAddress);
        res.send(message);
    });
});

// takes a json document via POST, which will be added to the database
// and the already existing document will be updated by the new
// name is passed via URL
// url format: /updateFeature?name=*
app.post('/updateFeature*', function (req, res) {
    var title = req.url.substring(20, req.url.length);
    Feature.update({
            name: title
        }, {
            $set: {
                data: req.body
            }
        },
        function (error) {
            var message = error ? 'failed to update feature: ' + error : 'feature updated: ' + title;
            console.log(message + ' from ' + req.connection.remoteAddress);
            res.send(message);
        });
    console.log("update successfull");
});

app.post('/renameFeature*', function (req, res) {
    var title = req.url.substring(20, req.url.length);
    Feature.update({
            name: title
        }, {
            $set: {
                name: req.body
            }
        },
        function (error) {
            var message = error ? 'failed to update feature: ' + error : 'feature updated: ' + title;
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
app.post('/deleteFeature*', function (req, res) {
    var title = req.url.substring(20, req.url.length);
    Feature.remove({
            name: title
        },
        function (error) {
            var message = error ? 'failed to delete feature: ' + error : 'feature deleted: ' + title;
            console.log(message + ' from ' + req.connection.remoteAddress);
            res.send(message);
        });
    console.log("delete successfull");
});

/*
/Function for executing a Rscript on server via childProzess
/
*/
app.post('/execScript', function (req, res) {
  var childProcess = require('child_process');
  var project = req.body.project;
  var script = req.body.script;
  console.log("PROJECT :"+project + "   SCRIPT: " + script);
  childProcess.exec('Rscript ../Scripts/'+script+'',{cwd: '../app/projects/' + project + '/Results/'}, (err) => {
    if (err) {
      console.error(err);
    }
  })
});

// get sciDB data as csv
app.get('/getsciDBdata', function (req, res) {
    var childProcess = require('child_process');
    childProcess.exec('Rscript ../scriptsR/writeCSV.R', function (err, stdout, stderr) {
        if (err) {
            console.log(err);
            return;
        }
    })
});

var fs = require('fs');
// add Folder for project to node db
app.post('/addFolder*', function (req, res) {
    var projecttitle = req.url.substring(16, req.url.length);
    var dir = '../app/projects/' + projecttitle;
    console.log(fs.existsSync(dir));
    if (fs.existsSync(dir)) {
        console.log("Directory exists already. Please choose a different name!")
    } else {
        fs.mkdir(dir, function (error) {
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
        fs.mkdir('../app/projects/' + foldertitle + '/' + folderStructure[i], function (err) {
            // path exists unless there was an error
            console.log("added folder: " + foldertitle + '/' + folderStructure[i]);
        })
    }
};

// gives back array of folder names
var folderFiles = new Array();


app.get('/readFolder*', function(req, res) {
  var projecttitle = req.url.substring(17, req.url.length);
  var dir = '../app/projects/'+ projecttitle;
  console.log(dir);
  fs.readdir(dir, function (error, files) {
    // console.log(files);
    if (files == undefined) {
      // console.log("undefined error");
      return console.error(error); }
    else {
        folderFiles = [];
      // console.log("no error");
      files.forEach(file => {
        // console.log(file);
        folderFiles.push(file);
      });
      if (error) return console.error(error);
        res.send(folderFiles);
    }
  })
});




app.get('/readFile*', function(req, res) {
  var projecttitle = req.url.substring(15, req.url.length);
    console.log(projecttitle);
  var dir = '../app/projects/'+ projecttitle;
    
fs.readFile(dir, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
    res.send(data);
  console.log(data);
});
});
    

// add Folder for project to node db
app.post('/updateFile*', function (req, res) {
    var projecttitle = req.url.substring(16, req.url.length);
    
    var scriptName = req.body.scriptName;
    var projectName = req.body.projectName;
    var data = req.body.script;
    
    //var filedesc = req.desc;
    var dir = '../app/projects/' + projecttitle;
    console.log(fs.existsSync(dir));
    
    //console.log("../app/projects/" + projectName + "/Scripts/" + scriptName);


    
    var filePath = "../app/projects/" + projectName + "/Scripts/" + scriptName;
    console.log("go" + filePath);
    
    fs.writeFile(filePath , data, function (err) {           // "einProjekt/Scripts/"+ "dritteRDatei.R"
    if (err) throw err;
    console.log('It\'s saved!');
    });
});
    

app.post('/deleteFile*', function (req, res) {
    console.log("start");
    var projecttitle = req.url.substring(16, req.url.length);
    
    var scriptName = req.body.scriptName;
    var projectName = req.body.projectName;
    //var data = req.body.script;
    
    //var filedesc = req.desc;
    //var dir = '../app/projects/' + projecttitle;
    //console.log(fs.existsSync(dir));
    
    //console.log("../app/projects/" + projectName + "/Scripts/" + scriptName);


    
    //var filePath = "../app/projects/" + projectName + "/Scripts/" + scriptName;
    //console.log("go" + filePath);
    
    fs.unlink("../app/projects/" + projectName + "/Scripts/" + scriptName , function (err) {           // "einProjekt/Scripts/"+ "dritteRDatei.R"
    if (err) throw err;
    console.log('It\'s deleted!');
    });
});
    
    
   /*
  fs.readdir(dir, function (error, files) {
    // console.log(files);
    if (files == undefined) {
      // console.log("undefined error");
      return console.error(error); }
    else {
      // console.log("no error");
      files.forEach(file => {
        // console.log(file);
        folderFiles.push(file);
      });
      if (error) return console.error(error);
      res.send(folderFiles);
    }
  })
});
*/





// delete project folder
app.post('/deleteProjectFolder*', function (req, res) {
    var projecttitle = req.url.substring(26, req.url.length);
    var dir = '../app/projects/' + projecttitle;

    deleteFolderRecursive(dir);

});

// delete file recursive
var deleteFolderRecursive = function (path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file, index) {
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

// launch server
app.listen(config.httpPort, function () {
    console.log('serverruns on  ' + config.httpPort);
});




///////////////////////////////// upload

app.use(express.static(path.join(__dirname, 'app')));

//app.get('/', function (req, res) {
//    res.sendFile(path.join(__dirname, 'app/work.html'));

//});

// upload of script, image, result
app.post('/upload*', function (req, res) {

    var currentFolder = req.url.substring(15, 22);
    var currentProject = req.url.substring(31, req.url.length);

    // create an incoming form object
    var form = new formidable.IncomingForm();

    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = true;

    // store all uploads in the /uploads directory
    form.uploadDir = path.join(__dirname, '../app/projects/' + currentProject + '/' + currentFolder);

    // every time a file has been uploaded successfully,
    // rename it to it's orignal name
    form.on('file', function (field, file) {
        fs.rename(file.path, path.join(form.uploadDir, file.name));
    });

    // log any errors that occur
    form.on('error', function (err) {
        console.log('An error has occured: \n' + err);
    });

    // once all the files have been uploaded, send a response to the client
    form.on('end', function () {
        res.end('success');
    });

    // parse the incoming request containing the form data
    form.parse(req);
});




//get unique link of special feature
app.get('/getFeatureByTitle*', function(req, res) {
  var title = req.url.substring(25, req.url.length);
  console.log("title=> " + title);
  Feature.find({name: title}, function (error, features) {
      if (error) return console.error(error);
      res.send(features);
  });
});

app.get('/getFeatureById*', function(req, res) {
  var id = req.url.substring(19, req.url.length);
  console.log("id=> " + id);
  Feature.find({_id: id}, function (error, features) {
      if (error) return console.error(error);
      res.send(features);
  });
});

//if unique link - get Feature
app.get('/uniqueLink*', function(req, res) {
  var uniqueID = req.url.substring(15, req.url.length);
  Feature.find({_id: uniqueID}, function (error, features) {
      if (error) return console.error(error);
      console.log(features[0]._id);

      // res.send(features);
      res.sendFile(path.join(__dirname, '../app/workRead.html'));
      // res.send('<p>some html<p>');

      // res.sendfile(../app/workRead.html', {root: __dirname })
  });
});




///////////////////////////////// download



//add text
// zip.file('hello.txt','Hello World！');
// zip.writeToFile('text.zip');//write zip data to disk

//add folder
//var zip2 = new EasyZip();
//var jsFolder = zip2.folder('js');
//jsFolder.file('hello.js','alert("hello world")');
//zip2.writeToFile('folder.zip');

//add file
//var zip3 = new EasyZip();
//zip3.addFile('main.js','easyzip.js',function(){
//    zip3.writeToFile('file.zip');
//});

//batch add files
//var files = [
//    {source : 'easyzip.js',target:'easyzip.js'},
//    {target : 'img'},//if source is null,means make a folder
//    {source : 'jszip.js',target:'lib/tmp.js'}
//];
//var zip4 = new EasyZip();
//zip4.batchAdd(files,function(){
//    zip4.writeToFile('batchadd.zip');
//});



//write data to http.Response
//zip.writeToResponse(response,'attachment.zip');

//write to file sync
//zip.writeToFileSycn(filePath);
