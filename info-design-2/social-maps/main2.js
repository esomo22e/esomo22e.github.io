var width = d3.select('#graph').node().offsetWidth;
var height =  d3.select('#graph').node().offsetHeight;

// height = 500;
var margin = {
  top: 20,
  right: 20,
  bottom: 50,
  left: 100
};

var svg = d3.select("#graph")
  .append('svg')
  .attr("width",width)
  .attr("height", height);

var radius = 8;
var forceStrength = 0.3;
var forceStrength2 = 0.1;

var color = d3.scaleOrdinal(d3.schemeCategory20);

var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

d3.queue()
  .defer(d3.csv, "./data/mutual_aid_states.csv")
  .defer(d3.csv, "./data/mutual_aid_count.csv")
  .await(function(error, data_states, data_count) {
    console.log(data_count);

    data_count.forEach(function(d) {
      console.log(d);
  d.r = d.count * 2.5;
  d.x = width;
  d.y = height;
})

var simulation = d3.forceSimulation()
  .force("collide", d3.forceCollide(function(d) {
    return d.count*2.6;
  }).iterations(16))
  .force("charge", d3.forceManyBody())
  .force("y", d3.forceY().y(height))
  .force("x", d3.forceX().x(width));

  var circles =  svg
              // .selectAll("image")
              .selectAll("circle")
              .data(data_count);

              var circlesEnter = circles.enter().append("circle")
            .attr("r", function(d, i) {
                return d.count * 2.5;
            })
            .attr("cx", function(d, i) {
                return 175 + 25 * i + 2 * i ** 2;
            })
            .attr("cy", function(d, i) {
                return 250;
            })
            .style("fill", function(d, i) {
                // return color(d.place_info__state
                return "#C9C16B"
            })
            .style("stroke", function(d, i) {
                return "#001933";
            })
            .on("mouseover, mousemove", function(d) {

              d3.select(this)
              .transition()
              .duration(550)
              .style("fill", function(d, i) {
                  return "#d3cd88";
              })
              .attr("r", d.count*2.5);
              // //console.log(d.schoolName);
              div.transition()
                .duration(200)
                .style("opacity", .9);
            div	.html("<b>" + "State: "+ "</b>"+ d.place_info__state + "<br/>"
            + "<b>count: </b>"+ d.count + " mutual aid funds")
            .style("font-size", "14px")
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
            })
.on("mouseout", function(d) {

  d3.select(this).transition()
        .duration(550)
        .style("fill", function(d, i) {
            // return color(d.place_info__state);
            return "#C9C16B"
        })
        .attr("r", d.count *2.5);

        div.transition()
  .duration(500)
  .style("opacity", 0);
        });

        circles = circles.merge(circlesEnter);


    function ticked() {

      circles
        .attr("cx", function(d) {
          return d.x = Math.max(d.count*2.5, Math.min(width - (d.count*2.5), d.x));

        })
        .attr("cy", function(d) {
          return d.y = Math.max(d.count*2.5, Math.min(height - (d.count*2.5), d.y));
        });
    }

    simulation
      .nodes(data_count)
      .on("tick", ticked);

      // @v4 Reset the 'x' force to draw the bubbles to the center.
      simulation
        .force('x', d3.forceX().strength(forceStrength).x(width / 2))
        .force('y', d3.forceY()
          .strength(forceStrength)
          .y(height / 2));
      // @v4 We can reset the alpha value and restart the simulation
      simulation.alpha(1).restart();


    simulation2
      .nodes(data_count)
      .on("tick", ticked2);

      // @v4 Reset the 'x' force to draw the bubbles to the center.
      simulation2
        .force('x', d3.forceX().strength(forceStrength).x(width / 2))
        .force('y', d3.forceY()
          .strength(forceStrength)
          .y(height / 2));
      // @v4 We can reset the alpha value and restart the simulation
      simulation2.alpha(2).restart();

  });
