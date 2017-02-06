"use strict";

var creator;
var projectName;
var collaborators = new Array();
var newProject;
var userProjects= new Array();
var projectTable ="";

// handles the button "Create Project"
$(document).ready(function(){
    $('.btn-create').on('click',saveProject);
});





/**
  * @desc Saves a Project into the MongoDB and creates a new Folder in the projects Folder
  * @return AJAX success or error
*/
function saveProject() {
    projectName=document.getElementById('PrjName').value;
    loadProject();
    
    if (document.getElementById("PrjName").value == "") {
        alert("enter name");
    }else{
        
        var projectTitle = document.getElementById("PrjName").value;
        // hier Fragen ob es das Projekt schon gibt    
        getProjectByName(projectTitle);  
        var existingProject = tempProject;


        if(existingProject != undefined &&existingProject.name === projectTitle){
            alert("Projekt already exists");
            return;
        }else{
            // addFolder(projectTitle);
            var url = localhost + '/addFolder?name=' + projectTitle;
            // perform post ajax
            $.ajax({
                type: 'POST',
                // data: content,
                url: url,
                timeout: 5000,
                success: function (data, textStatus) {
                    console.log("success");
                    // window.location.href = "/home.html";
                },
                error: function (xhr, textStatus, errorThrown) {
                    console.log("error by creating folder");
                }
            });
            var content = JSON.parse(newProject);
            if (projectName != undefined && content != null) {
                var url = localhost + '/addFeature?name=' + projectName;
                // perform post ajax
                $.ajax({
                    type: 'POST',
                    data: content,
                    url: url,
                    timeout: 5000,
                    success: function (data, textStatus) {
                        console.log("success");
                        window.location.href = "/home.html";
                    },
                    error: function (xhr, textStatus, errorThrown) {
                        console.log("failed to save to db");
                    }
                });
            } else {
                console.log("undefined or null");
            }

        }
    }
    
};


/**
  * @desc Creates a new Project JSON for the MongoDB
*/
function loadProject(){
    name = document.getElementById(PrjName);
    collaborators[0] = document.getElementById('collabs').value;
    var collab=document.getElementsByClassName('addInput');

    
    collaborators[0]
    
    var editedCollabe = collaborators[0].replace("@","atzeichen");
    var editedCollabe1 = editedCollabe.replace(".","punkt");
    editedCollabe1 = editedCollabe.replace('-','minus');
    var editedCollab3 = editedCollabe1.replace('_','unter');
    var editedCollab2 = editedCollab3.replace('.','punkt');

    
    newProject = '{'
       +'"Creator":' +'"' + creator + '"' +', '
       +'"Colaborators":' +'"' +editedCollab2 + '"' +', '
       +'"Scripts":' +'"'  + '"'+', '
       +'"Dateien":' +'"'  + '"'+', '
       +'"Ergebnis":' +'"'  + '"'
       +'}';
}


function loadAllProjects(){
    var url = localhost + '/getFeatures';
    $.ajax({
        type: 'GET',
        dataType: 'JSON',
        url: url,
        timeout: 5000,
        success: function (content, textStatus) {
            var projectNumber=0;
            for(var i=0; i<= content.length;i++){
                if(content[i] != undefined && content[i].data != undefined && content[i].data.Creator != undefined && content[i].data.Creator != "null"){
                    var userArray = document.cookie.split("=");
                    var userJSON = JSON.parse(userArray[1]);
                    //die ueberpruefung auf mitarbeiter stimmt noch nicht ganz
                    
                    
                        var editedCollabe = userJSON.name.replace("@","atzeichen");
                        var editedCollabe1 = editedCollabe.replace(".","punkt");
                        editedCollabe1 = editedCollabe.replace('-','minus');
                        var editedCollab3 = editedCollabe1.replace('_','unter');
                        var editedCollab2 = editedCollab3.replace('.','punkt');
                    
                    
                    var allCollabs=content[i].data.Colaborators.includes(editedCollab2);    //userJSON.name
                    if(content[i].data.Creator == creator || allCollabs){
                        userProjects[projectNumber] = content[i];
                        projectNumber++;
                    }else{
                    }
                }
            }
             if(userProjects.length > 0){
                 createProjectTable();
            }else{
                 return "no Projects";
             }
            $('#tableDB').removeClass('hidden');
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log("no success");
        }
    });
}


