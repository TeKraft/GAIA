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

    var scripts = createScriptNames(name);

    var images = createImageNames(name);

    var results = createResultNames(name);

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
                        results+ //images +
                    "</ul>" +
                "</li>" +
            "</ul>" +
         "</li>" +
     "</ul>"
}

function array_unique(arrayName) {
	var newArray = new Array();
	label:for(var i=0; i<arrayName.length;i++ ) {
		for(var j=0; j<newArray.length;j++ ) {
		        if(newArray[j] == arrayName[i])
				continue label;
			}
		        newArray[newArray.length] = arrayName[i];
	}
	return newArray;
}


var createResultNames = function(name){
    readProjectFolderbyName(name + "/Results");
    var resultArray = array_unique(temp);
    console.log(resultArray);
    var div = "";

    for (var i in resultArray){
        var ending = resultArray[i];
        if(ending.includes('.png') || ending.includes('.jpg')|| ending.includes('.txt')){
            div = div + ("<li id='" + resultArray[i] + "'> "+ resultArray[i] + "</li>");
        }else{
            if(!ending.includes('.')){
                // mit jeden ending subordner erstellen;
                //console.log(name);
                var subFolders = createSubFolders(name + "/Results/" +  ending);
                if(subFolders != undefined && subFolders != ""){
                    // hier muss jetzt alles erstellt werden alle unter ordner und unter unter ordner und dateien

                    div = div +  
                        "<li id="+ending+">" +
                            ending +
                                    subFolders[0] +
                                    //console.log(subFolders[0]);
                                
                        "</li>";
                }else{
                    //console.log(ending + " keine subfolder");
                    div = div + ("<li id='" + resultArray[i] + "'> "+ resultArray[i] + "</li>");
                }
            }
        }
    }
    return div;
}

var getNumberOFSub = function(path){
    var number = 0;
    
    
    return number;
}

var createSubFolders = function(path){
    //console.log(path);
    readProjectFolderbyName(name + path);
    var resultArray = array_unique(temp);
    var div = "";
    var subContent = [];

    for (var i in resultArray){
        //var ending = resultArray[i];
        
        if(!resultArray[i].includes('.')){
            //for(var j in resultArray){
                
                if(resultArray[i].includes(".")){
                    return;
                }
                subContent.push(
                "<ul id = 'childList'>" + 
                    "<li id='" + resultArray[i] + "'> "+ resultArray[i] + 
                        createSubFolders(path + "/" + resultArray[0]) + 
                    "</li>" +
                "</ul>");
        }else{
            subContent.push(
            "<ul id = 'childList'>" + 
                    "<li id='" + resultArray[i] + "'> "+ resultArray[i] + "</li>" +
                "</ul>");
        }
    }
    return subContent;
}

/*
if(ending.includes('.png') || ending.includes('.jpg')|| ending.includes('.txt')){
            div = div + ("<li id='" + resultArray[i] + "'> "+ resultArray[i] + "</li>");

        }else{
            if(!ending.includes('.')){
                console.log(ending);
                readProjectFolderbyName(name + "/Results/" + ending);
                console.log(array_unique(temp));

                div = div + ("<li id='" + resultArray[i] + "'> "+ resultArray[i] + "</li>");



            }
        }
*/


var createImageNames = function(projectname){
    readProjectFolderbyName(projectname + "/Images");
    var ImageArray = array_unique(temp);
    var div = "";
    for (var i in ImageArray){
        var ending = ImageArray[i];
        if(ending.includes('.png') || ending.includes('.jpg')){
            div = div + ("<li id='" + ImageArray[i] + "'> "+ ImageArray[i] + "</li>");
        }else{

        }
    }
    return div;
}


var createScriptNames = function(projectname){

    readProjectFolderbyName(projectname + "/Scripts");  //projectname + "Scripts"
    var ScriptArray = array_unique(temp);

    var div = "";
    for (var i in ScriptArray){
        var ending = ScriptArray[i].substr(ScriptArray[i].length-2, ScriptArray[i].length);
        if(ending === '.R'){
            div = div + ("<li" + " id='" + ScriptArray[i] + "' " + "" + ">"  + ScriptArray[i] + "</li>");
        }else{

        }
    }
    return div;
}

var rToInput = function(scriptname){
    var tempCookie = document.cookie.split("=");
    var projectname = tempCookie[3];
    console.log(projectname);
    var path = projectname + "/Scripts/" + scriptname;

    //hier erst gucken ob .R Datei ist.
    if(scriptname.includes('.R')){
        readScriptbyName(path);
        console.log(tempScript);
        document.getElementById("scriptIn").value = tempScript;
    }else{
        return;
    }

}



var tempScript;
var readScriptbyName = function(path){
  if (path == "") {
    console.log("value empty");
  }  else {

      var path = "" + path;

    //var folderRead = name;
    //console.log("readProjectFolder("+folderRead+")");

    var url = localhost + '/readFile?name=' + path;
    // perform post ajax
    $.ajax({
        type: 'GET',
        url: url,
        async:false,
        timeout: 5000,
        success: function (content, textStatus) {
            console.log(content);
            tempScript = content;
            //cb(content);
            return content;
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log("no success");
        }
    });
  }
};

var aktScript;
function createTree() {

    $(function () {
        // 6 create an instance when the DOM is ready
        $('#jstree').jstree();
        // 7 bind to events triggered on the tree
        $('#jstree').on("changed.jstree", function (e, data) {
        if(saved == false){
            if (confirm("did you save your Project?") == true) {
                console.log(data.selected[0]);
                aktScript = data.selected[0];
                rToInput(aktScript);
            } else {
                return;
            }
            }else{
                console.log(data.selected[0]);
            aktScript = data.selected[0];
            rToInput(aktScript);
    }

        });
        // 8 interact with the tree - either way is OK
        //$('button').on('click', function () {
        //    $('#jstree').jstree(true).select_node('scripts_node_1');
        //    $('#jstree').jstree('select_node', 'images_node_1');
        //    $.jstree.reference('#jstree').select_node('results_node_1');
        //});
    });
}

var saved = true;

var changedScript = function(){
    saved = false;
    console.log("saved set to false");
}




var toSettings = function(){
    if(saved == false){
        if (confirm("did you save your Project?") == true) {

            } else {
                return;
            }
        window.location.href = "/projectedit.html";
    }else{
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
    }else{
        window.location.href = "home.html";
    }
}

var toGaia = function(){
    if(saved == false){
        if (confirm("Did you save your Project") == true) {
          document.location.href = "gaia.html"
        } else {
            return;
        }
    }else{
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
    }else{
        window.location.href = "profiledit.html";
    }
}
var toImpressum = function(){
    if(saved == false){
        if (confirm("Did you save your Project") == true) {

            } else {
                return;
            }
        document.location.href = "impressum.html"
    }else{
        window.location.href = "impressum.html";
    }
}
var toProfil = function(){
    if(saved == false){
        if (confirm("Did you save your Project") == true) {

            } else {
                return;
            }
        document.location.href = "profil.html";
    }else{
        window.location.href = "profil.html";
    }
}

var toLogout = function(){
    if(saved == false){
        if (confirm("Did you save your Project") == true) {

            } else {
                return;
            }
        logout();
    }else{
        logout();
    }
}
