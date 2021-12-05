mapboxgl.accessToken = 'pk.eyJ1IjoiZWVzb21vbnUiLCJhIjoiY2sxaHdjOTE2MGJ3bzNscGtyMXlrM2EzMCJ9.wUCwEKSpzHun34BWXIsgoA';

const map = new mapboxgl.Map({
container: 'map', // container ID
// style: 'mapbox://styles/eesomonu/ckwln7njj0fjm14phobpmkhg8', // style URL
style: 'mapbox://styles/mapbox/light-v10',
center: [-71.0892, 42.3398], // starting position [lng, lat]
minZoom: 12, // note the camel-case
    maxZoom: 14
});

map.on('load', () => {

//   map.addSource('earthquakes', {
// type: 'geojson',
// // Use a URL for the value for the `data` property.
// data: {
// 'type': 'Feature',
// 'geometry': {
// 'type': 'Polygon',
// // These coordinates outline Maine.
// 'coordinates': [
// [
// [-71.1151, 42.3097],
// [-71.0765, 42.3388],
// [-71.0892, 42.3398]
// ]
// ]
// }
// }
// });
//
// map.addLayer({
// 'id': 'earthquakes-layer',
// 'type': 'circle',
// 'source': 'earthquakes',
// 'paint': {
// 'circle-radius': 20,
// 'circle-stroke-width': 2,
// 'circle-color': 'red',
// 'circle-opacity': 0.5,
// 'circle-stroke-color': 'white'
// }
// });

// When a click event occurs on a feature in the places layer, open a popup at the
// location of the feature, with description HTML from its properties.
map.on('click', 'earthquakes-layer', (e) => {
// Copy coordinates array.
const coordinates = e.features[0].geometry.coordinates.slice();
// const description = e.features[0].properties.description;

 console.log(coordinates)
// Ensure that if the map is zoomed out such that multiple
// copies of the feature are visible, the popup appears
// // over the copy being pointed to.
// while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
// coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
// }
//
// new mapboxgl.Popup()
// .setLngLat(coordinates)
// .setHTML(description)
// .addTo(map);
});
//
// map.addSource('mapbox-terrain', {
// type: 'vector',
// // Use any Mapbox-hosted tileset using its tileset id.
// // Learn more about where to find a tileset id:
// // https://docs.mapbox.com/help/glossary/tileset-id/
// url: 'mapbox://mapbox.mapbox-terrain-v2'
// });
// map.addLayer({
// 'id': 'terrain-data',
// 'type': 'line',
// 'source': 'mapbox-terrain',
// 'source-layer': 'contour',
// 'layout': {
// 'line-join': 'round',
// 'line-cap': 'round'
// },
// 'paint': {
// 'line-color': '#ff69b4',
// 'line-width': 1
// }
// });
});
