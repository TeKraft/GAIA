"use strict";

var newUser;
var letzte = null;
var jsonObj;
var allUsers;
var noUsers;
var loginUser;
var curProject;


/**
 * @desc Function for saving a JSON object to the Database. 
 *      The Object is a new User.
 *      The password is getting hashed.
 *      equal control password with config password 
 * @return a hash password; success or error
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

    
    if (name != undefined && content != null &&  password==confirmPassword) {
        var url = localhost + '/addFeature?name=' + email;
        // perform post ajax
        $.ajax({
            type: 'POST',
            data: content,
            url: url,
            timeout: 5000,
            success: function (data, textStatus) {
                alert(res);
                window.location.href = "/index.html";
            },
            error: function (xhr, textStatus, errorThrown) {
                alert(res);
            }
        });
        //loadFromDB();
    } else {
        console.log("fehler save to sb undefined oder null");
    }
  }
};



/**
 * @desc Function to checks if the user that wants to login is is saved in the database and if the password is correct.
 *      if the user entered the correct email and password the home.html is loaded.
 * @return Ajax success or error
 */
function loadFromDB() {
    var url = localhost + '/getFeatures';
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
                          setUserCookie();                          // from sessionFunctionality
                          window.location.href = "/home.html";
                      }else{
                          alert(res);
                      }
                }else{
                    alert(res);
                }
            }
            }
            
          }
        },
        error: function (xhr, textStatus, errorThrown) {
            alert(res);
        }
    });
};


/**
 * @desc Function to delete user
 * @return success or error
 */
function deleteUser() {
    var userArr = document.cookie.split("=");
    var url = localhost + '/deleteFeature?name=' + JSON.parse(userArr[1]).name;

    if (confirm("Are you sure?") == true) {

        } else {
            return;
        }

  	// ajax Post
	  $.ajax({
		url: url,
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

/**
 * @desc Function to save user data in json 
 * @return Ajax Please fill out all the input fields.
 */
function editUser(){
  var firstname = document.getElementById("firstName").value;
  var lastname = document.getElementById("lastName").value;
  var streetname = document.getElementById("streetName").value;
  var housenumber = document.getElementById("houseNumber").value;
  var postcode = document.getElementById("postcode").value;
  var city = document.getElementById("city").value;
  var institution = document.getElementById("institution").value;
  var email = document.getElementById("email").value;
  var newPassword = document.getElementById("newPassword").value;
  var confirmNewPassword = document.getElementById("confirmNewPassword").value;
  var country = document.getElementById("country").value;
  var hashPassword = newPassword.hashCode();
  var array = [firstname,lastname,streetname,housenumber,postcode,city,institution,email,newPassword,country, confirmNewPassword];

  var check=true;
  for (var i = 0; i < array.length; i++){
    if(array[i] == null ||array[i] == undefined ||array[i] == "")  {
      check = false;
    }
  }
  if(check == false){
    alert("Please fill out all the input fields.")
    return;
  }else {
     curUser = '{'
        +'"Firstname":' +'"' + firstname + '"' +', '
        +'"LastName":' +'"' + lastname + '"' +', '
        +'"StreetName":' +'"' + streetname + '"' +', '
        +'"HouseNumber":' +'"' + housenumber + '"' +', '
        +'"Postcode":' +'"' + postcode + '"' +', '
        +'"City":' +'"' + city + '"' +', '
        +'"Institution":' +'"' + institution + '"' +', '
        +'"Email":' +'"' + email + '"' +', '
        +'"Password":' +'"' + hashPassword + '"' +', '
        +'"Country":' +'"' + country + '"'

    +'}';

    var temp = document.cookie.split ("=");
    var oldUser = JSON.parse(temp[1]);

    updateFeatureData(oldUser.name,JSON.parse(curUser));

    document.cookie = "";
    document.location.href  = "index.html";
    };
};
