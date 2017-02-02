var iframeName = "iframeMap";
var url = "temp.html";

// "iframeMap", "/temp.html"
//
// // load html into iframe
function loadIframe() {
  leafmap.remove();
  var objectURL = "../temp.html";
  document.getElementById("leafletmap").innerHTML = '<iframe id="iframeMap" src="' + objectURL + '" height="100%" width="100%" name"myIframe"></iframe>';
  console.log("iframe data");
  console.log($('#leafletmap').contents());
};

function readCSV() {
  $.get('../scriptsR/datasets.csv', function(data) {
  	var build = '<table border="1" cellpadding="2" cellspacing="0" style="border-collapse: collapse" width="100%">\n';
  	var rows = data.split("\n");
  	rows.forEach( function getvalues(thisRow) {
    	build += "<tr>\n";
    	var columns = thisRow.split(";");
    	for(var i=0;i<columns.length;i++){ build += "<td>" + columns[i] + "</td>\n"; }
    	build += "</tr>\n";
  	})
  	build += "</table>";
  	$('#wrap').append(build);
   });
}
