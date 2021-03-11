// TO MAKE THE MAP APPEAR YOU MUST
// ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com
mapboxgl.accessToken = 'pk.eyJ1IjoiZWVzb21vbnUiLCJhIjoiY2sxaHdjOTE2MGJ3bzNscGtyMXlrM2EzMCJ9.wUCwEKSpzHun34BWXIsgoA';
var map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/eesomonu/ckm4zoimo0mwz17mpq12lvjbd', // style URL
    center: [-71.0589, 42.3601], // starting position [lng, lat]
    zoom: 11 // starting zoom
});
