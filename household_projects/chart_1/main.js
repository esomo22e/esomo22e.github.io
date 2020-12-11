var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = d3.select("#chart").node().getBoundingClientRect().width - margin.left - margin.right,
    height = d3.select("#chart").node().getBoundingClientRect().height - margin.top - margin.bottom;



var svg = d3.select("#chart").append("svg")
    // .attr("width", width + margin.left + margin.right)
    // .attr("height", height + margin.top + margin.bottom)
            .attr("viewBox", "0 0 " + width + " " + height )
                          .attr("preserveAspectRatio", "xMidYMid meet")
  .append("g")
    // .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var color = d3.scaleOrdinal()
      // .domain([3301,3302,3303,3304,3305])
      .range([ "#69b3a2", "#FFA07A", "#beaed4", "#e7298a", "#386cb0"])

      // A scale that gives a X target position for each group
var x = d3.scaleOrdinal()
  // .domain([1, 2, 3])
  .range([50, width/5,2 * (width/5), 3 *(width/5), 4 * (width/5)])

d3.json("./data/aggregation_query.json", function(error, data) {
  console.log(data);

  var node = svg.append("g")
  // .attr("viewBox", "0 0 " + width+ " " + height )
  // .attr("preserveAspectRatio", "xMidYMid meet")
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
    .style("fill-opacity", 0.8)
    .attr("stroke", "#69a2b2")
    .style("stroke-width", 1);


    var text = svg.selectAll("text")
    .attr("class", "labels")
                   .data(data)
                     .enter()
                     .append("text")
    //Add SVG Text Element Attributes
    var textLabels = text
                .attr("x", function(d,i) { return x(d.geo.PUMA) + 100; })
               .attr("y", function(d) { return 200; })
               // .select("p")
                 .text( function (d,i) {
                   return d.geo.PUMA;
             })
                 // .attr("font-family", "sans-serif")
                .attr("font-size", "30px");


                 // .attr("fill", "black");
                 var text2 = svg.selectAll("text2")
                 .attr("class", "labels2")
                                .data(data)
                                  .enter()
                                  .append("text")

                                  var textLabels = text2
                                              .attr("x", function(d,i) { return x(d.geo.PUMA); })
                                             .attr("y", function(d) { return 230; })
                                             // .select("p")
                                               .text(function(d){
                                                 if(d.geo.PUMA == "3303"){
                                                   return "Dorchester & South Boston";
                                                 }
                                                 else if(d.geo.PUMA == "3302"){
                                                   return "Back Bay, Beacon Hill, Charlestown, East Boston, Central & South End";

                                                    }
                                                    else if(d.geo.PUMA == "3301"){
                                                      return "Allston, Brighton & Fenway";

                                                       }
                                                       else if(d.geo.PUMA == "3304"){
                                                         return "Mattapan & Roxbury";

                                                          }
                                                          else if(d.geo.PUMA == "3305"){
                                                              return "Hyde Park, Jamaica Plain, Roslindale & West Roxbury";
                                                             }
                                               })
                                               .attr("font-size", "20px");

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
