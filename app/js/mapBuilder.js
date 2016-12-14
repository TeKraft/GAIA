/**
 * created starting 14-11-2016.
 */

"use strict";

/**
 * @desc Geosoftware II - WiSe 2016/2017
 * @author Torben Kraft
 *
 * .js: create leflet map
 *
 */

var leafmap;
var myLayerControl;



/**
 * Function creates map containing base layer.
 * Includes layer control function, which enables user to switch between layers.
 * @param event OpenFile event
 * @param id onClick event, param used to identify JSON data element by equal ID
 *
 */
var leaflet = function () {
  console.log("leaflet() starting");

	// Settings for map
	leafmap = L.map('leafletmap').setView([51.96, 7.61], 13);	//münster

	// adding OpenStreetMaps base map
	var osmLayer = new L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	});
	osmLayer.addTo(leafmap);

	// creating a second base map
	var osmLayer2 = new L.tileLayer ('http://a.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	});

	// creating variable to store base maps in as object array
	var baseMaps = {
		"osm_color" : osmLayer,
		"osm_grey" : osmLayer2
	};
	var overlayMaps = {};

	// layer control function
	myLayerControl = L.control.layers(baseMaps, overlayMaps).setPosition('topright').addTo(leafmap);

  

}; //leaflet() end


var customPopup;
var rectangleOptions;
var drawnItems;
var drawControlFull;
var drawControlEditOnly;

var latlon;

/**
 * @desc Method to draw rectangle on map
 *
 */
var drawMap = function () {
	// JL("function: ").info("drawMap");

	// Initialise the FeatureGroup to store editable layers
	drawnItems = new L.FeatureGroup();
	leafmap.addLayer(drawnItems);

	// Set the button title text for the rectangle button
	L.drawLocal.draw.handlers.rectangle.tooltip.start = 'Draw for analyzing!';

	// create control to draw rectangle
	drawControlFull = new L.Control.Draw({
		// edit: {
		// 	featureGroup: drawnItems
		// },
			edit: false,
		position: 'topleft',
		draw: {
			polyline: false,
			polygon: false,
			rectangle: {
				title: 'new rectangle',
				// allowIntersection: false,
				// drawError: {
				// 	color: 'orange',
				// 	timeout: 1000
				// },
				shapeOptions: {
					color: 'purple',
					clickable: true
				},

				// showArea: true,
				repeatMode: false
			},
			circle: false,
			marker: false
		}
	});

	// create control where draw is disabled
	drawControlEditOnly = new L.Control.Draw({
		edit: {
			featureGroup: drawnItems
		},
		position: 'topleft',
		draw: false
	});

	// add control with draw abled
	leafmap.addControl(drawControlFull);

	// specify popup options
	rectangleOptions =
		{
		'maxWidth': '500',
		'className' : 'custom'
	};


	// for creating
	leafmap.on("draw:created", function (e) {
		drawnItems.clearLayers();
		// clearAllFields(rectangleview);

		// // check if rectangle has been drawn before
		// if (rectangleOnLoad !== undefined) {
		// 	leafmap.removeLayer(rectangleOnLoad);
		// }
		var type = e.layerType,
			layer = e.layer;
		// get marker options
		customPopup = "new rectangle created";
		if (type === 'rectangle') {
			layer.bindPopup(customPopup, rectangleOptions);
		}
		console.log(drawnItems);
		console.log(drawnItems._layers);
		console.log("create");
		console.log(layer._latlngs);
		layer.addTo(drawnItems);

		// // manipulate rectangle-value for editing / saving new rectangle
		// manipulaterectangle(drawnItems);

		// after draw set draw control to disabled
		drawControlFull.removeFrom(leafmap);
		drawControlEditOnly.addTo(leafmap)
	});


	// if rectangle has been deleted
	leafmap.on("draw:deleted", function(e) {
		drawControlEditOnly.removeFrom(leafmap);
		// clearAllFields(rectangleview);
		// if (rectangleOnLoad !== undefined) {
		// 	document.getElementById('rectangle-view').value = thisrectangle;
		// 	leafmap.addLayer(rectangleOnLoad);
		// }
		console.log("delete");
		drawControlFull.addTo(leafmap);
	});

	// // if rectangle has been edited
	// leafmap.on("draw:edited", function(e) {
	//
	// 	var layers = e.layers;		// rectangle before editing
	// 	var layer = e.layer;
	// 	console.log("layers");
	// 	console.log(layers);			// rectangle before editing
	// 	console.log("layer");
	// 	console.log(layer);				// = undefined
	// 	//
	// 	// 	// get marker options
	// 	// 	customPopup = "new rectangle created";
	// 	// 	if (type === 'rectangle') {
	// 	// 		layer.bindPopup(customPopup, rectangleOptions);
	// 	// 	};
	//
	// 	console.log("edit");
	// 	console.log(drawnItems);
	//
	// 	console.log(layers._latlngs);
	//
	// 	// latlng = drawnItems;
	//
	// 	// console.log(layer._latlngs);
	// });

}; //drawMap() end


	leaflet();
	drawMap();

