"use strict";

var firstName;
var lastName;
var email;
var password;
var institution;
<<<<<<< HEAD
=======
var country;
>>>>>>> refs/remotes/origin/Beta

var curUser;

var loginName;
var loginPW;
var usersusers


var access = false;

var userdata = { 
    
};

var objects = 0;


/*
creates a JSON string from the input fields
*/
function loadUser(){
    userdata[0] = firstName;
    userdata[1] = lastName;
    
    var editEmail = email.replace("." , "/");
    userdata[2] = editEmail;
    
    userdata[3] = password;
    userdata[4] = institution;
<<<<<<< HEAD
=======
        userdata[5] = country;
>>>>>>> refs/remotes/origin/Beta
    
    curUser = '{'
       +'"Firstname":' +'"' + userdata[0] + '"' +', '
       +'"LastName":' +'"' +userdata[1] + '"' +', '
       +'"Email":' +'"' +userdata[2] + '"' +', '
       +'"Password":' +'"' +userdata[3] + '"' +', '
       +'"Institution":' +'"' +userdata[4] + '"' +', '
<<<<<<< HEAD
=======
    +'"Country":' +'"' +userdata[5] + '"' +', '
>>>>>>> refs/remotes/origin/Beta
       +'"Projects":' +'"'  + '"'
       +'}';
}


/*
Initializes the variables with the inut fields
*/
function loadFirstName(){
    firstName = document.getElementById('form-first-name').value
    console.log(firstName);
}
function loadLastName(){
    lastName = document.getElementById('form-last-name').value
    console.log(lastName);
}
function loadEmail(){
    email = document.getElementById('form-email').value
    console.log(email);
}
function loadPassword(){
    password = document.getElementById('form-password').value
    console.log(password);
}
function loadInstitution(){
    institution = document.getElementById('form-institution').value
    console.log(institution);
}

<<<<<<< HEAD
=======
function loadCountry() {
    country = document.getElementById('form-country').value
    console.log(country);
}

>>>>>>> refs/remotes/origin/Beta
function loadLoginName(){
    loginName = document.getElementById('form-Login-username').value
    console.log(loginName);
}
function loadLoginPW(){
    loginPW = document.getElementById('form-login-pw').value
    console.log(loginPW);
}

<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
function loadUser(){
    userdata[0] = firstName;
    userdata[1] = lastName;
    
    var editEmail = email.replace("." , "/");
    userdata[2] = editEmail;
    console.log(editEmail + "email");
    
    userdata[3] = password;
    userdata[4] = institution;
    
    curUser = '{'
       +'"Firstname":' +'"' + userdata[0] + '"' +', '
       +'"LastName":' +'"' +userdata[1] + '"' +', '
       +'"Email":' +'"' +userdata[2] + '"' +', '
       +'"Password":' +'"' +userdata[3] + '"' +', '
       +'"Institution":' +'"' +userdata[4] + '"' +', '
       +'"Projects":' +'"'  + '"'
       +'"Institution":' +'"' +userdata[4] + '"'
       +'}';
}
>>>>>>> origin/Beta
>>>>>>> refs/remotes/origin/Beta



