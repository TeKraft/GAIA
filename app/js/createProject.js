


function createFolder() {
  // var projectTitle = "halloNochEinBier";
  if (document.getElementById("projectName").value == "") {
    console.log("value empty");
  }  else {
    var projectTitle = document.getElementById("projectName").value;
    console.log("createFolder("+projectTitle+")")
    // addFolder(projectTitle);

    var url = 'http://localhost:3000' + '/addFolder?name=' + projectTitle;
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
  }
};

function deleteProjectFolder() {
  if (document.getElementById("deleteProjectFolder").value == "") {
    console.log("value empty");
  }  else {

    var folderTitle = document.getElementById("deleteProjectFolder").value;
    console.log("deleteProjectFolder("+folderTitle+")");

    var url = 'http://localhost:3000' + '/deleteProjectFolder?name=' + folderTitle;
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
  }
};

function readProjectFolder() {
  if (document.getElementById("readProjectFolder").value == "") {
    console.log("value empty");
  }  else {

    var folderRead = "wurstbrot";
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
  }
};


//kann vlt weg
function readProject(name) {

    var folderRead = name;
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
