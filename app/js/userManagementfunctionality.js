"use strict";
var checkInputField;
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
var userdata = new Array();
var objects = 0;


/**
 * @desc Function to check input fields onLoad 
 * @return backgroundColor red or white
 */
function loadID(id) {
    var inputVal = document.getElementById(id).value;
    var input = document.getElementById(id);

    if (id == undefined || inputVal === "") {
        input.style.backgroundColor = 'IndianRed';
        checkInputField = false;
    } else {
        input.style.backgroundColor = 'white';
    }
}

/**
 * @desc Function for creating a JSON string from the input fields
 */
function loadUser() {
    checkInputField = true;
    var data = ["form-first-name", "form-last-name", "form-street-name", "form-house-number", "form-postcode", "form-city", "form-institution", "form-email", "form-password", "form-confirmPassword", "form-country"];

    for (var i = 0; i < data.length; i++) {
        loadID(data[i]);
    };

    if (checkInputField == false) {
        console.log("no input in field");
    } else {
        userdata[0] = firstName;
        userdata[1] = lastName;
        userdata[2] = streetName;
        userdata[3] = houseNumber;
        userdata[4] = postcode;
        userdata[5] = city;
        userdata[6] = institution;

        var editEmail = email.replace(".", "/");
        userdata[7] = editEmail;
        userdata[8] = password.hashCode();
        userdata[9] = country;

        curUser = '{' + '"Firstname":' + '"' + userdata[0] + '"' + ', ' + '"LastName":' + '"' + userdata[1] + '"' + ', ' + '"StreetName":' + '"' + userdata[2] + '"' + ', ' + '"HouseNumber":' + '"' + userdata[3] + '"' + ', ' + '"Postcode":' + '"' + userdata[4] + '"' + ', ' + '"City":' + '"' + userdata[5] + '"' + ', ' + '"Institution":' + '"' + userdata[6] + '"' + ', ' + '"Email":' + '"' + userdata[7] + '"' + ', ' + '"Password":' + '"' + userdata[8] + '"' + ', ' + '"Country":' + '"' + userdata[9] + '"' + '}';
    }
}

/*
Initializes the variables with the inut fields
*/
function loadFirstName() {
    firstName = document.getElementById('form-first-name').value
}

function loadLastName() {
    lastName = document.getElementById('form-last-name').value
}

function loadStreetName() {
    streetName = document.getElementById('form-street-name').value
}

function loadHouseNumber() {
    houseNumber = document.getElementById('form-house-number').value
}

function loadPostcode() {
    postcode = document.getElementById('form-postcode').value
}

function loadCity() {
    city = document.getElementById('form-city').value
}

function loadEmail() {
    email = document.getElementById('form-email').value
}

function loadPassword() {
    password = document.getElementById('form-password').value
}

function loadInstitution() {
    institution = document.getElementById('form-institution').value
}

function loadCountry() {
    country = document.getElementById('form-country').value
}

function loadLoginName() {
    loadID('form-Login-username');
    loginName = document.getElementById('form-Login-username').value
}

function loadLoginPW() {
    loadID('form-login-pw');
    loginPW = document.getElementById('form-login-pw').value
}

/**
 * @desc Function for hashing COde 
 * @return a hashed code
 */
String.prototype.hashCode = function () {
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