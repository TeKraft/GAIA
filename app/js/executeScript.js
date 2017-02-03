var localhost = 'http://localhost:3000';

function executeScript(){
    var script = aktScript;
    var url = 'http://localhost:3000' + '/execScript';
    var currentProject = document.cookie.split("=")[3];
    $.ajax({
        type: 'POST',
        data: {project: ""+currentProject+"", script: ""+script+""},
        url: url,
        success: function (content, textStatus) {}
    });
  };


function getMap() {
  document.getElementById("leafletmap").innerHTML = "";
  $("#leafletmap").fadeIn(1000);
  leaflet();
}

// entweder importHTML oder createiframe --- nicht beide nötig!
function createiframe() {
  leafmap.remove();
  var html = document.getElementById("htmlPath");
  var objectURL = "../projects/" + html.value;
  document.getElementById("leafletmap").innerHTML = '<iframe id="iframeMap" src="' + objectURL + '" height="100%" width="100%" name"myIframe"></iframe>';
  console.log("iframe data");
  console.log($('#leafletmap').contents());
}

// get csv data - datasets.csv has data about sciDB datasets
function getCSV() {
  console.log("getCSV()");

  var url = localhost + '/getsciDBdata';
  $.ajax({
    type: 'GET',
    url: url,
    success: function (content, textStatus) {
      console.log("success getCSV()");
    }
  });
};
