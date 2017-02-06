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

    var uploads = createUploadNames(name);
    //readProjectFolderbyName(project + "/Scripts");  "wurstbrot/Scripts"

    var curProject;
    curProject = getProjectbyName(name);
    var scripts = createScriptNames(name);
    var uploads = createUploadNames(name);
    var results = createResultNames(name);
    //var results = resultsFirst.replace("," , "");

    document.getElementById("jstree").innerHTML = "" +
    "<ul id='treeList'>" +
        "<li id='rootList' >" + name +
            "<ul id='childList'>" +
                "<li id='scripts_node_1'>Scripts" +

                    "<ul id='childList'>" +
                        scripts +
                    "</ul>" +
                "</li>" +

                "<li id='uploads_node_1'>Uploads" +
                    "<ul id='childList'>" +
                        uploads+ //images +
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


/**
  * @desc returns the given array without dublicates
*/
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

/**
  * @desc Creates the treeview childList for the Results
*/
var createResultNames = function(name){
    readProjectFolderbyName(name + "/Results");
    var resultArray = array_unique(temp);
    var div = "";

    for (var i in resultArray){
        var ending = resultArray[i];
        if(ending.includes('.png') || ending.includes('.jpg')|| ending.includes('.txt')){
            div = div + ("<li id='" + resultArray[i] + ",' data-jstree='{"+'"type"'+":"+'"leaf"'+"}'> "+ resultArray[i] + "</li>");
        }else{
            if(!ending.includes('.')){
                // mit jeden ending subordner erstellen;
                var subFolders = createSubFolders(name + "/Results/" +  ending);
                if(subFolders != undefined && subFolders != ""){
                    // hier muss jetzt alles erstellt werden alle unter ordner und unter unter ordner und dateien

                    div = div +
                        "<li id="+ending+">" +
                            ending +
                            subFolders[0] +
                        "</li>";
                }else{
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


/**
  * @desc creates all subfolders of a given folder
*/
var createSubFolders = function(path){;
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
                    "<li id='" + resultArray[i] + "' "+ ",' data-jstree='{"+'"type"'+":"+'"leaf"'+"}'> "+ resultArray[i] + "</li>" +
                "</ul>");
        }
    }
    return subContent;
}


/**
  * @desc Creates the treeview childList for the Uploads
*/
var createUploadNames = function(projectname){
    readProjectFolderbyName(projectname + "/Uploads");
    var UploadArray = array_unique(temp);
    var div = "";
    for (var i in UploadArray){
        var ending = UploadArray[i];
        //if(ending.includes('.png') || ending.includes('.jpg')){
            div = div + ("<li id='" + UploadArray[i] + ",' data-jstree='{"+'"type"'+":"+'"leaf"'+"}'> "+ UploadArray[i] + "</li>");
        //}else{

        //}
    }
    return div;
}

/**
  * @desc Creates the treeview childList for the Scripts
*/
var createScriptNames = function(projectname){

    readProjectFolderbyName(projectname + "/Scripts");  //projectname + "Scripts"
    var ScriptArray = array_unique(temp);

    var div = "";
    for (var i in ScriptArray){
        var ending = ScriptArray[i].substr(ScriptArray[i].length-2, ScriptArray[i].length);
        if(ending === '.R'){
            div = div + ("<li" + " id='" + ScriptArray[i] + ",' data-jstree='{"+'"type"'+":"+'"leaf"'+"}'>"  + ScriptArray[i] + "</li>");
        }else{

        }
    }
    return div;
}

/**
  * @desc Sets the value of the input field to the content of the given script
*/
var rToInput = function(scriptname){
    var tempCookie = document.cookie.split("=");
    var projectname = tempCookie[3];
    var path = projectname + "/Scripts/" + scriptname;

    //hier erst gucken ob .R Datei ist.
    if(scriptname.includes('.R')){
        readScriptbyName(path);
        document.getElementById("scriptIn").value = tempScript;
    }else{
        return;
    }

}



var tempScript;

/**
  * @desc Returns the content of a given script
  * @return AJAX success or error
*/
var readScriptbyName = function(path){
  if (path == "") {
    console.log("value empty");
  }  else {

      var path = "" + path;
      
    var url = localhost + '/readFile?name=' + path;
    // perform post ajax
    $.ajax({
        type: 'GET',
        url: url,
        async:false,
        timeout: 5000,
        success: function (content, textStatus) {
            tempScript = content;
            return content;
        },
        error: function (xhr, textStatus, errorThrown) {
            alert("failed to read sriptbyname");
            console.log("no success");
        }
    });
  }
};

var aktScript;

/**
  * @desc Creates the treeview
*/
function createTree() {

    $(function () {

        // 6 create an instance when the DOM is ready
        $('#jstree').jstree(
    {
    "types" : {
      "default" : {
        "icon" : "glyphicon glyphicon-folder-open"
      },
      "leaf" : {
        "icon" : "glyphicon glyphicon-paperclip"
      },
    },


            "plugins" : [
	"contextmenu",
	"dnd",
	"massload",
	"search",
	"types",
	"unique",
	"wholerow",
	"changed",
	"conditionalselect"
  ]});


        $('#jstree').on("changed.jstree", function (e, data) {
        if(saved == false){
            if (confirm("did you save your Project?") == true) {
                var select = data.selected[0];
                aktScript = select.slice(0,select.length-1);
                rToInput(aktScript);
            } else {
                return;
            }
            }else{
            aktScript = data.selected[0].replace(",","");
            document.getElementById("scriptIn").style.display =  'inline-block';
            rToInput(aktScript.replace(",",""));
    }

        });
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
