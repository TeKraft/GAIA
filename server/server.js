"use strict";

// Loading all required packages.
var archiver = require('archiver');
var bodyParser = require('body-parser');
var express = require('express');
var formidable = require('formidable');
var fs = require('fs');
var mongoose = require('mongoose');
var path = require('path');
var app = express();

// gives back array of folder names.
var folderFiles = new Array();

/* give access to following folders */
app.use(express.static("../server"));
app.use(express.static("../app"));

// to enable processing of the received post content
app.use(bodyParser.urlencoded({
    extended: true
}));

// configuration
var config = {
    httpPort: 3000,
    mongoPort: 27017
};

// database schema
var featureSchema = mongoose.Schema({
    name: String,
    dateInserted: Date,
    data: {}
});

var Feature = mongoose.model('Feature', featureSchema);

/*
 * #############################################################################
 * database connection #########################################################
 * #############################################################################
 */
mongoose.connect('mongodb://localhost:' + config.mongoPort + '/GAIA');
var database = mongoose.connection;

database.on('error', console.error.bind(console, 'connection error:'));
database.once('open', function (callback) {
    console.log('connection to database established on port ' + config.mongoPort);
});

app.use(express.static(path.join(__dirname, 'app')));

// launch server
app.listen(config.httpPort, function () {
    console.log('serverruns on port ' + config.httpPort);
});


/* http routing. */
// log code which is executed on every request
app.use(function (req, res, next) {
    console.log(req.method + ' ' + req.url + ' was requested by ' + req.connection.remoteAddress);
    res.header('Access-Control-Allow-Origin', '*'); // allow CORS
    next();
});

/*
 * #############################################################################
 * feature options #############################################################
 * #############################################################################
 */

/**
  * @desc AJAX.GET on server for requesting all Features.
  *       find all Features and send to client
  *       url format: /getFeatures
  * @return featuredata or error
  */
app.get('/getFeatures', function (req, res) {
    Feature.find(function (error, features) {
        if (error) return console.error(error);
        res.send(features);
    });
});

/**
  * @desc AJAX.POST on server for adding a Feature
  *       takes a json document via POST, which will be added to the database
  *       name is passed via URL
  *       url format: /addFeature?name=
  * @return featuredata or error
  */
app.post('/addFeature*', function (req, res) {
  var feature = new Feature({
      name: req.url.substring(17, req.url.length), // extract name from url
      dateInserted: new Date(),
      data: req.body
  });
  feature.save(function (error) {
      var message = error ? 'failed to save feature: ' + error : 'feature saved: ' + feature.name;
      res.send(message);
  });
});

/**
  * @desc AJAX.POST on server for updating a Feature
  *       takes a json document via POST, which will be added to the database
  *       and the already existing document will be updated by the new
  *       name is passed via URL
  *       url format: /updateFeature?name=*
  * @return message with success or error
  */
app.post('/updateFeature*', function (req, res) {
  var title = req.url.substring(20, req.url.length);  // extract name from url
  Feature.update(
    {name: title},
    {$set:
      {data: req.body}
    },
    function (error) {
      var message = error ? 'failed to update feature: ' + error : 'feature updated: ' + title;
      res.send(message);
    });
});

/**
  * @desc AJAX.POST on server for deleting a Feature
  *       takes a json document via POST, which will be added to the database
  *       and the already existing document will be updated by the new
  *       name is passed via URL
  *       url format: /deleteFeature?name=*
  * @return message with success or error
  */
app.post('/deleteFeature*', function (req, res) {
    var title = req.url.substring(20, req.url.length);
    Feature.remove({
        name: title
    },
    function (error) {
        var message = error ? 'failed to delete feature: ' + error : 'feature deleted: ' + title;
        res.send(message);
    });
});

/*
 * #############################################################################
 * execute Rscripts ############################################################
 * #############################################################################
 */

/**
  * @desc AJAX.POST on server for executing Scripts.
  *       Execution of R-Scripts is achieved by using nodes "childProcess".
  * @return the result of the executed R-Script will be added to the project/Results folder
  */
