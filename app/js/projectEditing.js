"use strict;"

function uploadImage(){
    var image = document.getElementById("myFile");
    var myCanvas = $('<canvas/>');
    var myImageSrc = myCanvas.attr('src', 'http://www.google.com/imgres?imgurl=http://www.gettyimages.co.uk/gi-resources/images/Homepage/Category-Creative/UK/UK_Creative_462809583.jpg&imgrefurl=http://www.gettyimages.co.uk/&h=280&w=562&tbnid=Gd_Suvvlpe2UbM:&docid=tUvJ118IkhewgM&ei=kZjVVcXQO8np-QGkjoSYAQ&tbm=isch&ved=0CDIQMygAMABqFQoTCIXdpbqnt8cCFcl0PgodJAcBEw');
    myCanvas.attr('src', myImageSrc);
    var dataInBase64 = $(myCanvas)[0].toDataURL('image/png').replace(/data\:image\/png;base64,/, '');
    console.log(dataInBase64);
    return dataInBase64;

}

 function readURL(input) {
     var base64 = uploadImage();
     binEncode(base64);
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('#blah')
                        .attr('src', e.target.result)
                        .width(150)
                        .height(200);
                };
                reader.readAsDataURL(input.files[0]);
            }
}

function binEncode(data) {
    var binArray = []
    var datEncode = "";
    for (i=0; i < data.length; i++) {
        binArray.push(data[i].charCodeAt(0).toString(2));
    }
    for (j=0; j < binArray.length; j++) {
        var pad = padding_left(binArray[j], '0', 8);
        datEncode += pad + ' ';
    }
    function padding_left(s, c, n) { if (! s || ! c || s.length >= n) {
        return s;
    }
    var max = (n - s.length)/c.length;
    for (var i = 0; i < max; i++) {
        s = c + s; } return s;
    }
    console.log(binArray);
}

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
    var curProject;
    curProject = getProjectbyName(name, "rkanschat@gmx.de");
    console.log("curProject");
    console.log(document.getElementById("jstree"));
    document.getElementById("jstree").innerHTML = "" +
    "<ul id='treeList'>" +
        "<li id='rootList'>" + name +
            "<ul id='childList'>" +
                "<li id='scripts_node_1'>Scripts</li>" +
                "<li id='images_node_1'>Images</li>" +
                "<li id='results_node_1'>Results</li>" +

            "</ul>" +
         "</li>" +
     "</ul>;"
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
        $('button').on('click', function () {
            $('#jstree').jstree(true).select_node('scripts_node_1');
            $('#jstree').jstree('select_node', 'images_node_1');
            $.jstree.reference('#jstree').select_node('results_node_1');
        });
    });
}

function toSettings(){
    console.log("hi");
    window.location.href = "/projectedit.html";
}

function getProjectbyName(name, creator) {
    var url = 'http://localhost:3000' + '/getFeatures';
    $.ajax({
        type: 'GET',
        dataType: 'JSON',
        url: url,
        timeout: 5000,
        success: function (content, textStatus) {
            $('#tableDBContents').empty();
            var project;
            for (var i = 0; i <= content.length; i++) {
                if (content[i] != undefined && content[i].data != undefined && content[i].data.Creator == creator && content[i].name == name) {
                    project = content[i];
                    console.log(project);
                    return JSON.stringify(project);
                }
            }
            $('#tableDB').removeClass('hidden');
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log("no success");
        }
    });

    //return project;
};
