"use strict;"

var input;
var currentScript;
var currentProject = document.cookie.split("=");

var createScript = function(name){
    input = document.getElementById('scriptIn').value;

    getProjectbyName(currentProject[3]);

    addScript(loadedProject,name);
    currentScript = name;
    document.location.href = "work.html";
}

// var loadScript1 = function(scriptname){
//     console.log(scriptname);
//     var tempCookie = document.cookie.split("=");
//     var projectname = tempCookie[3];
//     var path = "./projects/" + projectname + "/Scripts/" + scriptname;
//     var content;
//     console.log(path);
//     // hier muss jetzt der inhalt der R datei geladen werden und dann in content eingesetzt werden
//
//
//
//     //document.getElementById("scriptIn").value = "Hier den Inhalt der R Datei einleseen " +  content;
//      $.ajax({
//       url: path,
//       success: function (data){
//             console.log(data);
//             $("#scriptIn").load(data);
//       }
//      })




//     currentScript = scriptname;
//
// }


var saveScript = function(){
    saved = true;
    var content = document.getElementById("scriptIn").value;
    

    //var scriptName = "dritteRDatei.R";
 
    //if(scriptName == "" || scriptName == undefined){
        //return;
    //}
    editFile(content);
}



var editFile = function(newContent){

    
    
    var namevomScript = aktScript;
    var projectName = document.cookie.split("=")[3];
    var data = {
        "script" : "" + newContent  + "" ,
        "scriptName"  : "" + namevomScript + "",
        "projectName"  : "" + projectName + "",
    }
    console.log(document.cookie.split("=")[3]);
    console.log(projectName + "   "  + namevomScript);
    
    
    
    var url = '/updateFile?name' + projectName +"/Scripts/" + namevomScript;  //'http://localhost:3000' 

    $.ajax({
        type: 'POST',
        url: url,
        data:data,
        //inhalt:data,
        timeout: 5000,
        success: function (data, textStatus) {
            console.log(data);
            console.log("success");
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log("error by creating folder");
        }
    });
}






var addScript = function(project,name){
    if(project === undefined){
        return;
    }
    
    console.log(project);
    var tempCreator = project.data.Creator;
    var tempCollaborators = project.data.Colaborators;
    var tempDateien = project.data.Dateien;
    var tempErgebnisse = project.data.Ergebnis;

    var tempScripts = project.data.Scripts;

    console.log(tempScripts);
    tempScripts.concat("," + name);
    console.log(tempScripts);

    // jetze neues projekt aus den temp dingern
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

        $.ajax({
          url: '/upload?folder=' + currProjFolder + '?project=' + currProjName,
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








var temp;
function readProjectFolderbyName(name) {    //name
  if (name == "") {
    console.log("value empty");
  }  else {

      var path = "" + name;
    //var folderRead = name;
    //console.log("readProjectFolder("+folderRead+")");

    var url = 'http://localhost:3000' + '/readFolder?name=' + path;
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
    var url = '/deleteFile?name' + "einProjekt" +"/Scripts/" + "dritteRDatei.R";  //'http://localhost:3000' 

    
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
            console.log(data);
            console.log("success");
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log("error by creating folder");
        }
    });
    
    document.location.href = "work.html";
}





