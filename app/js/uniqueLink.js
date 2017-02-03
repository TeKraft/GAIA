//get unique link of feature
function getUniqueLink() {
  var currentProject = document.cookie.split("=")[3];
  var url = localhost + '/getFeatureByTitle?title=' + currentProject;

  console.log(url);
  $.ajax({
      type: 'GET',
      url: url,
      timeout: 5000,
      success: function (content, textStatus) {
        var id = content[0]._id;
        console.log(id);
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
