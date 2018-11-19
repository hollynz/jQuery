// Maps using Mapbox map designs or data supplied by Mapbox must display both the Mapbox wordmark and text attribution. 
// https://www.mapbox.com/help/how-attribution-works/


// // Map
// var mymap = L.map('mapid').setView([51.505, -0.09], 13);

// // Marker
// var marker = L.marker([51.5, -0.09]).addTo(mymap);
// var circle = L.circle([51.508, -0.11], {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.5,
//     radius: 500
// }).addTo(mymap);

// // Shape
// var polygon = L.polygon([
//     [51.509, -0.08],
//     [51.503, -0.06],
//     [51.51, -0.047]
// ]).addTo(mymap);

// // Popup as a layer (standalone)
// var popup = L.popup()
//     .setLatLng([51.5, -0.09])
//     .setContent("I am a standalone popup.")
//     .openOn(mymap); // handles automatic closing of a previously opened popup when opening a new one

// // L.tilelayer.addTo(map) part!!!

// marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup(); // openPopup is for markers only!!!
// circle.bindPopup("I am a circle.");
// polygon.bindPopup("I am a polygon.");

// // React to user interaction
// var popupOnClick = L.popup();

// function onMapClick(e) {
//     popupOnClick
//         .setLatLng(e.latlng)
//         .setContent("You clicked the map at " + e.latlng.toString())
//         .openOn(mymap);
// }

// mymap.on('click', onMapClick);



// Fullsize map with geolocation

var map = L.map('map').fitWorld();

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiaG9sbHlqbnoiLCJhIjoiY2pvbnBuc2ZhMWVkYzNqcGNvNnBjeDI2aiJ9.esIDISrS1QjPynfQs4sKKA'
}).addTo(map);

map.locate({setView: true, maxZoom: 16});

function onLocationFound(e) {
    var radius = e.accuracy / 2;

    L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

    L.circle(e.latlng, radius).addTo(map);
}

map.on('locationfound', onLocationFound);

function onLocationError(e) {
    alert(e.message);
}

map.on('locationerror', onLocationError);