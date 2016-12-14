"use strict";

var creator;
var projectName;
var collaborators = {
    
};
var newProject;
var userProjects= new Array;
var projectTable ="";

// handles the button "Create Project"
$(document).ready(function(){
    $('.btn-create').on('click',saveProject);
});





function saveProject() {
    console.log(creator);
    projectName=document.getElementById('PrjName').value;
    
    console.log(projectName);
    loadProject();
    
    var content = JSON.parse(newProject);
    
    console.log(newProject);
    if (projectName != undefined && content != null) {

        var url = 'http://localhost:8080' + '/addFeature?name=' + projectName;

        // perform post ajax
        $.ajax({
            type: 'POST',
            data: content,
            url: url,
            timeout: 5000,
            success: function (data, textStatus) {
                console.log(data);
                console.log("succsess");
                window.location.href = "/home.html";
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log("failed to save to db");
            }
        });

        //loadFromDB();

    } else {
        console.log("fehler save to sb undefined oder null");
    }
};




function loadProject(){
    name = document.getElementById(PrjName);
    collaborators[0] = document.getElementById('collabs').value;
    var collab=document.getElementsByClassName('addInput');
    console.log(collab);
    
    newProject = '{'
       +'"Creator":' +'"' + creator + '"' +', '
       +'"Colaborators":' +'"' +collaborators[0] + '"' +', '
       +'"Scripts":' +'"'  + '"'
       +'}';
}

function loadAllProjects(){
    var url = 'http://localhost:8080' + '/getFeatures';
    
    $.ajax({
        type: 'GET',
        dataType: 'JSON',
        url: url,
        timeout: 5000,
        success: function (content, textStatus) {
            $('#tableDBContents').empty();
            var projectNumber=0;
            
            for(var i=0; i<= content.length;i++){
                
                if(content[i] != undefined && content[i].data != undefined && content[i].data.Creator != undefined && content[i].data.Creator != "null"){
                    
                    
                    var userArray = document.cookie.split("=");
                    var userJSON = JSON.parse(userArray[1]);
                    //die ueberpruefung auf mitarbeiter stimmt noch nicht ganz 
                    var allCollabs=content[i].data.Colaborators.includes(userJSON.name);
                    
                    if(content[i].data.Creator == creator || allCollabs){
                        userProjects[projectNumber] = content[i];        
                        projectNumber++;
                    }else{
                        
                    }
                }
            }
             if(userProjects.length > 0){
                 createProjectTable();
                 //document.getElementById("usersProjects").textContent = projectTable;
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

// soll eigentlich ein projectfeld erstellen das name informationen und edit/delete btn enthaellt aber vlt unnoetig
function createProject(projectJSON){
    
    
}

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
            console.log(testname);
             
             
             
            cell1.innerHTML = userProjects[i].name;
            cell2.innerHTML = "<button id= '" + userProjects[i].name + "Settings" +"' onclick='' type='button' class='btn btn-editPrj'>settings</button>";
            cell3.innerHTML = "<button id= '" + userProjects[i].name +"' onclick='editProject(this.id)' type='button' class='btn btn-editPrj'>edit</button>" + 
                              "<button type='button' class='btn btn-default'>delete</button>";
            
             
             
             
             
             projectsOfUser[j]=userProjects[i].name;
            j++;
             console.log(projectsOfUser);
    }
    }
    
}


function editProject(id ){
    //work cookie
    var aktuellesProject;
    
    
    // die id von dem gedrueckten button also der projektname wird dem cookie hinzugefuegt
    // mit dem benutzer der eingeloggt ist und dem projektnamen wird das projekt identifiziert
    // ein benutzer kann also nicht mehrere projekte mit selben namen haben.
    aktuellesProject=id;
    console.log(aktuellesProject);
    // erst checken ob schon ein projekt ausgewaehlt ist
    if(!isEditing()){
        document.cookie = document.cookie + "=CurrentProject=" + aktuellesProject+ "=";
        window.location.href = "work.html";
    }else{
        var temp=document.cookie.split("=");
        
        temp[3] = aktuellesProject;
        
        var tempCookie = "" + temp[0]+ "=" + temp[1] + "=" + temp[2] + "=" + temp[3];
        
        document.cookie = tempCookie;
        console.log(document.cookie);
        window.location.href = "work.html";
    }
    
}

function isEditing(){
    var cookieString=document.cookie.split("=");
    if(cookieString.length>=4){
        return true;
    }else{
        return false;
    }
}

