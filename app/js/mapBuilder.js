"use strict";

var leafmap;
var customPopup;
var drawnItems;
var drawControlFull;
var myLayerControl;
/**
 * Function creates map containing base layer.
 * Includes layer control function, which enables user to switch between layers.
 * @param event OpenFile event
 * @param id onClick event, param used to identify JSON data element by equal ID
 *
 */
var leaflet = function () {
    // Settings for map
    leafmap = L.map('leafletmap').setView([51.96, 7.61], 13); //münster

    // adding OpenStreetMaps base map
    var osmLayer = new L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    });
    osmLayer.addTo(leafmap);

    // creating a second base map
    var osmLayer2 = new L.tileLayer('http://a.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    });
    // creating variable to store base maps in as object array
    var baseMaps = {
        "osm_color": osmLayer,
        "osm_grey": osmLayer2
    };
    var overlayMaps = {};
    // layer control function
    myLayerControl = L.control.layers(baseMaps, overlayMaps).setPosition('topright').addTo(leafmap);
}; //leaflet() end

/**
 * @desc Method to draw rectangle on map
 *
 */
function drawMap() {
    // Initialise the FeatureGroup to store editable layers
    drawnItems = new L.FeatureGroup();
    leafmap.addLayer(drawnItems);

    // Set the button title text for the rectangle button
    L.drawLocal.draw.handlers.rectangle.tooltip.start = 'Draw for analyzing!';

    // create control to draw rectangle
    drawControlFull = new L.Control.Draw({
        edit: false,
        position: 'topleft',
        draw: {
            polyline: false,
            polygon: false,
            rectangle: {
                title: 'new bbox',
                shapeOptions: {
                    color: 'purple',
                    clickable: true
                },
                repeatMode: false
            },
            circle: false,
            marker: false
        }
    });
    // add control with draw abled
    leafmap.addControl(drawControlFull);

    // specify popup options
    var rectangleOptions = {
        'maxWidth': '500',
        'className': 'custom'
    };

    // for creating
    leafmap.on("draw:created", function (e) {
        drawnItems.clearLayers();

        var type = e.layerType,
            layer = e.layer;
        // get marker options
        customPopup = "new coordinates choosen";
        if (type === 'rectangle') {
            layer.bindPopup(customPopup, rectangleOptions);
        }

        var xmin = layer._latlngs[0].lat;
        var xmax = layer._latlngs[2].lat;
        var ymin = layer._latlngs[0].lng;
        var ymax = layer._latlngs[2].lng;
        var bounds = L.latLngBounds(layer._latlngs[2], layer._latlngs[0]);

        var bbox = "bbox1 = extent(" + xmin + "," + xmax + "," + ymin + "," + ymax + ")\ndata.subarea = crop(x = ..., bbox1) # please add the dataset here";
        document.getElementById("bbox").innerHTML = bbox;;
        layer.addTo(drawnItems);

    });
}; //drawMap() end