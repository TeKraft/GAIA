


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

function deleteProjectFolder() {
  var folderTitle = document.getElementById("deleteProjectFolder").value;
  console.log("deleteProjectFolder("+folderTitle+")");

  var url = 'http://localhost:3000' + '/deleteProjectFolder?name=' + folderTitle;
  // var content = "hi";
  // perform post ajax
  $.ajax({
      type: 'POST',
      // data: content,
      url: url,
      timeout: 5000,
      success: function (data, textStatus) {
          // console.log(data);
          console.log("delete Folder success");
          // window.location.href = "/home.html";
      },
      error: function (xhr, textStatus, errorThrown) {
          console.log("error by deleting folder");
      }
  });
};

function readProjectFolder() {
  var folderRead = document.getElementById("readProjectFolder").value;
  console.log("readProjectFolder("+folderRead+")");

  var url = 'http://localhost:3000' + '/readFolder?name=' + folderRead;
  // perform post ajax
  $.ajax({
      type: 'GET',
      url: url,
      timeout: 5000,
      success: function (content, textStatus) {
          console.log(content);
          console.log("content");
      },
      error: function (xhr, textStatus, errorThrown) {
          console.log("no success");
      }
  });
};
