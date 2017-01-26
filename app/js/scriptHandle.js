"use strict;"

var input;
var currentProject = document.cookie.split("=");

var saveScript = function(name){
    input = document.getElementById('scriptIn').value;
    
    ///////////////////////////////////////////////////////////////////////////////der creator muss in dem cokie drin stehen
    getProjectbyName(currentProject[3],"rkanschat@gmx.de");
    
    
    addScript(loadedProject,name);
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
    //console.log(neuesProject.Scripts);
    //updateProject(loadedProject.name,tempCreator,neuesProject);
}


var newScript = function(){

        var scriptName = prompt("Please enter a name");
        var file = new File([""], "");
        var formData = new FormData();

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
    
    saveScript(scriptName);
}