"use strict;"

var input;
var currentProject = document.cookie.split("=");

var saveScript = function(){
    input = document.getElementById('scriptIn').value;
    getProjectbyName(currentProject[3],"rkanschat@gmx.de");
    console.log(loadedProject);
    
    addScript(loadedProject,input);
}

var addScript = function(project,newScript){
    console.log(project);
    var tempCreator = project.data.Creator;
    var tempCollaborators = project.data.Colaborators;
    var tempDateien = project.data.Dateien;
    var tempErgebnisse = project.data.Ergebnis;
    
    var tempScripts = project.data.Scripts;
    
    //dass hier muss wieder ein json ding werden
    var newScripts = "" + 
        "{" + 
        '"neu"' + ":" + '"' + newScript + '"' +
        "}"
    ;
    console.log(JSON.parse(newScripts));
    
    
    // jetze neues projekt aus den temp dingern
    var neuesProject = {
        Creator: "" + tempCreator,
        Colaborators:"" + tempCollaborators,
        Scripts:newScripts,
        Dateien:"" + tempDateien,
        Ergebnis:"" + tempErgebnisse,
    }
    console.log(JSON.stringify(loadedProject) + tempCreator + neuesProject);
    updateProject(loadedProject.name,tempCreator,neuesProject);
    
}
var newScript = function(){
    console.log("tada");
}

//{"Creator":"rkanschat@gmx.de","Colaborators":"","Scripts":{"temp":",undefined","neu":"sdf"},"Dateien":"","Ergebnis":""}