// Add console.log to check to see if our code is working.
console.log("working");

// Create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create the satellite view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create the map object with a center and zoom level.
let map = L.map('mapid',{
    center: [40.7306, -73.9352],
    zoom: 11,
    layers: [streets]
});

// Create a base layer that holds both maps.
let baseMaps = {
    "Streets": streets,
    "Satellite": satelliteStreets,
    "Dark": dark
};

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the NY City from GeoJSON URL.
let NYCdata = "https://raw.githubusercontent.com/VershaR1791/Group8_Project/Versha/address.json"

let NYCBoroughBoundary = "https://raw.githubusercontent.com/VershaR1791/Group8_Project/Versha/NYC_Borough_Boundary.json"

// Connecting NYC Address + SalesPrice JSON to map
d3.json(NYCdata).then(function(data){
  console.log(data);
// Creating a GeoJSON layer with the retrieved data.
L.geoJson(data, {
  // We create a popup for each circleMarker to display the Sale Price and Address of the property
     //  after the marker has been created and styled.
     onEachFeature: function(feature, layer) {
      layer.bindPopup("<h3>ADDRESS : </h3>" + feature.properties.Address + "<br><h3>NEIGHBORHOOD : </h3> " + feature.properties.Neighborhood + 
      "<br><h3>ZIP CODE : </h3>" + feature.properties.Zip_Code + "<br><h3>PROPERTY TYPE : </h3>" + feature.properties.Class_Bins + 
      "<br><h3>GROSS SQUARE FEET : </h3>" + feature.properties.Gross_Square_Feet + "<br><h3>AVG. SALE PRICE (USD) : </h3>" + feature.properties.Sale_Price);
    }
  }).addTo(map);

// Conencting NYC Borough Boundary JSON to map
d3.json(NYCBoroughBoundary).then(function(data){
  console.log(data);
  L.geoJson(data).addTo(map);
  });
});