/**
  * @desc creates a table with all projects the User has access to
*/
function createProjectTable(){
    var table = document.getElementById("myTable");
    var projectsOfUser= new Array;
    var j=0;
    for(var i=0; i<= userProjects.length; i++){
         if(userProjects[i]!= undefined && userProjects[i]!="" && userProjects[i].name!=""){
            var row = table.insertRow(1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var testname=userProjects[i].name;
            cell1.innerHTML = userProjects[i].name;
            cell2.innerHTML = "<button id= '" + userProjects[i].name  +"' onclick='editProject(this.id)' type='button' class='btn btn-info'>work</button>";
            cell3.innerHTML = "<button id= '" + userProjects[i].name +"' onclick='loadProjectEdit(this.id)' type='button' class='btn btn-editPrj'>settings</button>" + 
                              "<button id= '" + userProjects[i].name + "' type='button' class='btn btn-danger' onclick='deleteProject(this.id)'>delete</button>";
             projectsOfUser[j]=userProjects[i].name;
            j++;
        }
    }
}


/**
  * @desc Allows the User to edit the Project settings
*/
function loadProjectEdit(id){
    var aktuellesProject;
    aktuellesProject=id;
    if(!isEditing()){
        document.cookie = document.cookie + "=CurrentProject=" + aktuellesProject+ "=";
        window.location.href = "projectedit.html";
    }else{
        var temp=document.cookie.split("=");
        temp[3] = aktuellesProject;
        var tempCookie = "" + temp[0]+ "=" + temp[1] + "=" + temp[2] + "=" + temp[3];
        document.cookie = tempCookie;
        window.location.href = "projectedit.html";
    }
}

/**
  * @desc Allows the user to work with the project
*/
function editProject(id ){
    //work cookie
    var aktuellesProject;
    // die id von dem gedrueckten button also der projektname wird dem cookie hinzugefuegt
    // mit dem benutzer der eingeloggt ist und dem projektnamen wird das projekt identifiziert
    // ein benutzer kann also nicht mehrere projekte mit selben namen haben.
    aktuellesProject=id;
    // erst checken ob schon ein projekt ausgewaehlt ist
    if(!isEditing()){
        document.cookie = document.cookie + "=CurrentProject=" + aktuellesProject+ "=";
        window.location.href = "work.html";
    }else{
        var temp=document.cookie.split("=");
        temp[3] = aktuellesProject;
        var tempCookie = "" + temp[0]+ "=" + temp[1] + "=" + temp[2] + "=" + temp[3];
        document.cookie = tempCookie;
        window.location.href = "work.html";
    }
}

/**
  * @desc checks if the User is currently editing a project
*/
function isEditing(){
    var cookieString=document.cookie.split("=");
    if(cookieString.length>=4){
        return true;
    }else{
        return false;
    }
}


/**
  * @desc Deletes the chosen project
  * @return AJAX success or error
*/
function deleteProject(id) {
    var tempCookie=document.cookie.split("=");
    if (id == "") {
        console.log("value empty");
    }else {
        
        
        getProjectByName(id);  
        var existingProject = tempProject;
        var user = JSON.parse(tempCookie[1]);

        if(user.name != tempProject.data.Creator){
            alert("you must be the creator");
            return;
        }else{
        if (confirm("Are you sure?") == true) {

        } else {
            return;
        }

        var folderTitle = id;

        var url = localhost + '/deleteProjectFolder?name=' + id;
        // perform post ajax
        $.ajax({
            type: 'POST',
            // data: content,
            url: url,
            timeout: 5000,
            success: function (data, textStatus) {
                console.log("delete Folder success");
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log("error by deleting folder");
            }
        });
        // ajax Post
        $.ajax({
            url: localhost + '/deleteFeature?name=' + id,
            //async: false,
            type: "POST",
            //data: content,
            success: function(xhr, textStatus, data){
                // do function loadFromDB() to refresh list, when save feature
                var aktuellesProject;
                aktuellesProject=id;
                if(!isEditing()){
                    }else{
                        var temp=document.cookie.split("=");
                        temp[3] = aktuellesProject;
                        var tempCookie = "" + temp[0]+ "=" + temp[1];
                            document.cookie = tempCookie;
                        }
                window.location.href = "/home.html";
            },
            error: function(textStatus, errorThrown){
                console.log(errorThrown);
            }
        });
        }
    }
}; 

