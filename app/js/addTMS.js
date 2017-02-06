/**
 * @desc Loads local TMS from path, given from the input field located in the work.html
 */
function loadTMS() {
    //Path that user choose for the TMS
    var path = document.getElementById("htmlPath").value;
    var tms = L.tileLayer('../projects/' + path + '/{z}/{x}/{y}.png', {
        tms: true
    });
    //Add overlay named "tms" to the leaflet Layercontrol.
    //Multiple overlays possible
    myLayerControl.addOverlay(tms, "Overlay");
}