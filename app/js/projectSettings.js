"use strict;"

// handles the button "ChangeName of a Project"
$(document).ready(function(){
    $('.btn-changeProjectName').on('click',changeProjectName);
});

// handles the button "add Collaborator"
$(document).ready(function(){
    $('.btn-addCollab').on('click',addCollaborator);
});



// im internet steht nur wie man zb "creator" umbenennt.
function changeProjectName() {
    var content = '"' + document.getElementById('NewPrjName').value + '"';
    var toChangeProject = "sdff";
    console.log(content);

    if (content != undefined) {

        var url = 'http://localhost:3000' + '/updateFeature?name=' + toChangeProject;

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

        //loadFromDB();

    } else {
        console.log("fehler save to sb undefined oder null");
    }
};


// noch gucken ob schon wer mitarbeitet und wenn ja das komma weglassen

var contentadd;

function addCollaborator() {

    contentadd=null;
    var temp=document.cookie.split("=");

    var aktuellesProject = temp[3];




     var url = 'http://localhost:3000' + '/getFeatures';

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
            $('#tableDB').removeClass('hidden');
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log("no success");
        }
    });
            // hier den neuen einfuegen
    console.log(contentadd);
    var newCollab = document.getElementById('NewCollabName').value;
    var editedCollabe = newCollab.replace('@','diesisteinatzeichen');
    editedCollab = editedCollabe.replace('.','diesisteinpunktzeichen');

    var neuesProjekt ="{" + '"Creator"' + ":" + JSON.stringify(contentadd.data.Creator) + ",";
    var neuesProjekt ="{" + '"Creator"' + ":" + JSON.stringify(contentadd.data.Creator) + ",";

    var str = JSON.stringify(contentadd.data.Colaborators).substring(0, JSON.stringify(contentadd.data.Colaborators).length - 1);

    var alleCollabs = '"Colaborators"' +  ":" + str + "," + editedCollab + '"' + ",";
    neuesProjekt = neuesProjekt + alleCollabs + '"Scripts"' + ":" +  '"' + contentadd.data.Scripts + '"' + "}"; //hier noch alles andere was gespeichert wird anhaengen

    console.log(neuesProjekt);

	updateFeatureData(aktuellesProject, JSON.parse(neuesProjekt));
    window.location.href = "/projectedit.html";

};

function updateFeatureData(featureName, newData){
    console.log(newData);
     // ajax Post
	$.ajax({
		url: '/updateFeature?name=' + featureName,
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








function getProjectByName(name){
var url = 'http://localhost:3000' + '/getFeatures';
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
                    console.log(temp);
                    tempProject = temp;
                    return temp;
                }
            }
            return temp;
            $('#tableDB').removeClass('hidden');
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log("no success");
        }
    });
};


function updateProject(jsonString) {

	var dataTitle;
	var contentString = JSON.stringify(jsonString);
	var decodedcontentString = decodeURI(contentString);
	var content = JSON.parse(decodedcontentString);

	dataTitle = content.features[0].properties.name;

	// ajax Post
	$.ajax({
		url: '/updateFeature?name=' + dataTitle,
		//async: false,
		type: "POST",
		data: content,

		success: function(xhr, textStatus, data){
			// do function loadFromDB() to refresh list, when save feature
			loadToEdit();
		},
		error: function(textStatus, errorThrown){
			JL("error").info("updateFeature ajax");
			console.log(errorThrown);
		}
	});
};
