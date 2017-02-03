function loadTMS(){
  var path = document.getElementById("htmlPath").value;
  var tms = L.tileLayer('../projects/' +path + '/{z}/{x}/{y}.png', {
  tms: true
  });
  
  myLayerControl.addOverlay(tms, "tms");
}
