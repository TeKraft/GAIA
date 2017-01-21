var iframeName = "iframeMap";
var url = "temp.html";

// "iframeMap", "/temp.html"
//
// // load html into iframe
function loadIframe() {
  var objectURL = "temp.html";
  document.getElementById("leafletmap").innerHTML = '<iframe id="iframeMap" src="' + objectURL + '" height="100%" width="100%" name"myIframe"></iframe>';
  console.log("iframe data");
  console.log($('#leafletmap').contents());
};
