"use strict";

var newUser;
var letzte = null;
var jsonObj;
var allUsers;
var noUsers;
var loginUser;
var curProject;

/**
 * saves a JSON object to the Database. The Object is a new User.
 */
function saveRegister() {
  // creates a new User from the input fields (userManagementfunctionality)
  loadUser();

  // check input field when try to register
  if (checkInputField == false) {
    window.alert("register not possible \n please fill out every field");
  } else {
    newUser = curUser;

    var password = document.getElementById('form-password').value;
    var confirmPassword = document.getElementById('form-confirmPassword').value;
    var content = JSON.parse(newUser);

     String.passwort = function () {
        var hash = 0,
            i, chr, len;
        if (this.length === 0) return hash;
        for (i = 0, len = this.length; i < len; i++) {
            chr = this.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    };

    console.log(newUser);
    //hier statt name email denke ich
    if (name != undefined && content != null &&  password==confirmPassword) {
        var url = 'http://localhost:3000' + '/addFeature?name=' + email;
        // perform post ajax
        $.ajax({
            type: 'POST',
            data: content,
            url: url,
            timeout: 5000,
            success: function (data, textStatus) {
                console.log(data);
                console.log("success");
                window.location.href = "/index.html";
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log("failed to save to db");
            }
        });
        //loadFromDB();
    } else {
        console.log("fehler save to sb undefined oder null");
    }
  }
};

/**
 * checks if the user that wants to login is is saved in the database and if the password is correct.
 * if the user entered the correct email and password the home.html is loaded.
 */
function loadFromDB() {
    var url = 'http://localhost:3000' + '/getFeatures';
    $.ajax({
        type: 'GET',
        dataType: 'JSON',
        url: url,
        timeout: 5000,
        success: function (content, textStatus) {
            loadLoginName();    // aus userManagementfunctionality
            loadLoginPW();      // aus userManagementfunctionality

            // check input field when try to login
            if (checkInputField == false) {
              window.alert("please insert email and password");
            } else {
            for(var i=0; i<= content.length;i++){
                if(content[i] != undefined && content[i].data != undefined && content[i].data.Email != undefined){
                //unnötig wenn nur name des features gecheckt wird
                var checkEmail = content[i].data.Email.replace("/" , ".");
                if(content[i] != undefined && checkEmail == loginName){
                      if(content[i].data.Password == loginPW.hashCode()){
                          console.log("access");
                          loginUser = JSON.stringify(content[i]);
                          console.log(loginUser);
                          setUserCookie();                          // aus sessionFunctionality
                          window.location.href = "/home.html";
                      }else{
                          console.log("Wrong password!");
                      }
                }else{
                    console.log("user not register");
                }
            }
            }
            //zum schluss soll der user auf die home seite geschickt werden.
          }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log("no success");
        }
    });
};

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
