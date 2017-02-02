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


var download = function(){
    var options = {
	excludeParentFolder: true, //Default : false. if true, the content will be zipped excluding parent folder.
	parentFolderName: 'v1.0' //if specified, the content will be zipped, within the 'v1.0' folder
    };

    //zip a folder and change folder destination name
    var zip = new FolderZip();
    zip.zipFolder('../folder-zip', options, function(){
        zip.writeToFile('folderall.zip');
    });
}



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





function createTree() {
    $(function () {
        // 6 create an instance when the DOM is ready
        $('#jstree').jstree();
        // 7 bind to events triggered on the tree
        $('#jstree').on("changed.jstree", function (e, data) {
            loadScript(data.selected[0]);
        });
        // 8 interact with the tree - either way is OK
        //$('button').on('click', function () {
        //    $('#jstree').jstree(true).select_node('scripts_node_1');
        //    $('#jstree').jstree('select_node', 'images_node_1');
        //    $.jstree.reference('#jstree').select_node('results_node_1');
        //});
    });
}



function toSettings(){
    window.location.href = "/projectedit.html";
}
