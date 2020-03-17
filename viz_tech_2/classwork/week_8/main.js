var width = window.innerWidth;
var height = window.innerHeight;

var svg = d3.select("#viz")
            .attr("width", width)
            .attr("height", height);

  svg.select("#ocean")
    .attr("width", width)
    .attr("height", height);

var map = svg.select("#map");

var zoom = d3.zoom()
            .translateExtent([[0,0],
              [width, height]
            ])
            .scaleExtent([1,8])
            .on("zoom", zoomed);

function zoomed(){
  map.attr("transform", d3.event.transform);
}

svg.call(zoom)
    .on("dblclick.zoom", null);

d3.json("http://www.dave-landry.com/classes/artg5430-spring2020/topojson/world-alpha3.json", function(error, world){
  // console.log(world);

  var geoJSON = topojson.feature(world, world.objects.countries);

//proj = projection
  // var proj = d3.geoChamberlinAfrica()
  var proj = d3.geoMercator()
  .fitSize([width, height], geoJSON);


geoJSON.features = geoJSON.features.filter(function(d){
  return d.id !== "ATA";

});

  var path = d3.geoPath()
               .projection(proj);

  var countries = map.selectAll("path")
                    .data(geoJSON.features);

  countries.enter().append("path")
          .attr("d", path)
          .attr("fill", "lavender")
          .attr("stroke", "purple");

          var points = [
            {"name": "Boston", "coords": [-71.0589, 42.3601]},
            {"name": "London", "coords": [-0.1278, 51.5074]}
          ];

  var circ_points = map.selectAll("circle")
                  .data(points);

  circ_points.enter().append("circle")
              .attr("transform", function(d){
                return "translate(" + proj(d.coords) + ")";
              })
              .attr("r", 10)
              .attr("fill", "aquamarine")
              .attr("stroke", "blue");
  // geoJSON.features = geoJSON.features.filter(function(d){
  //   return d.id !== "ATA";
  //
  // });



});
