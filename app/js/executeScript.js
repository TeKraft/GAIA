var localhost = 'http://localhost:3000';

function executeScript(){
    var script = aktScript;
    var url = 'http://localhost:3000' + '/execScript';
    var currentProject = document.cookie.split("=")[3];
    $.ajax({
        type: 'POST',
        data: {project: ""+currentProject+"", script: ""+script+""},
        url: url,
        success: function (content, textStatus) {
          console.log("success");
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log("no success");
        }
    });
  };

function getMap() {
  document.getElementById("leafletmap").innerHTML = "";
  $("#leafletmap").fadeIn(1000);
  leaflet();
}

//import result-html from TMS via iFrame
function createiframe() {
  leafmap.remove();
  var html = document.getElementById("htmlPath");
  var objectURL = "../projects/" + html.value;
  document.getElementById("leafletmap").innerHTML = '<iframe id="iframeMap" src="' + objectURL + '" height="100%" width="100%" name"myIframe"></iframe>';
}

// get csv data - datasets.csv has data about sciDB datasets
function getCSV() {
  console.log("getCSV()");

  var url = localhost + '/getsciDBdata';
  $.ajax({
    type: 'GET',
    url: url,
    success: function (content, textStatus) {
      console.log("success getCSV()");
    },
    error: function (xhr, textStatus, errorThrown) {
        console.log("no success");
    }
  });
};


// ###########################
// zip files #################
// ###########################

// download current project as .zip file
function downloadZip() {
    var r = confirm("Do you really want to download this project?");
    if (r == true) {

      console.log("zipProject()");
      var myZipProjectName;
      var currentProject = document.cookie.split("=")[3];

      var url = localhost + '/zipMyShit'; //'/zipMyShit?name=' + currentProject;
      $.ajax({
        type: 'POST',
        url: url,
        async: false,
        data: {projectName: currentProject},
        success: function (content, textStatus) {
          myZipProjectName = content;
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log("no success");
        }
      });
      window.location = '../projects/' + myZipProjectName + '.zip';
    } else {
      return;
    }
}
