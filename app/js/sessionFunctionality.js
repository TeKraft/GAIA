"use strict";
var tempProject;
var curCreator;
var curProjectName;

var editProject;

var creatorOfProject;
/*
 * every time a window is loaded this checks what to do.
 */
window.onload = function () {
    var currentProject = document.cookie.split("=");
    if (document.cookie.length != 0) {

        var path = window.location.pathname;
        switch (path) {

        case "/home.html":
            if(document.cookie.includes(";")){
                alert("nicht angemeldet");
                window.location.href = "index.html";
                break;
            }else{

                var userArray = document.cookie.split("=");
                var userJSON = JSON.parse(userArray[1]);

                document.getElementById("profilSymb").textContent = userJSON.data.Firstname;
                creator = userJSON.name;

                //loading all Projects where the User collaborates
                loadAllProjects();
                break;
            }

        case "/work.html":
            showMap();
            console.log(document.cookie);
            if(document.cookie.includes(";")){
                alert("nicht angemeldet");
                window.location.href = "index.html";
                break;
            }else{
                var userArray = document.cookie.split("=");
                var userJSON = JSON.parse(userArray[1]);
                document.getElementById("workProfilSymb").textContent = userJSON.data.Firstname;

                displayCollaboratorsForInformation();
                displayCreatorForInformation();

                makeTreeComponents(currentProject[3]);
                createTree();
                if(aktScript == undefined){
                    document.getElementById("scriptIn").style.display = "none";
                }
                break;
            }
        case "/profiledit.html":
            if(document.cookie.includes(";")){
                alert("nicht angemeldet");
                window.location.href = "index.html";
                break;
            }else{
                var userArray = document.cookie.split("=");
                var userJSON = JSON.parse(userArray[1]);
                document.getElementById("editProfilSymb").textContent = userJSON.data.Firstname;
                break;
            }
        case "/impressum.html":
            if(document.cookie.includes(";")){
                alert("nicht angemeldet");
                window.location.href = "index.html";
                break;
            }else{
                var userArray = document.cookie.split("=");
                var userJSON = JSON.parse(userArray[1]);
                document.getElementById("imprProfilSymb").textContent = userJSON.data.Firstname;
                break;
            }

        case "/profil.html":
            if(document.cookie.includes(";")){
                alert("nicht angemeldet");
                window.location.href = "index.html";
                break;
            }else{
                var userArray = document.cookie.split("=");
                var userJSON = JSON.parse(userArray[1]);
                document.getElementById("profilProfilSymb").textContent = userJSON.data.Firstname;
                break;
            }


        case "/projectedit.html":
            if(document.cookie.includes(";")){
                alert("nicht angemeldet");
                window.location.href = "index.html";
                break;
            }else{
                var userArray = document.cookie.split("=");
                var userJSON = JSON.parse(userArray[1]);
                document.getElementById("profilEditProfilSymb").textContent = userJSON.data.Firstname;
                //console.log(userArray);
                document.getElementById("projectNameEdit").textContent = document.getElementById("projectNameEdit").textContent + " " + userArray[3];
                curProjectName = userArray[3];
                displayCollaborators();
                displayCreator();
                break;
            }

        case "/gaia.html":
            if(document.cookie.includes(";")){
                alert("nicht angemeldet");
                window.location.href = "index.html";
                break;
            }else{
                var userArray = document.cookie.split("=");
                var userJSON = JSON.parse(userArray[1]);
                document.getElementById("gaiaProfilSymb").textContent = userJSON.data.Firstname;
                break;
            }
        }
    };
    
    

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
            document.getElementById("streetName").value = userJSON.data.StreetName;
            document.getElementById("houseNumber").value = userJSON.data.HouseNumber;
            document.getElementById("postcode").value = userJSON.data.Postcode;
            document.getElementById("city").value = userJSON.data.City;
            document.getElementById("institution").value = userJSON.data.Institution;
            document.getElementById("email").value = userJSON.data.Email;
            document.getElementById("newPassword").value = userJSON.data.Password;
            document.getElementById("country").value = userJSON.data.Country;


            /** change '/' into '.' **/
            var str = document.getElementById("email").value;
            var res = str.replace("/", ".");
            document.getElementById("email").value = res;

              break;
           
        }
    }
    
    
    var currentProject = document.cookie.split("=");
    if (document.cookie.length != 0) {

        var path = window.location.pathname;
        switch (path) {

        case "/profil.html":
            var userArray = document.cookie.split("=");
            var userJSON = JSON.parse(userArray[1]);

            document.getElementById("profilProfilSymb").textContent = userJSON.data.Firstname;
            document.getElementById("firstName").value = userJSON.data.Firstname;
            document.getElementById("lastName").value = userJSON.data.LastName;
            document.getElementById("streetName").value = userJSON.data.StreetName;
            document.getElementById("houseNumber").value = userJSON.data.HouseNumber;
            document.getElementById("postcode").value = userJSON.data.Postcode;
            document.getElementById("city").value = userJSON.data.City;
            document.getElementById("institution").value = userJSON.data.Institution;
            document.getElementById("email").value = userJSON.data.Email;
            
            document.getElementById("country").value = userJSON.data.Country;


            /** change '/' into '.' **/
            var str = document.getElementById("email").value;
            var res = str.replace("/", ".");
            document.getElementById("email").value = res;

              break;
           
        }
    }
}





