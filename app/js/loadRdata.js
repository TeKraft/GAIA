var iframeName = "iframeMap";
var url = "temp.html";


// <div id="iframe">
//   <iframe id="iframeMap" src="/index.html" heigt="100%" width="100%" name"myIframe">
//   </iframe>
// </div>


// "iframeMap", "/temp.html"
//
// // load html into iframe
function loadIframe() {

  var objectURL = "temp.html";
  document.getElementById("leafletmap").innerHTML = '<iframe id="iframeMap" src="' + objectURL + '" height="100%" width="100%" name"myIframe"></iframe>';
  console.log("iframe data");
  console.log($('#leafletmap').contents());


  // console.log(iframeName);
  // console.log(url);
  //
  // var $iframe = $('#' + iframeName);
  //  if ( $iframe.length ) {
  //      $iframe.attr('src',url);
  //      console.log("false");
  //     //  return false;
  //  }
  //  console.log("true");
  // //  return true;
};