app.post('/execScriptCallback', function (req, res) {
  //instantiate a childProcess
  var childProcess = require('child_process');
  var project = req.body.project;
  var script = req.body.script;
  //EXEC-function: Basically the same as executing a local Rscript via commandlines.
  //cwd changes the current working directory so the results dont spawn where the serverjs is
  //but rather where the results should be stored.
  childProcess.exec('Rscript ../Scripts/'+script+'',{cwd: '../app/projects/' + project + '/Results/'}, function (error, stdout, stderr) {
    console.log("stdout == " + stdout);
    console.log("stderr == " + stderr);
    if (error) {
      res.send(stderr);
      return console.error(error);
    }else {
      res.send("Script is done!  " + stdout );
    }
  });
});

/**
  * #############################################################################
  * prepend file ################################################################
  * #############################################################################
  */
  /**
    * @desc AJAX.POST on server for executing Scripts.
    *       Execution of R-Scripts is achieved by using nodes "childProcess".
    * @return the result of the executed R-Script will be added to the project/Results folder
    */
  app.post('/callMeMaybe', function (req, res) {
    var data = req.body;
    var thisScript = 'temp' + data.scriptName; //temporary script created for analysis
    var thisProject = data.project; // projecttitle
    var thisScriptData = data.scriptData; // data of script
    var filePath = '../app/scriptsR/tempData/' + thisScript; // path of tempScript
    var newfilePath = '../../../scriptsR/tempData/' + thisScript; // path for working directory

    console.log(thisScript + "\n" + thisProject + "\n" + filePath + "\n" + thisScriptData);

    fs.writeFile(filePath, thisScriptData, function (err) {
    if (err) {throw err}
    else {

      //instantiate a childProcess
      var childProcess = require('child_process');
      var project = thisProject;
      var script = thisScript;
      //EXEC-function: Basically the same as executing a local Rscript via commandlines.
      //cwd changes the current working directory so the results dont spawn where the serverjs is
      //but rather where the results should be stored.
      childProcess.exec('Rscript ' + newfilePath + '',{cwd: '../app/projects/' + project + '/Results/'}, function (error, stdout, stderr) {
        if (error) {
          res.send(error);
        }else {
          console.log(stdout);
          res.send(""+stdout);
        }
      });
    }
    // res.send("file updated: " + script);
    });

  });


/**
  * @desc Function to prepend data to a file
  * @return
  */
var prependFile = require('prepend-file');
function prependData(path) {
  var path = '../app/scriptsR/writeCSV.R';
  app.post('/prependMyFile', function(req, res) {
    var dataToPrepend = 'options(repos=c("CRAN" ="http://cran.uni-muenster.de"))\n\n# install.packages("curl")\n# install.packages("raster")\n# install.packages("intervals")\n\ninstall.packages("devtools")\ndevtools::install_github("Paradigm4/SciDBR")\ndevtools::install_github("appelmar/scidbst", ref="dev")\ninstall.packages("gdalUtils") # requires GDAL with SciDB driver (see https://github.com/appelmar/scidb4gdal/tree/dev) on the system:\n\nSCIDB_HOST = "128.176.148.9"\nSCIDB_PORT = 30011 # TODO\nSCIDB_USER = "gaia" # TODO\nSCIDB_PW   =  "sNcquwM42RsQBtZqkpeB4HqK" # TODO\n\n# We do not want to pass connection details information in every single gdal_translate call und thus set it as environment variables\nSys.setenv(SCIDB4GDAL_HOST=paste("https://",SCIDB_HOST, sep=""),\nSCIDB4GDAL_PORT=SCIDB_PORT,\nSCIDB4GDAL_USER=SCIDB_USER,\nSCIDB4GDAL_PASSWD=SCIDB_PW)\n\nlibrary(scidbst)\nscidbconnect(host=SCIDB_HOST,port = SCIDB_PORT,\nusername = SCIDB_USER,\npassword = SCIDB_PW,\nauth_type = "digest",\nprotocol = "https")\n\nscidbst.ls(extent=TRUE) # query available datasets\n\n# Insert your code here\n\n';
    prependFile(path, dataToPrepend, function (err) {
        if (err) {
            console.log("error");
        }
        // Success
        console.log('The "data to prepend" was prepended to file!');
    });
  })
};


/*
 * #############################################################################
 * create sciDBdata ############################################################
 * #############################################################################
 */

