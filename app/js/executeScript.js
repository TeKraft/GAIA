var localhost = 'http://localhost:3000';

/**
  * @desc Function for sending the current projectname & choosen scriptname
  *       via AJAX.POST request and initiate the execution of the script.
*/
function executeScript(){
    var script = aktScript;
    var url = 'http://localhost:3000' + '/execScript';
    //name of the project, that is the current Project. Information cut out from cookie.
    var currentProject = document.cookie.split("=")[3];
    //AJAX:POST request with the current project and selected script.
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

  /**
    * @desc Function for initiating the creation of a CSV for all data in th SciDB.
  */
function getCSV() {
  console.log("getCSV()");
  var url = localhost + '/getsciDBdata';
  //AJAX.GET request to server.
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
/**
  * @desc Function for sending the current projectname via an AJAX.POST request
  *       to initiate the download of the whole project as a ZIP-folder.
*/
function downloadZip() {
    //Confirmation of the download intent
    var r = confirm("Do you really want to download this project?");
    if (r == true) {
      console.log("zipProject()");
      var myZipProjectName;
      var currentProject = document.cookie.split("=")[3];
      var url = localhost + '/zipMyShit';    //'/zipMyShit?name=' + currentProject;      //TODO : KANN DAS WEG?  :
      //AJAX:POST Request with the name of the current project.
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
