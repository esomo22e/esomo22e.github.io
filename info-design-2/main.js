// TO MAKE THE MAP APPEAR YOU MUST
// ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com
mapboxgl.accessToken = 'pk.eyJ1IjoiZWVzb21vbnUiLCJhIjoiY2sxaHdjOTE2MGJ3bzNscGtyMXlrM2EzMCJ9.wUCwEKSpzHun34BWXIsgoA';
var map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/eesomonu/ckm4zoimo0mwz17mpq12lvjbd', // style URL
    center: [-71.0589, 42.3601], // starting position [lng, lat]
    zoom: 2// starting zoom
});

var url = "./data/features.geojson"

map.on('load', function () {
var request = new XMLHttpRequest();
window.setInterval(function () {
// make a GET request to parse the GeoJSON at the url
request.open('GET', url, true);
request.onload = function () {
if (this.status >= 200 && this.status < 400) {
// retrieve the JSON from the response
var json = JSON.parse(this.response);

// update the drone symbol's location on the map
map.getSource('drone').setData(json);

// fly the map to the drone's current location
// map.flyTo({
// center: json.geometry.coordinates,
// speed: 0.5
// });
}
};
request.send();
}, 2000);

map.addSource('drone', { type: 'geojson', data: url });
map.addLayer({
'id': 'drone',
'type': 'symbol',
'source': 'drone',
'layout': {
'icon-image': 'rocket-15'
}
});
});

// map.on('load', function() {
//     var request = new XMLHttpRequest();
//     window.setInterval(function() {
//         // make a GET request to parse the GeoJSON at the url
//         request.open('GET', url, true);
//         request.onload = function() {
//             if (this.status >= 200 && this.status < 400) {
//
//                 console.log(this.response);
//                 // retrieve the JSON from the response
//                 var json = JSON.parse(this.response);
//
//                 console.log(json);
//                 // update the drone symbol's location on the map
//                 map.getSource('drone').setData(json);
//
//                 // fly the map to the drone's current location
//                 // map.flyTo({
//                 //     center: json.geometry.coordinates,
//                 //     speed: 0.5
//                 // });
//             }
//         };
//         request.send();
//     }, 2000);
//
//     map.addSource('drone', {
//         type: 'geojson',
//         data: url
//     });
//     map.addLayer({
//         'id': 'drone',
//         'type': 'symbol',
//         'source': 'drone',
//         'layout': {
//             'icon-image': 'rocket-15'
//         }
//     });
// });
