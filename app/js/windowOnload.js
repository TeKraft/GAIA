
window.onload = function() {
  showMapToRead();

  console.log("hi");
  console.log(window.location.href);

  var thisURL = window.location.href;
  var thisID = thisURL.substring(36, thisURL.length);
  console.log(thisID);

  getUniqueFeature(thisID);

// http://localhost:3000/uniqueLink?id=58935a428faeef640e46eb60 --> 36 Zeichen
// TODO: giv-project1.uni-muenster.de  --> 28 Zeichen

}

// if unique link --> get Feature
// function getUniqueFeature(id) {
function getUniqueFeature(id) {

  var url = localhost + '/getFeatureById?id=' + id;
  $.ajax({
      type: 'GET',
      url: url,
      // async: false,
      timeout: 5000,
      success: function (content, textStatus) {
        console.log(content);

        console.log("getUniqueFeature - content");
        console.log(content);
        console.log(content[0]._id);
        console.log(content[0].name);
        // readUniqueProject(content[0].name);
        var temp = content[0];
        console.log(temp);
        // tempProject = temp;
        // console.log("temp2");
        // console.log(temp);

        var thisProject = content[0].name;
        console.log('thisProject== ' + thisProject);

        var thisCreator = content[0].data.Creator;
        console.log('thisCreator== ' + thisCreator);

        var thisCollaborators = content[0].data.Collaborators;
        console.log('thisCollaborators== ' + thisCollaborators);

        // var userArray = document.cookie.split("=");
        // var userJSON = JSON.parse(userArray[1]);
        //
        // displayCreatorForInformation()
        document.getElementById('CreatorInfo').innerHTML = "Creator: " + thisCreator;
        // displayCollaboratorsForInformation();
        document.getElementById('CollaboratorInfo').innerHTML = "Collaborators: " + thisCollaborators;
        //
//projectEditing.js
        // makeTreeComponents(currentProject[3]);
        makeTreeComponents(thisProject);
        // createTree();
        createTree();

      },
      error: function (xhr, textStatus, errorThrown) {
          console.log("no success");
          return;
      }
  });
};

// function loader() {
//   window.alert("loader");
// }
//
// $(document).ready(function() {
//   console.log("ready");
// });
