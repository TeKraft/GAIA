"use strict";

var firstName;
var lastName;
var streetName;
var houseNumber;
var postcode;
var city;
var email;
var password;
var institution;
var country;
var curUser;
var loginName;
var loginPW;
var usersusers;
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
    userdata[2] = streetName;
    userdata[3] = houseNumber;
    userdata[4] = postcode;
    userdata[5] =city;
    userdata[6] = institution;

    var editEmail = email.replace("." , "/");
    userdata[7] = editEmail;

    userdata[8] = password.hashCode();
    userdata[9] = country;

    curUser = '{'
        +'"Firstname":' +'"' + userdata[0] + '"' +', '
        +'"LastName":' +'"' +userdata[1] + '"' +', '
        +'"StreetName":' +'"' +userdata[2] + '"' +', '
        +'"HouseNumber":' +'"' +userdata[3] + '"' +', '
        +'"Postcode":' +'"' +userdata[4] + '"' +', '
        +'"City":' +'"' +userdata[5] + '"' +', '
        +'"Institution":' +'"' +userdata[6] + '"' +', '
        +'"Email":' +'"' +userdata[7] + '"' +', '
        +'"Password":' +'"' +userdata[8] + '"' +', '
        +'"Country":' +'"' +userdata[9] + '"'
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

function loadStreetName(){
    streetName = document.getElementById('form-street-name').value
    console.log(streetName);
}

function loadHouseNumber(){
    houseNumber = document.getElementById('form-house-number').value
    console.log(houseNumber);
}

function loadPostcode(){
    postcode = document.getElementById('form-postcode').value
    console.log(postcode);
}

function loadCity(){
    city = document.getElementById('form-city').value
    console.log(city);
}

function loadEmail(){
    email = document.getElementById('form-email').value
    console.log(email);
}

function loadPassword(){
    password = document.getElementById('form-password').value
    console.log(password.hashCode());
}

function loadInstitution(){
    institution = document.getElementById('form-institution').value
    console.log(institution);
}

function loadCountry() {
    country = document.getElementById('form-country').value
    console.log(country);
}

function loadLoginName(){
    loginName = document.getElementById('form-Login-username').value
    console.log(loginName);
}
function loadLoginPW(){
    loginPW = document.getElementById('form-login-pw').value
    console.log(loginPW.hashCode());
}


String.prototype.hashCode = function() {
  var hash = 0, i, chr, len;
  if (this.length === 0) return hash;
  for (i = 0, len = this.length; i < len; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;

    
    
    
     };