/**
  * @desc AJAX.GET on server for executing writeCSV.R
  *       Execution of writeCSV.R is achieved by using nodes "childProcess"
  *       url format: /getsciDBdata
  * @return result will be the datasets.csv with information about in sciDB saved datasets
  */
// get sciDB data as csv
app.get('/getsciDBdata', function (req, res) {
    var childProcess = require('child_process');
    childProcess.exec('Rscript ../scriptsR/writeCSV.R',{cwd: '../app/scriptsR/'}, function (error, stdout, stderr) {
      if (error) {
        res.send(stderr);
        return console.error(error);
      }else {
        res.send("worked1");
      }
    })
});

/*
 * #############################################################################
 * folder options ##############################################################
 * #############################################################################
 */

/**
  * @desc AJAX.POST on server for creating a folder in filesystem.
  *       create folder in a projects folder
  *       url format: /addFolder?name=
  * @return message with succes or error
  */
app.post('/addFolder*', function (req, res) {
    var projecttitle = req.url.substring(16, req.url.length); // extract projecttitle from url
    var dir = '../app/projects/' + projecttitle;

    if (fs.existsSync(dir)) {
        console.log("Directory exists already. Please choose a different name!");
        // TODO: what if error?
    } else {
        fs.mkdir(dir, function (error) {
            if (error) {
                return console.error(error);
                // res.send(error);
            } else {
                folderStructure(projecttitle);  // create also deeper folder structure for new created project
                res.send('folder added: ' + projecttitle);
            }
        })
    }
});

/**
  * @desc Function to add folderstructure to folder
  *       when add project folder also create deeper structure
  * @param foldertitle {String} title of project
  * @return create folder structure or message error
  */
function folderStructure(foldertitle) {
    var folderStructure = new Array();
    folderStructure = ["Scripts", "Images", "Results"];

    for (var i = 0; i < folderStructure.length; i++) {
        fs.mkdir('../app/projects/' + foldertitle + '/' + folderStructure[i], function (err) {
            // path exists unless there was an error
            console.log("added folder: " + foldertitle + '/' + folderStructure[i]);
            // TODO: if (err) {console.error(err)}
        })
    }
};

/**
  * @desc AJAX.GET on server for reading a folder in filesystem.
  *       read folder
  *       url format: /readFolder?name=
  * @return send filenames as array or message error
  */
app.get('/readFolder*', function(req, res) {
  var projecttitle = req.url.substring(17, req.url.length); // extract projecttitle from url
  var dir = '../app/projects/'+ projecttitle;

  fs.readdir(dir, function (error, files) {
    if (files == undefined) {
      return console.error(error);
    }else {
        folderFiles = [];
      files.forEach(file => {
        folderFiles.push(file); // create array of filenames in folder
      });
      if (error) return console.error(error);
        res.send(folderFiles);
    }
  })
});

/**
  * @desc AJAX.POST on server for deleting a projectfolder.
  *       delete projectfolder
  *       url format: /deleteProjectFolder?name=
  * @return // TODO: return
  */
app.post('/deleteProjectFolder*', function (req, res) {
    var projecttitle = req.url.substring(26, req.url.length); // extract projecttitle from url
    var dir = '../app/projects/' + projecttitle;
    deleteFolderRecursive(dir); //delete folder
    res.send("folder deleted: " + projecttitle);
    // TODO: error??
});

/**
  * @desc Function to delete a folder of given path
  *       delete projectfolder
  * @param path {String} folderpath
  * @return
  */
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

/*
 * #############################################################################
 * file options ################################################################
 * #############################################################################
 */

/**
  * @desc AJAX.GET on server for reading a file.
  *       read file
  *       url format: /readFile?name=
  * @return send filedata or message error
  */
app.get('/readFile*', function(req, res) {
  var projecttitle = req.url.substring(15, req.url.length); // extract projecttitle from url
  var dir = '../app/projects/'+ projecttitle;

  fs.readFile(dir, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
      res.send(data);
  });
});

/**
  * @desc AJAX.POST on server for updating a file.
  *       update file
  *       url format: /updateFile?name=
  * @return send filedata or message error
  */