function displayCreatorForInformation() {
    var url = localhost + '/getFeatures';
    var creator;

    $.ajax({
        type: 'GET',
        dataType: 'JSON',
        url: url,
        timeout: 5000,
        success: function (content, textStatus) {
            for (var i = 0; i <= content.length; i++) {
                if (content[i] != undefined && content[i].data != undefined && content[i].data.Creator != undefined) {
                    var tempCookie = document.cookie.split("=");
                    var project = tempCookie[3];

                    if (content[i] != undefined && project == content[i].name) {
                        tempProject = content[i];
                        document.getElementById('CreatorInfo').innerHTML = "Creator: " + content[i].data.Creator;
                        creatorOfProject=content[i].data.Creator;
                        break;
                    } else {
                        //console.log("not this one");
                    }
                }
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log("no success");
        }
    });
};


// ich glaube er wuerde wenn zwei projekte gleich heissen aber verschiedene creators haben immer nur das erste auswaehlen
function displayCreator() {
    var url = localhost + '/getFeatures';
    var creator;

    $.ajax({
        type: 'GET',
        dataType: 'JSON',
        url: url,
        timeout: 5000,
        success: function (content, textStatus) {
            for (var i = 0; i <= content.length; i++) {
                if (content[i] != undefined && content[i].data != undefined && content[i].data.Creator != undefined) {
                    var tempCookie = document.cookie.split("=");
                    var project = tempCookie[3];

                    if (content[i] != undefined && project == content[i].name) {
                        tempProject = content[i];
                        document.getElementById('CreatorEdit').innerHTML = "Creator: " + content[i].data.Creator;
                        curCreator = content[i].data.Creator;
                        break;
                    } else {
                        //console.log("not this one");
                    }
                }
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log("no success");
        }
    });
};


function displayCollaboratorsForInformation() {
    var url = localhost + '/getFeatures';
    var colabs;

    $.ajax({
        type: 'GET',
        dataType: 'JSON',
        url: url,
        timeout: 5000,
        success: function (content, textStatus) {
            for (var i = 0; i <= content.length; i++) {

                if (content[i] != undefined && content[i].data != undefined && content[i].data.Colaborators != undefined) {
                    var tempCookie = document.cookie.split("=");
                    var project = tempCookie[3];

                    if (content[i] != undefined && project == content[i].name) {
                        // alle mitarbeiter werden als knopf dargestellt bei druecken kann man loeschen oder nachricht senden

                        tempProject = content[i].Colaborators;
                        var CollabArray = content[i].data.Colaborators.split(",");
                        var editedCollab = "<br>";
                        for (var i = 0; i < CollabArray.length; i++) {
                            editedCollab = editedCollab + CollabArray[i] + "<br>";
                        }
                        document.getElementById('CollaboratorInfo').innerHTML = "Collaborators: " + editedCollab;
                        break;
                    } else {
                        //console.log("not this one");
                    }
                }
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log("no success");
        }
    });
};


function displayCollaborators() {
    var url = localhost + '/getFeatures';
    var colabs;

    $.ajax({
        type: 'GET',
        dataType: 'JSON',
        url: url,
        timeout: 5000,
        success: function (content, textStatus) {
            $('#tableDBContents').empty();

            for (var i = 0; i <= content.length; i++) {

                if (content[i] != undefined && content[i].data != undefined && content[i].data.Colaborators != undefined) {



                    var tempCookie = document.cookie.split("=");
                    var project = tempCookie[3];

                    if (content[i] != undefined && project == content[i].name) {
                        // alle mitarbeiter werden als knopf dargestellt bei druecken kann man loeschen oder nachricht senden


                        tempProject = content[i];
                        displayButtons(content[i].data.Colaborators);
                        //document.getElementById('projectCollabEdit').innerHTML = "Collaborators: " + displayButtons()content[i].data.Colaborators;

                        break;
                    } else {
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


/*
*   erstellt die Buttons fuer die Collaborators


WENN AM ANFAN NOCH KEINER ERSTELLT WURDE ERSTELLT ER BEIM NEUEN COLLAB EINEN LEEREN KNOPF
*/
function displayButtons(input) {
    var temp = input.split(",");
    var tempString = "";
    console.log(temp);

    if (temp != ""){
        //console.log(temp[1] +  " das ist einer");
        for (var i = 0; i < temp.length; i++) {
            if(temp[i] == ""){
              //  console.log("ein falscher");
            }else{
                var neu = temp[i].replace("at","@");
                var neu1 = neu.replace("punkt",".");
                var neu2 = neu1.replace("minus","-");
                var neu3 = neu2.replace("unter","_");
                tempString = tempString +
                //"<div class='dropdown'>" +
                "<br>" +
                "<button id= '" + temp[i] + "' type='button' class='btn btn-info disabled' onclick=''>" + neu3 + "</button>" +
                "<button id= '" + temp[i] + "' type='button'  onclick='deleteCollaborator("+ temp[i] + ")' class= 'btn btn-danger'>" + "delete" + "</button>" 

                //"<div id='myDropdown' class='dropdown-content'>" +
                //"<button id= '" + temp[i] + "' type='button' class='btn btn-CollaboratorButton' href='mailto:t.kraf03@gmail.com' onclick=''>" + "sendMessage " + "</button>" +
                //"<button id= '" + temp[i] + "' type='button' class='btn btn-CollaboratorButton' onclick='deleteCollaborator(this.id)'>" + "delete " + "</button>" +
                //"</div>" +
                //"</div>" +
                ;
                console.log(temp[i]);
                console.log(neu)
                console.log(neu3)
                //console.log(tempString);
                //tempString = null;
            }
        }
    }

    document.getElementById('projectCollabEdit').innerHTML = "Collaborators: " + tempString;

}







// funktioniert nicht bei emailadressen sondern nur bei buchstaben
function deleteCollaborator(name) {

    var deleteCollab = name[0].id;

    console.log(curProjectName + curCreator);



     var url = localhost + '/getFeatures';

    $.ajax({
        type: 'GET',
        dataType: 'JSON',
        url: url,
        timeout: 5000,
        success: function (content, textStatus) {
            $('#tableDBContents').empty();

            for(var i=0; i<= content.length;i++){

                if(content[i] != undefined && content[i].data != undefined && content[i].name == curProjectName && content[i].data.Creator == curCreator){

                    editProject = content[i];
                    var newCollabs = content[i].data.Colaborators;
                    if(newCollabs.includes(deleteCollab)){
                        console.log(deleteCollab);
                        newCollabs = newCollabs.replace(deleteCollab,'');
                        var newProject = content[i];
                        newProject.data.Colaborators = newCollabs.replace(',,',',');
                        console.log(newProject);

                    // ajax Post
	                  $.ajax({
		              url: localhost + '/updateFeature?name=' + curProjectName,
		              //async: false,
		              type: "POST",
		              data: newProject.data,

		              success: function(xhr, textStatus, data){
			             // do function loadFromDB() to refresh list, when save feature
                            console.log("success");

		              },
		              error: function(textStatus, errorThrown){
			             console.log(errorThrown);
		              }
	                   });

                        window.location.href = "projectedit.html";

                    }

                }else{
                    console.log("gibts nicht")
                }
            }

            $('#tableDB').removeClass('hidden');
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log("no success");
        }
    });




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
    console.log(document.cookie);
}

























//kann glaub ich weg
window.onclick = function (event) {
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
}

//kann glaub ich weg
function openDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}
