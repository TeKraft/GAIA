/**
  * @desc returns the unique link to the workRead.html
*/
function getUniqueLink() {
  var currentProject = document.cookie.split("=")[3];
  var url = localhost + '/getFeatureByTitle?title=' + currentProject;

  $.ajax({
      type: 'GET',
      url: url,
      timeout: 5000,
      success: function (content, textStatus) {
        var id = content[0]._id;
        shareLink(id);
      },
      error: function (xhr, textStatus, errorThrown) {
          console.log("no success");
      }
  });
}

function shareLink(id) {
  var linkURL = localhost + '/uniqueLink?id=' + id;
  document.getElementById("uniqueLink").value = linkURL;
}

$(document).ready(function(){
    $("#getUniqueLink").click(function(){
        $("#uniqueLink").hide();
    
        $("#uniqueLink").show();
    });
});