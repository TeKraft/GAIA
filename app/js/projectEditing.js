// handles the button Settings
$(document).ready(function(){
    $('.btn-toSettings').on('click',toSettings);
});

$(function () { $('#jstree_demo_div').jstree(); });

$('#jstree_demo_div').on("changed.jstree", function (e, data) {
  console.log(data.selected);
});

// TODO: Error jstree is not a function
$('#buttonTree').on('click', function () {
	console.log("es läuft");
  $('#jstree').jstree(true).select_node('child_node_1');
  $('#jstree').jstree('select_node', 'child_node_1');
  $.jstree.reference('#jstree').select_node('child_node_1');
});





















// hier muss der baum richtig erstellt werden
function makeTreeComponents(name) {
    var tempCookie = document.cookie.split("=");
    var project = tempCookie[5];

    getProjectbyName(name);

    var images = createImageNames(name);

    //readProjectFolderbyName(project + "/Scripts");  "wurstbrot/Scripts"





    var curProject;
    curProject = getProjectbyName(name);
    //console.log(curProject);

    var scripts = createScriptNames(name);

    var images = createScriptNames(name);

    //console.log(document.getElementById("jstree"));
    document.getElementById("jstree").innerHTML = "" +
    "<ul id='treeList'>" +
        "<li id='rootList'>" + name +
            "<ul id='childList'>" +
                "<li id='scripts_node_1'>Scripts" +

                    "<ul id='childList'>" +
                        scripts +
                    "</ul>" +
                "</li>" +

                "<li id='images_node_1'>Images" +
                    "<ul id='childList'>" +
                        images+ //images +
                    "</ul>" +
                "</li>" +

                "<li id='results'>Results" +
                    "<ul id='childList'>" +
                        images+ //images +
                    "</ul>" +
                "</li>" +
            "</ul>" +
         "</li>" +
     "</ul>;"
}

var createImageNames = function(projectname){
    readProjectFolderbyName(projectname + "/Images");
    var ImageArray = temp;
    var div = "";
    //for (var i in ScriptArray){
        div = div + ("<li id='" + ImageArray[ImageArray.length-1] + "'> "+ ImageArray[ImageArray.length-1] + "</li>");
    //}
    return div;
}


var createScriptNames = function(projectname){
    readProjectFolderbyName(projectname + "/Scripts");  //projectname + "Scripts"
    var ScriptArray = temp;
    var div = "";
    //for (var i in ScriptArray){
        div = div + ("<li id='" + ScriptArray[ScriptArray.length-1] + "'> "+ ScriptArray[ScriptArray.length-1] + "</li>");
    //}
    return div;
}




var aktScript;
function createTree() {
    $(function () {
        // 6 create an instance when the DOM is ready
        $('#jstree').jstree();
        // 7 bind to events triggered on the tree
        $('#jstree').on("changed.jstree", function (e, data) {
            console.log(data.selected[0]);
            aktScript = data.selected[0];
            //loadScript(data.selected[0]);
        });
        // 8 interact with the tree - either way is OK
        //$('button').on('click', function () {
        //    $('#jstree').jstree(true).select_node('scripts_node_1');
        //    $('#jstree').jstree('select_node', 'images_node_1');
        //    $.jstree.reference('#jstree').select_node('results_node_1');
        //});
    });
}
var saved = false;


var toSettings = function(){
    if(saved == false){
        if (confirm("did you save your Project?") == true) {

            } else {
                return;
            }
        window.location.href = "/projectedit.html";
    }
}



var toHome = function(){
    if(saved == false){
        if (confirm("Did you save your Project") == true) {

            } else {
                return;
            }
        document.location.href = "home.html"
    }
}

var toGaia = function(){
    if(saved == false){
        if (confirm("Did you save your Project") == true) {

            } else {
                return;
            }
        document.location.href = "gaia.html"
    }
}

var toProfilEdit = function(){
    if(saved == false){
        if (confirm("Did you save your Project") == true) {

            } else {
                return;
            }
        document.location.href = "profiledit.html"
    }
}
var toImpressum = function(){
    if(saved == false){
        if (confirm("Did you save your Project") == true) {

            } else {
                return;
            }
        document.location.href = "impressum.html"
    }
}
var toProfil = function(){
    if(saved == false){
        if (confirm("Did you save your Project") == true) {

            } else {
                return;
            }
        document.location.href = "profil.html";
    }
}

var toLogout = function(){
    if(saved == false){
        if (confirm("Did you save your Project") == true) {

            } else {
                return;
            }
        logout();
    }
}


var download = function(){

}
