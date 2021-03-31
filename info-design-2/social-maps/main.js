// TO MAKE THE MAP APPEAR YOU MUST
// ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com
mapboxgl.accessToken = 'pk.eyJ1IjoiZWVzb21vbnUiLCJhIjoiY2sxaHdjOTE2MGJ3bzNscGtyMXlrM2EzMCJ9.wUCwEKSpzHun34BWXIsgoA';

var url = "./data/features.geojson"

var map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/eesomonu/ckm4zoimo0mwz17mpq12lvjbd', // style URL
    center: [-95.7129, 37.0902], // starting position [lng, lat]
    // center: [-71.0589, 42.3601], // starting position [lng, lat]
    zoom: 3 // starting zoom
});


console.log(url);


map.on('load', function() {

    map.loadImage(
    './images/giving.png',
    function (error, image) {
    if (error) throw error;
    map.addImage('cat', image);

    map.addSource('sample', {
        type: 'geojson',
        data: url
    });

    // add markers to map

    // map.addLayer({
    // 'id': 'drone',
    // 'type': 'symbol',
    // 'source': 'sample',
    // 'layout': {
    // 'icon-image': 'circle-15'
    // }
    // });

    map.addLayer({
        'id': 'tweet',
        "type": "symbol",
        // "type": "circle",
        'source': 'sample',
        // "paint": {
        //     "circle-radius": 5,
        //     "circle-color": "red"
        // }
        'layout': {
            'icon-image': 'cat',
            'icon-size': 0.025
        },
    });

    // When a click event occurs on a feature in the places layer, open a popup at the
    // location of the feature, with description HTML from its properties.
    map.on('click', 'tweet', function(e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.text;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map);
    });

    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'tweet', function() {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'tweet', function() {
        map.getCanvas().style.cursor = '';
    });
}
);
});

// map.on('load', function () {
// map.loadImage(
// 'https://upload.wikimedia.org/wikipedia/commons/7/7c/201408_cat.png',
// function (error, image) {
// if (error) throw error;
// map.addImage('cat', image);
// map.addSource('point', {
// 'type': 'geojson',
// 'data': {
// 'type': 'FeatureCollection',
// 'features': [
// {
// 'type': 'Feature',
// 'geometry': {
// 'type': 'Point',
// 'coordinates': [0, 0]
// }
// }
// ]
// }
// });
// map.addLayer({
// 'id': 'points',
// 'type': 'symbol',
// 'source': 'point',
// 'layout': {
// 'icon-image': 'cat',
// 'icon-size': 0.25
// }
// });
// }
// );
// });
