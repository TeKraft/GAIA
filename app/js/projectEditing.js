"use strict;"

<<<<<<< HEAD
=======

// handles the button Settings
$(document).ready(function(){
    $('.btn-toSettings').on('click',toSettings);
});

>>>>>>> RaoulBeta
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
<<<<<<< HEAD
});
=======
});

function toSettings(){
    console.log("hi");
    window.location.href = "/projectedit.html";
}
>>>>>>> RaoulBeta