app.post('/updateFile*', function (req, res) {
    var projecttitle = req.url.substring(16, req.url.length); // extract projecttitle from url
    var scriptName = req.body.scriptName;
    var projectName = req.body.projectName;
    var data = req.body.script;

    var dir = '../app/projects/' + projecttitle;
    var filePath = "../app/projects/" + projectName + "/Scripts/" + scriptName;
    fs.writeFile(filePath , data, function (err) {
    if (err) throw err;
    res.send("file updated: " + scriptName);
    });
});

/**
  * @desc AJAX.POST on server for deleting a file.
  *       delete file
  *       url format: /deleteFile?name=
  * @return send filedata or message error
  */
app.post('/deleteFile', function (req, res) {
    var projecttitle = req.url.substring(16, req.url.length); // extract projecttitle from url
    var scriptName = req.body.scriptName;
    var projectName = req.body.projectName;

    fs.unlink("../app/projects/" + projectName + "/Scripts/" + scriptName , function (err) {
    if (err) throw err;
    res.send("file deleted: " + scriptName);
    });
});

/*
 * #############################################################################
 *  upload folder ###############################################################
 * #############################################################################
 */

/**
  * @desc AJAX.POST on server for uploading data into projectfolder.
  *       upload of script, image, result
  *       url format: /upload?folder=
  * @return message with success or error
  */
app.post('/upload*', function (req, res) {
    var currentFolder = req.url.substring(15, 22); // extract foldertitle from url
    var currentProject = req.url.substring(31, req.url.length); // extract projecttitle from url
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
        return console.error(err);
    });
    // once all the files have been uploaded, send a response to the client
    form.on('end', function () {
        res.end('success');
    });
    // parse the incoming request containing the form data
    form.parse(req);
});

/*
 * #############################################################################
 * unique link #################################################################
 * #############################################################################
 */

/**
  * @desc AJAX.GET on server for getting a special feature by name
  *       get data of special feature
  *       url format: /getFeatureByTitle?name=
  * @return requested feature or message error
  */
//get unique link of special feature
app.get('/getFeatureByTitle*', function(req, res) {
  var title = req.url.substring(25, req.url.length); // extract projecttitle from url
  Feature.find({name: title}, function (error, features) {
      if (error) return console.error(error);
      res.send(features);
  });
});

/**
  * @desc AJAX.GET on server for getting a special feature by id
  *       get data of special feature
  *       url format: /getFeatureById?id=
  * @return special feature or message error
  */
app.get('/getFeatureById*', function(req, res) {
  var id = req.url.substring(19, req.url.length); // extract projecttitle from url
  Feature.find({_id: id}, function (error, features) {
      if (error) return console.error(error);
      res.send(features);
  });
});

/**
  * @desc AJAX.GET on server for getting a special feature by unique link for reading purpose
  *       if unique link is inserted - get Feature
  *       url format: /uniqueLink?id=
  * @return requested feature or message error
  */
app.get('/uniqueLink*', function(req, res) {
  var uniqueID = req.url.substring(15, req.url.length); // extract projecttitle from url
  Feature.find({_id: uniqueID}, function (error, features) {
      if (error) return console.error(error);
      if (features[0] == undefined) {
        res.status(404).send("Something went wrong.<br>The project you have requested might be deleted.");
      } else {
        res.sendFile(path.join(__dirname, '../app/workRead.html'));
      }
  });
});

/*
 * #############################################################################
 * zip folder ##################################################################
 * #############################################################################
 */

/**
  * @desc AJAX.POST on server for creating zip
  *       zip projectfolder for download
  *       url format: /zipMyShit
  * @return projecttitle of zipped projectfolder or message error
  */
app.post('/zipMyShit', function(req, res) {
  var data = req.body;
  var output = fs.createWriteStream('../app/projects/' + data.projectName + '.zip');
  var archive = archiver('zip');

  output.on('close', function() {
      console.log(archive.pointer() + ' total bytes' + '\n archiver has been finalized and the output file descriptor has closed.');
  });
  archive.on('error', function(err) {
      throw err;
  });
  archive.pipe(output);
  archive.directory('../app/projects/' + data.projectName, false, { date: new Date() });
  archive.finalize();
  res.send(data.projectName);
});
