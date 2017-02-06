"use strict;"

// handles the button "ChangeName of a Project"
$(document).ready(function(){
    $('.btn-changeProjectName').on('click',changeProjectName);
});

// handles the button "add Collaborator"
$(document).ready(function(){
    $('.btn-addCollab').on('click',addCollaborator);
});

var contentadd;


/**
  * @desc Adds a collaborator to the project
  * @return AJAX success or error
*/
function addCollaborator() {

    contentadd=null;
    var temp=document.cookie.split("=");

    var aktuellesProject = temp[3];


     var url = localhost + '/getFeatures';

    $.ajax({
        type: 'GET',
        dataType: 'JSON',
        url: url,
        async: false,
        timeout: 5000,
        success: function (content, textStatus) {
            $('#tableDBContents').empty();

            for(var i=0; i<= content.length;i++){

                if(content[i] != undefined && content[i].data != undefined && content[i].data.Creator != undefined && content[i].data.Creator != "null" && content[i].name == aktuellesProject){
                    contentadd = content[i];

                    break;
            }
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log("no success");
        }
    });

    var newCollab = document.getElementById('NewCollabName').value;
    var editedCollabe = newCollab.replace("@","atzeichen");
    editedCollab = editedCollabe.replace(".","punkt");
    editedCollab1 = editedCollab.replace('-','minus');
    editedCollab3 = editedCollab1.replace('_','unter');
    editedCollab2 = editedCollab1.replace('.','punkt');

    var neuesProjekt ="{" + '"Creator"' + ":" + JSON.stringify(contentadd.data.Creator) + ",";
    var neuesProjekt ="{" + '"Creator"' + ":" + JSON.stringify(contentadd.data.Creator) + ",";

    var str = JSON.stringify(contentadd.data.Colaborators).substring(0, JSON.stringify(contentadd.data.Colaborators).length - 1);

    var alleCollabs = '"Colaborators"' +  ":" + str + "," + editedCollab2 + '"' + ",";
    neuesProjekt = neuesProjekt + alleCollabs + '"Scripts"' + ":" +  '"' + contentadd.data.Scripts + '"' + "}"; //hier noch alles andere was gespeichert wird anhaengen

	updateFeatureData(aktuellesProject, JSON.parse(neuesProjekt));
    window.location.href = "/projectedit.html";

};

/**
  * @desc updates the data content of a Feature
  * @return AJAX success or error
*/
function updateFeatureData(featureName, newData){
    var url = localhost + '/updateFeature?name=' + featureName;
     // ajax Post
	$.ajax({
		url: url,
		//async: false,
		type: "POST",
		data: newData,

		success: function(xhr, textStatus, data){
            console.log("success");
			// do function loadFromDB() to refresh list, when save feature

		},
		error: function(textStatus, errorThrown){
			JL("error").info("updateFeature ajax");
			console.log(errorThrown);
		}
	});
}







/**
  * @desc Returns the content of a Project 
  * @param name (projectname)
  * @return AJAX success or error
*/
function getProjectByName(name){
var url = localhost + '/getFeatures';
    $.ajax({
        type: 'GET',
        dataType: 'JSON',
        url: url,
        timeout: 5000,
        async:false,
        success: function (content, textStatus) {
            $('#tableDBContents').empty();
            for(var i=0; i<= content.length;i++){

                if(content[i] != undefined && content[i].data != undefined && content[i].data.Creator != undefined && content[i].name == name){
                    var temp = content[i];
                    tempProject = temp;
                    return temp;
                }
            }
            return temp;
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log("no success");
        }
    });
};


