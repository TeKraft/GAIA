
function executeScript(){
    var url = 'http://localhost:3000' + '/execScript';

    $.ajax({
        type: 'GET',
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
function importHTML() {
  leafmap.remove();

  var objectURL = "../TMS/S2_NIR_T0/leaflet.html";
  document.getElementById("menu1").innerHTML ='<object type="text/html" data="' + objectURL + '" ></object>';
  document.getElementById("leafletmap").innerHTML ='<object type="text/html" height="100%" width="100%" data="' + objectURL + '" ></object>';
  console.log("object");
  console.log(document.getElementById("leafletmap"));
}

// entweder importHTML oder createiframe --- nicht beide nötig!
function createiframe() {
  leafmap.remove();

  var objectURL = "../TMS/S2_NIR_T0/leaflet.html";
  document.getElementById("leafletmap").innerHTML = '<iframe id="iframeMap" src="' + objectURL + '" height="100%" width="100%" name"myIframe"></iframe>';
  console.log("iframe data");
  console.log($('#leafletmap').contents());
}
