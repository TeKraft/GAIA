"use strict";

window.onload = function(){
    if(document.cookie.length != 0){
        
        var path = window.location.pathname;
        switch(path){
            case "/home.html" :
                var userArray = document.cookie.split("=");
                var userJSON = JSON.parse(userArray[1]);
                document.getElementById("pofilSymb").textContent = userJSON.Firstname;
                break;
                
            case "/work.html":
                var userArray = document.cookie.split("=");
                var userJSON = JSON.parse(userArray[1]);
                document.getElementById("workProfilSymb").textContent = userJSON.Firstname;
                break;
                
            case "/profiledit.html":
                var userArray = document.cookie.split("=");
                var userJSON = JSON.parse(userArray[1]);
                document.getElementById("editProfilSymb").textContent = userJSON.Firstname;
                break;
            case "/impressum.html":
                var userArray = document.cookie.split("=");
                var userJSON = JSON.parse(userArray[1]);
                document.getElementById("imprProfilSymb").textContent = userJSON.Firstname;
                break;
                
        }
    }
    
}

function setUserCookie(){
    
    var userLogin = loginUser;
    
    document.cookie = "User=" + userLogin;
}

function logout(){
    document.cookie = "";
    window.location.href = "login&registry.html";
}

function deleteUser(){
    GAIA.updateOne(
   { "favorites.artist": "Picasso" },
   {
     $set: { "favorites.food": "pie", type: 3 },
     $currentDate: { lastModified: true }
   }
)
}

