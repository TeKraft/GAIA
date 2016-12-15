"use strict";

var newUser;
var letzte = null;
var jsonObj;
var allUsers;
var noUsers;

<<<<<<< HEAD
=======
<<<<<<< HEAD
<<<<<<< HEAD
var loginUser;




=======
=======
>>>>>>> origin/Beta

>>>>>>> refs/remotes/origin/Beta
var loginUser;





<<<<<<< HEAD
=======
    //var url = $('#db-url').val() + '/getFeatures';
    //var url = http://localhost:8080 + '/getFeatures';
>>>>>>> origin/Beta
>>>>>>> refs/remotes/origin/Beta






<<<<<<< HEAD
=======
<<<<<<< HEAD

>>>>>>> refs/remotes/origin/Beta
/**
 * saves a JSON object to the Database. The Object is a new User.
 */
function saveRegister() {
    // creates a new User from the input fields (userManagementfunctionality)
    loadUser();
    
    newUser = curUser;
<<<<<<< HEAD

    var content = JSON.parse(newUser);
    var password = document.getElementById('form-password').value;
    var confirmPassword = document.getElementById('form-confirmPassword').value;
    
    //hier statt name email denke ich
    if (name != undefined && content != null && !isRegistered(content) && password==confirmPassword) {
=======

    var content = JSON.parse(newUser);
=======
    //console.log(JSON.parse(content));

    console.log(content + "das ist neu");
>>>>>>> origin/Beta
    
    //hier statt name email denke ich
    if (name != undefined && content != null) {
>>>>>>> refs/remotes/origin/Beta

        var url = 'http://localhost:8080' + '/addFeature?name=' + email;
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> origin/Beta

<<<<<<< HEAD
=======
        //var url = $('#db-url').val() + '/getFeatures'; das waere richtig
>>>>>>> origin/Beta



>>>>>>> refs/remotes/origin/Beta
        // perform post ajax
        $.ajax({
            type: 'POST',
            data: content,
            url: url,
            timeout: 5000,
            success: function (data, textStatus) {
<<<<<<< HEAD
                console.log(content);
=======
>>>>>>> refs/remotes/origin/Beta
                console.log(data);
                console.log("succsess");
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log("failed to save to db");
            }
        });

       // loadFromDB();

    } else {
        console.log("fehler save to sb undefined oder null");
    }
};

function isRegistered(user){
     var url = 'http://localhost:8080' + '/getFeatures';
    var bol=false;
    $.ajax({
        type: 'GET',
        dataType: 'JSON',
        url: url,
        timeout: 5000,
        success: function (content, textStatus) {
            $('#tableDBContents').empty();
            
            
            for(var i=0; i<= content.length;i++){
                
                if(content[i] == user){
                    return true;
                }else{
                    bol = false;
                }
            }
                
                
            
            //zum schluss soll der user auf die home seite geschickt werden.
            
            $('#tableDB').removeClass('hidden');
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log("no success");
        }
    });
        return bol;
};




/**
 * checks if the user that wants to login is is saved in the database and if the password is correct.
 * if the user entered the correct email and password the home.html is loaded.
 */
function loadFromDB() {
    var url = 'http://localhost:8080' + '/getFeatures';
    
    $.ajax({
        type: 'GET',
        dataType: 'JSON',
        url: url,
        timeout: 5000,
        success: function (content, textStatus) {
            $('#tableDBContents').empty();

            
<<<<<<< HEAD
            loadLoginName();    // aus userManagementfunctionality
            loadLoginPW();      // aus userManagementfunctionality
=======
<<<<<<< HEAD
            loadLoginName();    // aus userManagementfunctionality
            loadLoginPW();      // aus userManagementfunctionality
=======
            loadLoginName();
            loadLoginPW();



            //console.log(content);
            //var jsonobj =  content[41].data;
            //JSON.parse(jsonobj);
            //console.log(jsonobj.Password);  
<<<<<<< HEAD
>>>>>>> origin/Beta
=======
>>>>>>> origin/Beta
>>>>>>> refs/remotes/origin/Beta

            
            for(var i=0; i<= content.length;i++){
                
                if(content[i] != undefined && content[i].data != undefined && content[i].data.Email != undefined){
                    
<<<<<<< HEAD
                //unnötig wenn nur name des features gecheckt wird
=======
<<<<<<< HEAD
<<<<<<< HEAD
                //unnötig wenn nur name des features gecheckt wird
=======
=======
>>>>>>> origin/Beta

                //unnötig wenn nur name des features gecheckt wird

                    //unnötig wenn nur name des features gecheckt wird

<<<<<<< HEAD
>>>>>>> origin/Beta
=======
>>>>>>> origin/Beta
>>>>>>> refs/remotes/origin/Beta
                var checkEmail = content[i].data.Email.replace("/" , ".");
                    
                if(content[i] != undefined && checkEmail == loginName){
                      if(content[i].data.Password == loginPW){
                          console.log("accsess");
<<<<<<< HEAD
                          
=======
<<<<<<< HEAD
<<<<<<< HEAD
                          
                          loginUser = JSON.stringify(content[i]);
                          console.log(loginUser);
                          setUserCookie();                          // aus sessionFunctionality
                          window.location.href = "/home.html";
=======
=======
>>>>>>> origin/Beta

                          console.log(content[i]);
>>>>>>> refs/remotes/origin/Beta
                          loginUser = JSON.stringify(content[i]);
                          console.log(loginUser);
                          setUserCookie();                          // aus sessionFunctionality
                          window.location.href = "/home.html";
<<<<<<< HEAD
=======

                          access = true;
                          return true;

<<<<<<< HEAD
>>>>>>> origin/Beta
=======
>>>>>>> origin/Beta
>>>>>>> refs/remotes/origin/Beta
                      }else{
                          console.log("Wrong password!");
                      }             
                }else{
                    console.log("user not register");
                }
 
            }
            }
            
            //zum schluss soll der user auf die home seite geschickt werden.
            
            $('#tableDB').removeClass('hidden');
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log("no success");
        }
    });
};





<<<<<<< HEAD
function deleteUser() {
    
    var userArr = document.cookie.split("=");
	// ajax Post
	$.ajax({
        

		url: '/deleteFeature?name=' + JSON.parse(userArr[1]).name,
		//async: false,
		type: "POST",
		//data: content,
		
		success: function(xhr, textStatus, data){
			// do function loadFromDB() to refresh list, when save feature
            logout();
		},
		error: function(textStatus, errorThrown){
			console.log(errorThrown);
		}
	});
}; 
=======






/*
function gutenTag(){
    console.log(allUsers);
}
*/
>>>>>>> refs/remotes/origin/Beta
