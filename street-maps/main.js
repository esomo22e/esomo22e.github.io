mapboxgl.accessToken = 'pk.eyJ1IjoiZWVzb21vbnUiLCJhIjoiY2sxaHdjOTE2MGJ3bzNscGtyMXlrM2EzMCJ9.wUCwEKSpzHun34BWXIsgoA';

const map = new mapboxgl.Map({
container: 'map', // container ID
// style: 'mapbox://styles/eesomonu/ckwln7njj0fjm14phobpmkhg8', // style URL
style: 'mapbox://styles/mapbox/light-v10',
center: [-71.0914, 42.3152],
zoom: 12.75
// , // starting position [lng, lat]
// minZoom: 10, // note the camel-case
//     maxZoom: 14
});

map.on('load', () => {


//Get segment of the regular streets
  map.addSource('street-data', {
  type: 'geojson',
  // Use a URL for the value for the `data` property.
  data: './data/Boston_Street_Segments.geojson'
  });

  map.addLayer({
'id': 'streets',
'type': 'line',
'source': 'street-data',
'layout': {
'line-join': 'round',
'line-cap': 'round'
},
'paint': {
'line-color': '#888',
'line-width': 2,
'line-opacity': 0.4
}
});

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
data: './data/map_marker2.geojson'
});


map.addLayer({
'id': 'earthquakes-layer',
'type': 'circle',
'source': 'walk-markers',
'paint': {
'circle-radius': 7,
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
// }
// });
//
// map.addLayer({
// 'id': 'circle-walking2',
// 'type': 'circle',
// 'source': 'walking-data',
// 'paint': {
// 'circle-radius': 10,
// 'circle-stroke-width': 2,
// 'circle-color': 'purple',
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

 console.log("hello this is clicked")
 console.log(e.features[0].properties.name)

 // if(coordinates){
 //   map.getCanvas().style.cursor = 'pointer'
 //
 // }
 createDiv(e.features[0].properties.name, e.features[0].properties.name);


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
  document.querySelector(".popup-content").style.display = "none";
  document.querySelector(".element-title").style.display = "none";
  document.querySelector(".image-slider").style.display = "none";

  // var h = document.removeElement("H2"); // Create the H1 element
  // var t = document.removeTextNode("Your H2 text"); // Create a text element
  // h .removeChild(t); // Append the text node to the H1 element

  document.querySelector(".popup-content").removeChild(h); // Append the H1 element to the document body

}
