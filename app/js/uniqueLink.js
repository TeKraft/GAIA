
//get unique link of feature
function getUniqueLink() {
  var currentProject = document.cookie.split("=")[3];
  var url = localhost + '/getFeatureID?title=' + currentProject;

  console.log(url);
  $.ajax({
      type: 'GET',
      url: url,
      timeout: 5000,
      success: function (content, textStatus) {
        var id = content[0]._id;
        console.log(id);
        getUniqueFeature(id);
      },
      error: function (xhr, textStatus, errorThrown) {
          console.log("no success");
      }
  });
}
// if unique link --> get Feature
function getUniqueFeature(id) {
  var url = localhost + '/uniqueLink?id=' + id;
  $.ajax({
      type: 'GET',
      url: url,
      timeout: 5000,
      success: function (content, textStatus) {
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


        // var stringified = JSON.stringify(content);
        // setTimeout(function(stringified){
        //   window.location.href = ("workRead.html");
        //
        //   setTimeout(function(stringified){console.log(JSON.parse(stringified));}, 2000);
        // }, 1000);
      },
      error: function (xhr, textStatus, errorThrown) {
          console.log("no success");
      }
  });
};



// function readUniqueProject(name) {
//   getProjectByName(name);
//   console.log(temp);
//   // var aktuellesProject;
//   // // die id von dem gedrueckten button also der projektname wird dem cookie hinzugefuegt
//   // // mit dem benutzer der eingeloggt ist und dem projektnamen wird das projekt identifiziert
//   // // ein benutzer kann also nicht mehrere projekte mit selben namen haben.
//   // aktuellesProject=id;
//   // console.log(aktuellesProject);
//   // // erst checken ob schon ein projekt ausgewaehlt ist
//   // if(!isEditing()){
//   //     document.cookie = document.cookie + "=CurrentProject=" + aktuellesProject+ "=";
//   //     window.location.href = "workRead.html";
//   // }else{
//   //     var temp=document.cookie.split("=");
//   //     temp[3] = aktuellesProject;
//   //     var tempCookie = "" + temp[0]+ "=" + temp[1] + "=" + temp[2] + "=" + temp[3];
//   //     document.cookie = tempCookie;
//   //     console.log(document.cookie);
//   //     window.location.href = "workRead.html";
//   // }
// }
