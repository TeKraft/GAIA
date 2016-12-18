"use strict";

var newUser;
var letzte = null;
var jsonObj;
var allUsers;
var noUsers;

var loginUser;











/**
 * saves a JSON object to the Database. The Object is a new User.
 */
function saveRegister() {
    // creates a new User from the input fields (userManagementfunctionality)
    loadUser();
    
    newUser = curUser;

    var content = JSON.parse(newUser);
    
    //hier statt name email denke ich
    if (name != undefined && content != null) {

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
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log("failed to save to db");
            }
        });

        loadFromDB();

    } else {
        console.log("fehler save to sb undefined oder null");
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
            $('#tableDBContents').empty();

            
            loadLoginName();    // aus userManagementfunctionality
            loadLoginPW();      // aus userManagementfunctionality

            
            for(var i=0; i<= content.length;i++){
                
                if(content[i] != undefined && content[i].data != undefined && content[i].data.Email != undefined){
                    
                //unnötig wenn nur name des features gecheckt wird
                var checkEmail = content[i].data.Email.replace("/" , ".");
                    
                if(content[i] != undefined && checkEmail == loginName){
                      if(content[i].data.Password == loginPW){
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
            
            $('#tableDB').removeClass('hidden');
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log("no success");
        }
    });
};











/*
function gutenTag(){
    console.log(allUsers);
}
*/
