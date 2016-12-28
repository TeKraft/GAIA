"use strict";
var tempProject;


// TODO: doppelt???

/*
 * every time a window is loaded this checks what to do.
 */
window.onload = function () {
    var currentProject = document.cookie.split("=");
    if (document.cookie.length != 0) {

        var path = window.location.pathname;
        switch (path) {

        case "/profiledit.html":
            var userArray = document.cookie.split("=");
            var userJSON = JSON.parse(userArray[1]);

            document.getElementById("editProfilSymb").textContent = userJSON.data.Firstname;
            document.getElementById("firstName").value = userJSON.data.Firstname;
            document.getElementById("lastName").value = userJSON.data.LastName;
            document.getElementById("form-country").value = userJSON.data.Country;
            document.getElementById("oldEmail").value = userJSON.data.Email;
            document.getElementById("oldPassword").value = userJSON.data.password;


            /** change '/' into '.' **/
            var str = document.getElementById("oldEmail").value;
            var res = str.replace("/", ".");
            document.getElementById("oldEmail").value = res;

            break;

        var path = window.location.pathname;
        switch (path) {
        case "/home.html":
            var userArray = document.cookie.split("=");
            var userJSON = JSON.parse(userArray[1]);
            document.getElementById("profilSymb").textContent = userJSON.data.Firstname;
            creator = userJSON.name;

            //loading all Projects where the User collaborates
            loadAllProjects();
            break;

        case "/work.html":
            var userArray = document.cookie.split("=");
            var userJSON = JSON.parse(userArray[1]);
            document.getElementById("workProfilSymb").textContent = userJSON.data.Firstname;
            console.log(userArray);

            makeTreeComponents(currentProject[3]);

            createTree();
                
            displayCollaboratorsForInformation();
            displayCreatorForInformatioin()
            break;

//             TODO: check with upper "/profiledit.html"
//         case "/profiledit.html":
//             var userArray = document.cookie.split("=");
//             var userJSON = JSON.parse(userArray[1]);
//             document.getElementById("editProfilSymb").textContent = userJSON.data.Firstname;
//             break;
        case "/impressum.html":
            var userArray = document.cookie.split("=");
            var userJSON = JSON.parse(userArray[1]);
            document.getElementById("imprProfilSymb").textContent = userJSON.data.Firstname;
            break;

        case "/profil.html":
            var userArray = document.cookie.split("=");
            var userJSON = JSON.parse(userArray[1]);
            document.getElementById("profilProfilSymb").textContent = userJSON.data.Firstname;
            break;

        case "/projectedit.html":
            var userArray = document.cookie.split("=");
            var userJSON = JSON.parse(userArray[1]);
            document.getElementById("profilEditProfilSymb").textContent = userJSON.data.Firstname;
            console.log(userArray);
            document.getElementById("projectNameEdit").textContent = document.getElementById("projectNameEdit").textContent + " " + userArray[3];
            displayCollaborators();
            displayCreator();
            break;

        }
    }

}

function makeTreeComponents(name){
    
    document.getElementById("rootList").textContent = name;
    document.getElementById("childList").textContent = name;
    
}


function displayCreatorForInformatioin() {
    var url = 'http://localhost:3000' + '/getFeatures';
    var creator;
    
    $.ajax({
        type: 'GET',
        dataType: 'JSON',
        url: url,
        timeout: 5000,
        success: function (content, textStatus) {
            $('#tableDBContents').empty();
            for(var i=0; i<= content.length;i++){               
                if(content[i] != undefined && content[i].data != undefined && content[i].data.Creator != undefined){
                    var tempCookie=document.cookie.split("=");
                    var project = tempCookie[3];
                    
                    if(content[i] != undefined && project == content[i].name){
                        tempProject = content[i];
                        document.getElementById('CreatorInfo').innerHTML = "Creator: " + content[i].data.Creator;
                        break;
                    }else{
                        //console.log("not this one");
                    }
                }
            }
            $('#tableDB').removeClass('hidden');
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log("no success");
        }
    });
};

function displayCreator() {
    var url = 'http://localhost:3000' + '/getFeatures';
    var creator;
    
    $.ajax({
        type: 'GET',
        dataType: 'JSON',
        url: url,
        timeout: 5000,
        success: function (content, textStatus) {
            $('#tableDBContents').empty();
            for(var i=0; i<= content.length;i++){               
                if(content[i] != undefined && content[i].data != undefined && content[i].data.Creator != undefined){
                    var tempCookie=document.cookie.split("=");
                    var project = tempCookie[3];
                    
                    if(content[i] != undefined && project == content[i].name){
                        tempProject = content[i];
                        document.getElementById('CreatorEdit').innerHTML = "Creator: " + content[i].data.Creator;
                        break;
                    }else{
                        console.log("not this one");
                    }
                }
            }
            $('#tableDB').removeClass('hidden');
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log("no success");
        }
    });
};


function displayCollaboratorsForInformation() {
    var url = 'http://localhost:3000' + '/getFeatures';
    var colabs;
    
    $.ajax({
        type: 'GET',
        dataType: 'JSON',
        url: url,
        timeout: 5000,
        success: function (content, textStatus) {
            $('#tableDBContents').empty();

            for(var i=0; i<= content.length;i++){
                
                if(content[i] != undefined && content[i].data != undefined && content[i].data.Colaborators != undefined){
                    

                
                    var tempCookie=document.cookie.split("=");
                    var project = tempCookie[3];
                    
                    if(content[i] != undefined && project == content[i].name){
                        // alle mitarbeiter werden als knopf dargestellt bei druecken kann man loeschen oder nachricht senden
                        
                        
                        tempProject = content[i].Colaborators;
                        var CollabArray = content[i].data.Colaborators.split(",");
                        
                        var editedCollab = "<br>";
                        
                        for(var i=0; i<CollabArray.length;i++){
                            editedCollab = editedCollab + CollabArray[i] + "<br>";
                        }
                        
                        document.getElementById('CollaboratorInfo').innerHTML = "Collaborators: " + editedCollab;
                        break;
                    }else{
                        //console.log("not this one");
                    }
 
                }
            }

            $('#tableDB').removeClass('hidden');
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log("no success");
        }
        
    });
 
};


function displayCollaborators() {
    var url = 'http://localhost:3000' + '/getFeatures';
    var colabs;
    
    $.ajax({
        type: 'GET',
        dataType: 'JSON',
        url: url,
        timeout: 5000,
        success: function (content, textStatus) {
            $('#tableDBContents').empty();

            for(var i=0; i<= content.length;i++){
                
                if(content[i] != undefined && content[i].data != undefined && content[i].data.Colaborators != undefined){
                    

                
                    var tempCookie=document.cookie.split("=");
                    var project = tempCookie[3];
                    
                    if(content[i] != undefined && project == content[i].name){
                        // alle mitarbeiter werden als knopf dargestellt bei druecken kann man loeschen oder nachricht senden
                        
                        
                        tempProject = content[i].Colaborators;
                        var CollabArray = content[i].data.Colaborators.split(",");
                        
                        var editedCollab = "<br>";
                        
                        for(var i=0; i<CollabArray.length;i++){
                            editedCollab = editedCollab + CollabArray[i] + "<br>";
                        }
                        
                        document.getElementById('CollaboratorInfo').innerHTML = "Collaborators: " + editedCollab;
                        break;
                    }else{
                        //console.log("not this one");
                    }
 
                }
            }

            $('#tableDB').removeClass('hidden');
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log("no success");
        }
    });
};

// TODO: check with upper "function displayCollaborators()"
// function displayCollaborators() {
//     var url = 'http://localhost:3000' + '/getFeatures';
//     var colabs;
    
//     $.ajax({
//         type: 'GET',
//         dataType: 'JSON',
//         url: url,
//         timeout: 5000,
//         success: function (content, textStatus) {
//             $('#tableDBContents').empty();

//             for(var i=0; i<= content.length;i++){
                
//                 if(content[i] != undefined && content[i].data != undefined && content[i].data.Colaborators != undefined){
                    

                
//                     var tempCookie=document.cookie.split("=");
//                     var project = tempCookie[3];
                    
//                     if(content[i] != undefined && project == content[i].name){
//                         // alle mitarbeiter werden als knopf dargestellt bei druecken kann man loeschen oder nachricht senden
                        
                        
//                         tempProject = content[i];
//                         displayButtons(content[i].data.Colaborators);
//                         //document.getElementById('projectCollabEdit').innerHTML = "Collaborators: " + displayButtons()content[i].data.Colaborators;
                        
//                         break;
//                     }else{
//                         console.log("not this one");
//                     }
 
//                 }
//             }

//             $('#tableDB').removeClass('hidden');
//         },
//         error: function (xhr, textStatus, errorThrown) {
//             console.log("no success");
//         }
        
//     });
 
// };

/*
*   erstellt die Buttons fuer die Collaborators 


WENN AM ANFAN NOCH KEINER ERSTELLT WURDE ERSTELLT ER BEIM NEUEN COLLAB EINEN LEEREN KNOPF
*/
function displayButtons(input){
    var temp = input.split(",");
    var tempString="";
    console.log(temp);
    
    if(temp != ""){
      for(var i=0; i<temp.length;i++){
          tempString = tempString + 
              "<div class='dropdown'>" +
                  "<button id= '" + temp[i] + "' type='button' class='dropbtn' onclick='openDropdown()'>"+ temp[i]+"</button>" + 

                  "<div id='myDropdown' class='dropdown-content'>" +
                         "<button id= '" + temp[i] + "' type='button' class='btn btn-CollaboratorButton' href='mailto:t.kraf03@gmail.com' onclick=''>"+ "sendMessage "+"</button>" + 
                      "<button id= '" + temp[i] + "' type='button' class='btn btn-CollaboratorButton' onclick='deleteCollaborator(this.id)'>"+ "delete "+"</button>" + 
                  "</div>" + 
              "</div>" +
              " ";
          console.log(temp[i]);
          console.log(tempString);
          //tempString = null; 
      }
    }

//     document.getElementById('projectCollabEdit').innerHTML = "Collaborators: " + tempString;

}
    
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }


function openDropdown(){
        document.getElementById("myDropdown").classList.toggle("show");
}


function deleteCollaborator(){
        
}

function sendMessage(){
        
}


/*
 * sets the cookie to the logged in user
 */
function setUserCookie() {
    var userLogin = loginUser;
    console.log(userLogin);
    document.cookie = "User=" + userLogin;
}

/*
 * sets the cookie to "" and loads the login&regitry.html
 */
function logout() {
    document.cookie = "";
    window.location.href = "index.html";
}



function createTree() {
    $(function () {
        // 6 create an instance when the DOM is ready
        $('#jstree').jstree();
        // 7 bind to events triggered on the tree
        $('#jstree').on("changed.jstree", function (e, data) {
            console.log(data.selected);
        });
        // 8 interact with the tree - either way is OK
        $('button').on('click', function () {
            $('#jstree').jstree(true).select_node('scripts_node_1');
            $('#jstree').jstree('select_node', 'images_node_1');
            $.jstree.reference('#jstree').select_node('results_node_1');

        });
    });
}