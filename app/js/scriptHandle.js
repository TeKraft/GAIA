"use strict;"

var input;
var currentScript;
var currentProject = document.cookie.split("=");

var createScript = function(name){
    input = document.getElementById('scriptIn').value;

    getProjectbyName(currentProject[3],"rkanschat@gmx.de");

    addScript(loadedProject,name);
    currentScript = name;
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
    var content = document.getElementById("scriptIn");
    console.log(document.getElementById("scriptIn").value);
}








var addScript = function(project,name){
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

        $.ajax({
          url: '/upload',
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
