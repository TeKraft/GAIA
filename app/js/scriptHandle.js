"use strict;"
//Globals
var input;
var currentScript;
var currentProject = document.cookie.split("=");
var temp;

/**
  * @desc Function for creating a new .R file.
  *       Empty or with the content of the textarea from work.html
  * @param name : name of the script
*/
var createScript = function(name){
  //Content of textarea
  input = document.getElementById('scriptIn').value;
  getProjectbyName(currentProject[3]);
  addScript(loadedProject,name);
  currentScript = name;
  document.location.href = "work.html";
}

/**
  * @desc Function for saving the contents of the textarea .R file
*/
var saveScript = function(){
  if(aktScript == undefined){
      alert("kein Script ausgewaehlt!");
      return;
  }
  
  saved = true;
  //Content of textarea
  var content = document.getElementById("scriptIn").value;
  editFile(content);
}

/**
  * @desc Function for editing an existing .R file via AJAX.POST request
  * @param newContent: content of the textarea
  * @return AJAX success or error
*/
var editFile = function(newContent){
  var namevomScript = aktScript;
  var projectName = document.cookie.split("=")[3];
  var data = {
    "script" : "" + newContent  + "" ,
    "scriptName"  : "" + namevomScript + "",
    "projectName"  : "" + projectName + "",
  }

  var url = localhost + '/updateFile?name' + projectName +"/Scripts/" + namevomScript;
  //AJAX.POST request with new file content
  $.ajax({
    type: 'POST',
    url: url,
    data:data,
    timeout: 5000,
    success: function (data, textStatus) {
      console.log("success");
      alert("Script saved");
    },
    error: function (xhr, textStatus, errorThrown) {
      console.log("error by creating folder");
    }
  });
};

/**
  * @desc Function for adding scripts to the project
  * @param project: current projectname , name : name of the added script
*/
var addScript = function(project,name){
  //Check if the user is in a project
  if(project === undefined){
    return;
  }

  //temp variables for storing information
  var tempCreator = project.data.Creator;
  var tempCollaborators = project.data.Colaborators;
  var tempDateien = project.data.Dateien;
  var tempErgebnisse = project.data.Ergebnis;
  var tempScripts = project.data.Scripts;

  tempScripts.concat("," + name);

  //generating new Project from temp variables
  var neuesProject = {
    Creator: "" + tempCreator,
    Colaborators:"" + tempCollaborators,
    Scripts:"" + tempScripts,
    Dateien:"" + tempDateien,
    Ergebnis:"" + tempErgebnisse,
  }
}


var newScript = function(){
  
        var scriptName = prompt("Please enter a name");
        var file = new File([""], "");
        var formData = new FormData();
        if(scriptName == "" || scriptName == undefined){
            return;
        }
        formData.append('uploads[]', file, scriptName+".R");
        var currProjName = document.cookie.split("=")[3];
        var currProjFolder = "Scripts"; // oder Images1 oder Results

        var url = localhost + '/upload?folder=' + currProjFolder + '?project=' + currProjName;
        $.ajax({
          url: url,
          type: 'POST',
          data: formData,
          processData: false,
          contentType: false,
          success: function(data){
              console.log('upload successful!\n' + data);
          },
        error: function (xhr, textStatus, errorThrown) {
            console.log("no success");
        }
        });

    createScript(scriptName);
}

function readProjectFolderbyName(name) {    //name
  if (name == "") {
    console.log("value empty");
  }  else {

      var path = "" + name;
    //var folderRead = name;
    //console.log("readProjectFolder("+folderRead+")");

    var url = localhost + '/readFolder?name=' + path;
    // perform post ajax
    $.ajax({
        type: 'GET',
        url: url,
        async:false,
        timeout: 5000,
        success: function (content, textStatus) {
            //console.log(content);
            temp = content;
            //cb(content);
            return content;
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log("no success");
        }
    });
  }
};

function cb(p){
    return p;
}




var deleteScript = function(){
    if (confirm("Are you sure?") == true) {

        } else {
            return;
        }
    var url = localhost + '/deleteFile';
    var namevomScript = aktScript;
    var projectName = document.cookie.split("=")[3];
    var data = {
        "scriptName"  : "" + namevomScript + "",
        "projectName"  : "" + projectName + "",
    }

    $.ajax({
        type: 'POST',
        url: url,
        data:data,
        //inhalt:data,
        timeout: 5000,
        success: function (data, textStatus) {
            console.log("success");
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log("error by creating folder");
        }
    });
    document.location.href = "work.html";
};
