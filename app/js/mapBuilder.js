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
var leaflet = function (event) {
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

  drawMap();

}; //leaflet() end
