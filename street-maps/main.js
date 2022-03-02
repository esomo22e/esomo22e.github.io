mapboxgl.accessToken = 'pk.eyJ1IjoiZWVzb21vbnUiLCJhIjoiY2sxaHdjOTE2MGJ3bzNscGtyMXlrM2EzMCJ9.wUCwEKSpzHun34BWXIsgoA';

const map = new mapboxgl.Map({
container: 'map', // container ID
// style: 'mapbox://styles/eesomonu/ckwln7njj0fjm14phobpmkhg8', // style URL
style: 'mapbox://styles/mapbox/light-v10',
<<<<<<< HEAD
center: [-71.0892, 42.3398], // starting position [lng, lat]
minZoom: 12, // note the camel-case
    maxZoom: 14
=======
center: [-71.0964, 42.3352],
zoom: 12.75
// , // starting position [lng, lat]
// minZoom: 10, // note the camel-case
//     maxZoom: 14
>>>>>>> 827505fd3a590ccada95311631aef136ceb7778e
});

map.on('load', () => {

<<<<<<< HEAD
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
=======

// //Get segment of the regular streets
//   map.addSource('street-data', {
//   type: 'geojson',
//   // Use a URL for the value for the `data` property.
//   data: './data/Boston_Street_Segments.geojson'
//   });
//
//   map.addLayer({
// 'id': 'streets',
// 'type': 'line',
// 'source': 'street-data',
// 'layout': {
// 'line-join': 'round',
// 'line-cap': 'round'
// },
// 'paint': {
// 'line-color': '#888',
// 'line-width': 2,
// 'line-opacity': 0.4
// }
// });

// Get the segments that I walked around in Back Bay with circles
map.addSource('walk-data-backBay', {
type: 'geojson',
// Use a URL for the value for the `data` property.
data: './data/test.geojson'
});


  map.addLayer({
'id': 'route',
'type': 'line',
'source': 'walk-data-backBay',
'layout': {
'line-join': 'round',
'line-cap': 'round'
},
'paint': {
'line-color': 'magenta',
'line-width': 4
}
});

map.addSource('walk-markers', {
type: 'geojson',
// Use a URL for the value for the `data` property.
data: './data/map_marker_photo3.geojson'
});


map.addLayer({
'id': 'earthquakes-layer',
'type': 'circle',
'source': 'walk-markers',
'paint': {
'circle-radius': 10,
'circle-stroke-width': 2,
'circle-color': 'purple',
'circle-opacity': 0.5,
'circle-stroke-color': 'white'
}
});

//
// // Get the segments that I walked around generally
// map.addSource('walking-data', {
// type: 'geojson',
// // Use a URL for the value for the `data` property.
// data: './data/walking_maps.geojson'
// });
//
// map.addLayer({
// 'id': 'route_walking',
// 'type': 'line',
// 'source': 'walking-data',
// 'layout': {
// 'line-join': 'round',
// 'line-cap': 'round'
// },
// 'paint': {
// 'line-color': 'magenta',
// 'line-width': 4
>>>>>>> 827505fd3a590ccada95311631aef136ceb7778e
// }
// });
//
// map.addLayer({
<<<<<<< HEAD
// 'id': 'earthquakes-layer',
// 'type': 'circle',
// 'source': 'earthquakes',
// 'paint': {
// 'circle-radius': 20,
// 'circle-stroke-width': 2,
// 'circle-color': 'red',
=======
// 'id': 'circle-walking2',
// 'type': 'circle',
// 'source': 'walking-data',
// 'paint': {
// 'circle-radius': 10,
// 'circle-stroke-width': 2,
// 'circle-color': 'purple',
>>>>>>> 827505fd3a590ccada95311631aef136ceb7778e
// 'circle-opacity': 0.5,
// 'circle-stroke-color': 'white'
// }
// });

// When a click event occurs on a feature in the places layer, open a popup at the
// location of the feature, with description HTML from its properties.
map.on('click', 'earthquakes-layer', (e) => {
// Copy coordinates array.
<<<<<<< HEAD
const coordinates = e.features[0].geometry.coordinates.slice();
// const description = e.features[0].properties.description;

 console.log(coordinates)
// Ensure that if the map is zoomed out such that multiple
=======
console.log(e.features[0].properties)
const coordinates = e.features[0].geometry.coordinates.slice();
// const description = e.features[0].properties.description;

 console.log("hello this is clicked")
 console.log(e.features[0].properties.name)

 // if(coordinates){
 //   map.getCanvas().style.cursor = 'pointer'
 //
 // }

 console.log(e.features[0].properties.title);
 // if(e.features[0].properties.name === "new_england_conservatory"){
 //
 // }
 createDiv(e.features[0].properties.title, e.features[0].properties.name);

 // else if(e.features[0].properties.name === "120_jersey_street"){
 //   createDiv("120 Jersey Street", e.features[0].properties.name);
 //
 // }

 // "geometry": {
 //     "coordinates": [
 //         -71.0828785,
 //         42.3431192
 //     ],
 //     "type": "Point"
 // },
 // "properties": {
 //     "description": "177_st_botolph",
 //     "name": "177_st_botolph",
 //     "title": "New England Conservatory"
 //
 // },
 // "type": "Feature"
>>>>>>> 827505fd3a590ccada95311631aef136ceb7778e
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
<<<<<<< HEAD
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
=======

});
//

// });
});
var divTitle;
var t;
function createDiv(text, imgBefore) {

document.querySelector(".popup-content").style.display = "block";

document.querySelector(".element-title").innerHTML = text;
document.querySelector(".image-slider").style.display = "block";

document.querySelector(".img_after").src = "./images/after_images/" + imgBefore +"_after.jpg";
document.querySelector(".img_before").src = "./images/before_images/" + imgBefore+".jpg";
document.querySelector(".intro-container").style.display = "none";


//  divTitle = document.createElement("div"); // Create the H1 element
//  divTitle.className = 'active-element'
// t = document.createTextNode(text); // Create a text element
// divTitle.appendChild(t); // Append the text node to the H1 element
//
// document.querySelector(".popup-content").appendChild(divTitle); // Append the H1 element to the document body
  // let div = document.createElement('div');
  // div.innerText = document.getElementById('getText').innerText;
  // document.body.appendChild(div);
}// Ensure that if the map is zoomed out such that multiple
function removeElement() {
    document.querySelector(".intro-container").style.display = "block";

  document.querySelector(".popup-content").style.display = "none";
  document.querySelector(".element-title").style.display = "none";
  document.querySelector(".image-slider").style.display = "none";

  // var h = document.removeElement("H2"); // Create the H1 element
  // var t = document.removeTextNode("Your H2 text"); // Create a text element
  // h .removeChild(t); // Append the text node to the H1 element

  // document.querySelector(".popup-content").removeChild(h); // Append the H1 element to the document body

}
>>>>>>> 827505fd3a590ccada95311631aef136ceb7778e
