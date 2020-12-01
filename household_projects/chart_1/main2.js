var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = d3.select("#chart2").node().getBoundingClientRect().width - margin.left - margin.right,
    height = d3.select("#chart2").node().getBoundingClientRect().height - margin.top - margin.bottom;



var svg = d3.select("#chart2").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    // .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var color = d3.scaleOrdinal()
      // .domain([3301,3302,3303,3304,3305])
      .range([ "#69b3a2", "#FFA07A", "#beaed4", "#e7298a", "#386cb0"])

      // A scale that gives a X target position for each group
var x = d3.scaleOrdinal()
  // .domain([1, 2, 3])
  .range([0, 300, 640, 900, 1200])

d3.json("./data/aggregation_query.json", function(error, data) {
  console.log(data);

  var node = svg.append("g")
  .selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
    .attr("r",function(d){
        d["coupleCount"]
      return  d["childrenCount"] + d["coupleCount"];
    })
    .attr("cx", width / 2)
    .attr("cy", height / 2)
    .style("fill", function(d){ return color(d.geo.PUMA)})
    // .style("fill", function(d){
    //   console.log(d.geo.PUMA);
    //   if(d.geo.PUMA == 3301){
    //     return "#69b3a2";
    //
    //   }
    //   else if(d.geo.PUMA == 3302){
    //     return "#FFA07A";
    //   }
    //   else if(d.geo.PUMA == 3303){
    //     return "#beaed4";
    //   }
    //   else if(d.geo.PUMA == 3304){
    //     return "#e7298a";
    //   }
    //   else if(d.geo.PUMA == 3305){
    //     return "#386cb0";
    //   }
    //
    // })
    // .style("fill-opacity", 0.3)
    .attr("stroke", "#69a2b2")
    .style("stroke-width", 1)

// Features of the forces applied to the nodes:
var simulation = d3.forceSimulation()
.force("x", d3.forceX().strength(0.5).x( function(d){ return x(d.geo.PUMA) } ))
    .force("y", d3.forceY().strength(0.1).y( height/2 ))
    .force("center", d3.forceCenter().x(width / 2).y(height / 2)) // Attraction to the center of the svg area
    .force("charge", d3.forceManyBody().strength(0)) // Nodes are attracted one each other of value is > 0
    .force("collide", d3.forceCollide().strength(.01).radius(20).iterations(1)) // Force that avoids circle overlapping

// Apply these forces to the nodes and update their positions.
// Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
simulation
    .nodes(data)
    .on("tick", function(d){
      node
          .attr("cx", function(d){ return d.x; })
          .attr("cy", function(d){ return d.y; })
    });
});