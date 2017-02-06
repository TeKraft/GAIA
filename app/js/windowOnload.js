/**
  * @desc function on load
  *       show map and get unique feature by ID over url
  * @return data for workRead.html
  */
window.onload = function() {
  showMapToRead();
  var thisURL = window.location.href;
  var thisID = thisURL.substring(36, thisURL.length);
  getUniqueFeature(thisID);
};

/**
  * @desc function to get special feature by id
  *       show map and get unique feature by ID over url
  *       url using: /getFeatureById?id=
  * @return special feature or message error
  */
function getUniqueFeature(id) {
  var url = localhost + '/getFeatureById?id=' + id;
  //ajax.GET to get feature by id
  $.ajax({
      type: 'GET',
      url: url,
      timeout: 5000,
      success: function (content, textStatus) {
        var thisProject = content[0].name;
        var thisCreator = content[0].data.Creator;
        var thisCollaborators = content[0].data.Colaborators;
        var neu = content[0].data.Colaborators.replace("atzeichen","@");
        var neu1 = neu.replace("punkt",".");
        var neu2 = neu1.replace("minus","-");
        var neu3 = neu2.replace("punkt",".");
        var thisCollaborators = neu3.replace("unter","_");
        document.getElementById('CreatorInfo').innerHTML = "Creator: " + thisCreator;
        document.getElementById('CollaboratorInfo').innerHTML = "Collaborators: " + thisCollaborators;

        // create tree view
        makeTreeComponents(thisProject);
        createTree();
      },
      error: function (xhr, textStatus, errorThrown) {
          console.log("no success");
          return;
      }
  });
};

/**
  * @desc function to download project as zip
  *       url using: /getFeatureById?id=
  * @return zip download
  */
function downloadZipAsReader() {
  var thisURL = window.location.href;
  var thisID = thisURL.substring(36, thisURL.length);
  var thisProject;
  var url = localhost + '/getFeatureById?id=' + thisID;
  // ajax.GET to get project name by id
  $.ajax({
      type: 'GET',
      url: url,
      async: false,
      timeout: 5000,
      success: function (content, textStatus) {
        thisProject = content[0].name;  //project name of current project
      },
      error: function (xhr, textStatus, errorThrown) {
          console.log("no success");
          return;
      }
  });

  // download zip
  var r = confirm("Do you really want to download this project?");
  if (r == true) {
    var myZipProjectName;
    var currentProject = thisProject;
    var url = localhost + '/zipMyShit';
    //ajax.POST to call the zip function on server
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
    window.location = '../projects/' + myZipProjectName + '.zip'; // download zip by trying to get on page for auto-download
  } else {
    return;
  }
};
