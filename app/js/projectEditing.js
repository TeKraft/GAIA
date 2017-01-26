




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
    
    getProjectbyName(name, "rkanschat@gmx.de");
    console.log(getProjectbyName(currentProject[3],"rkanschat@gmx.de"));
    
    readProjectFolderbyName(name);
    
    var curProject;
    curProject = getProjectbyName(name, "rkanschat@gmx.de");
    console.log(curProject);
    var scripts = createScriptNames();
    
    console.log(document.getElementById("jstree"));
    document.getElementById("jstree").innerHTML = "" + 
    "<ul id='treeList'>" + 
        "<li id='rootList'>" + name + 
            "<ul id='childList'>" +
                "<li id='scripts_node_1'>Scripts" +
        
                    "<ul id='childList'>" + 
                        scripts + 
                    "</ul>" + 
                    "</li>" +
                "<li id='images_node_1'>Images</li>" +
                "<li id='results_node_1'>Results</li>" +
            "</ul>" +
         "</li>" + 
     "</ul>;"
}


var createScriptNames = function(){
    var array = loadedProject.data.Scripts;
    console.log(loadedProject);
    
    
    
    var div = "<li id='scriptone'> "+ "scriptsasdasd" + "</li>";
    return div;
}

      
      

function createTree() {
    $(function () {
        // 6 create an instance when the DOM is ready
        $('#jstree').jstree();
        // 7 bind to events triggered on the tree
        $('#jstree').on("changed.jstree", function (e, data) {
            console.log(data.selected);
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
    console.log("hi");
    window.location.href = "/projectedit.html";
}

// 
