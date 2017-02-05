
/**
  * @desc define localhost as global var for better handling
  * if upload to server only change localhost
  */
//  TODO: if localhost
var localhost = 'http://localhost:3000';
var sliceString = 36; // http://localhost:3000/uniqueLink?id= --> 36 Zeichen

//  TODO: if server
// var localhost = 'http://10.6.4.6:80';
// var sliceString = 44; // giv-project1.uni-muenster.de/uniqueLink?id=  --> 44 Zeichen


function prependMyShit() {

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
        console.log('upload successful!');
        // delete file
        console.log(res);
        window.alert("everything is fine");
    },
  error: function (xhr, textStatus, errorThrown) {
      console.log("no success");
      // delete file
      console.log(res);
      window.alert("something went wrong");
  }
  });
};
