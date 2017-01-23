


function createFolder() {
  // var projectTitle = "halloNochEinBier";

  var projectTitle = document.getElementById("projectName").value;

  console.log("createFolder("+projectTitle+")")
  // addFolder(projectTitle);

  var url = 'http://localhost:3000' + '/addFolder?name=' + projectTitle;
  // var content = "hi";
  // perform post ajax
  $.ajax({
      type: 'POST',
      // data: content,
      url: url,
      timeout: 5000,
      success: function (data, textStatus) {
          // console.log(data);
          console.log("success");
          // window.location.href = "/home.html";
      },
      error: function (xhr, textStatus, errorThrown) {
          console.log("error by creating folder");
      }
  });


};
