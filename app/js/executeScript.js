/**
  * @desc Function for executing a selected Script
  *       The content of the script gets saved in a tmp file and the header is preapended to that tmp file.
  *       An AJAX.POST request executes the script via nodes childProcesses. A callback approves the execution.
  *       The tmp-file is deleted afterwards.
  * @return AJAX success or error
*/
function executeScript() {
    var scriptName = aktScript;
    var projectName = document.cookie.split("=")[3];
    var path = projectName + "/Scripts/" + scriptName;
    console.log(scriptName + "\n" + projectName);
    readScriptbyName(path);
    console.log(tempScript);
    var content = {scriptName: scriptName, project: projectName, scriptData: tempScript};
    // var url = localhost + '/prependMyFile';
    var url = localhost + '/callMeMaybe';
    $.ajax({
      url: url,
      type: 'POST',
      data: content,
      success: function(res){
        console.log(res);
        alert("Script has been executed! \n -->"+res);
        try {
          deleteTempScript();
        }
        catch(err) {
          alert("Error occured when processing the script!")
          return;
        }
      },
      error: function (xhr, textStatus, errorThrown) {
        window.alert(res);
    }
    });
  };

  /**
    * @desc Function for deleting the temp files created for executing the script with the standart script header.
    * @return AJAX success or error
  */
  var deleteTempScript = function(){
      var url = localhost + '/deleteTempFile';
      var namevomScript = "temp"+aktScript;
      var data = {
          "scriptName"  : "" + namevomScript + "",
      }
      $.ajax({
          type: 'POST',
          url: url,
          data:data,
          //inhalt:data,
          timeout: 5000,
          success: function (data, textStatus) {
          },
          error: function (xhr, textStatus, errorThrown) {
              res.send("Could not delete temp files");
          }
      });
  };

  /**
    * @desc Function for initiating the creation of a CSV for all data in th SciDB.
    * @return AJAX success or error
  */
function getCSV() {
  var url = localhost + '/getsciDBdata';
  //AJAX.GET request to server.
  $.ajax({
    type: 'GET',
    url: url,
    success: function (content, textStatus) {
      alert(res);
    },
    error: function (xhr, textStatus, errorThrown) {
        console.log(res);
        alert(res);
    }
  });
};

// ###########################
// zip files #################
// ###########################
/**
  * @desc Function for sending the current projectname via an AJAX.POST request
  *       to initiate the download of the whole project as a ZIP-folder.
  * @return AJAX success or error
*/
function downloadZip() {
    //Confirmation of the download intent
    var r = confirm("Do you really want to download this project?");
    if (r == true) {
      console.log("zipProject()");
      var myZipProjectName;
      var currentProject = document.cookie.split("=")[3];
      var url = localhost + '/zipMyShit';
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
