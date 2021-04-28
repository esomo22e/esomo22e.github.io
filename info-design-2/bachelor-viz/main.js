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
  .attr("width", width)
  .attr("height", height);

// var radius = 8;
// // var forceStrength = 0.3;
// var forceStrengt2 = 0.05;

// var colors = ["#9370DB", "#B0C4DE", "#008080"];

// var colorHighlight = ["#7870db", "#7a9cc7", "#004d4d"];
// var colorscale = d3.scaleOrdinal()
//  .range(colors);
//
// var colorscaleHigh = d3.scaleOrdinal()
// .range(colorHighlight);

var radius = 25;
var colorscale = d3.scaleOrdinal(d3.schemeCategory20);
var centerScale = d3.scalePoint().padding(1).range([0, width]);
var forceStrength = 0.05;

var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

    d3.queue()
    .defer(d3.csv, "./datasets/bachelor2.csv")
  .await(function(error, data) {

    console.log(data);

    function canvas_clear() {


            svg
              .selectAll("*")
              .remove();
          }

          data.forEach(function(d) {
            d.r = radius;
            d.x = width / 2;
            d.y = height / 2;
          })

          function sec_1() {
            console.log("section 1")
            canvas_clear();
            var simulation = d3.forceSimulation()
              .force("collide", d3.forceCollide(function(d) {
                return d.r + 6;
              }).iterations(16))
              .force("charge", d3.forceManyBody())
              .force("y", d3.forceY().y(height / 2))
              .force("x", d3.forceX().x(width / 2));

            var circles =  svg
                          // .selectAll("image")
                          .selectAll("circle")
                          .data(data);

              // var circlesEnter = circles
              // .enter()
              //           .append("image")
              //           .data(data_schools)
              //
              //          // .attr("r", function(d, i){ return d.r + 4; })
              //           .attr("x", function(d, i){ return 175 + 25 * i + 2 * i ** 2; })
              //           .attr("y", function(d, i){ return 250; })
              //           .attr("xlink:href",  function(d) { return icon.school;})
              //           .attr("height", 20)
              //           .attr("width", 20)
              //           .attr("fill", function(d, i) {
              //               return "#000";
              //             })
              //             .style("stroke", function(d, i) {
              //               return "#000";
              //             })
              //             .on("mouseover, mousemove", function(d){
              //
              //               d3.select(this)
              //              .transition()
              //                .duration(550)
              //              .attr("height", 30)
              //              .attr("width", 30);
              //             })
              //             .on("mouseout", function(d){
              //               d3.select(this).transition()
              //               .duration(550)
              //               .attr("height", 20)
              //               .attr("width", 20);
              //             });


            var circlesEnter = circles.enter().append("circle")
            .attr("r", function(d, i) {
                return d.r;
            })
            .attr("cx", function(d, i) {
                return 175 + 25 * i + 2 * i ** 2;
            })
            .attr("cy", function(d, i) {
                return 250;
            })
            .style("fill", function(d, i) {
                return colorscale(d.PARTICIPANTS);
            })
            // .style("stroke", function(d, i) {
            //     return "#001933";
            // })
            .on("mouseover, mousemove", function(d) {

                // d3.select(this)
                //     .transition()
                //     .duration(550)
                //     .style("fill", function(d, i) {
                //         return "#FF6666";
                //     })
                //     .attr("r", 15);
                //     // //console.log(d.schoolName);
                //     div.transition()
                //       .duration(200)
                //       .style("opacity", .9);
                //   div	.html("<b>" + "School: "+ "</b>"+ d.schoolName + "<br/>"
                //   + "<b>Students: </b>"+ d.totalStudents)
                //   .style("font-size", "14px")
                //       .style("left", (d3.event.pageX) + "px")
                //       .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
              //   d3.select(this).transition()
              //       .duration(550)
              //       .style("fill", function(d, i) {
              //           return "#003366";
              //       })
              //       .attr("r", 8);
              //
              //       div.transition()
              // .duration(500)
              // .style("opacity", 0);
            });

            circles = circles.merge(circlesEnter);


            function ticked() {

              circles
                .attr("cx", function(d) {
                  return d.x = Math.max(d.r, Math.min(width - d.r, d.x));

                })
                .attr("cy", function(d) {
                  return d.y = Math.max(d.r, Math.min(height - d.r, d.y));
                });
            }

            simulation
              .nodes(data)
              .on("tick", ticked);

            function groupBubbles() {
              // hideTitles();

              // @v4 Reset the 'x' force to draw the bubbles to the center.
              simulation
                .force('x', d3.forceX().strength(forceStrength).x(width / 2))
                .force('y', d3.forceY()
                  .strength(forceStrength)
                  .y(height / 2));
              // @v4 We can reset the alpha value and restart the simulation
              simulation.alpha(1).restart();
            }

            groupBubbles();

      }

function sec_2() {
  canvas_clear();

  console.log("section 2");


  var simulation = d3.forceSimulation()
    .force("collide", d3.forceCollide(function(d) {
      return d.r + 6;
    }).iterations(16))
    .force("charge", d3.forceManyBody())
    .force("y", d3.forceY().y(height / 2))
    .force("x", d3.forceX().x(width / 2));

    var circles =  svg
                  // .selectAll("image")
                  .selectAll("circle")
                  .data(data);

  // //console.log(data_schools);


  // groupBubbles();
  var circlesEnter = circles.enter().append("circle")
  .style("fill", function(d, i) {
      return colorscale(d.PARTICIPANTS);
  })
  .attr("r", function(d, i) {
      return d.r;
  })
  .attr("cx", function(d, i) {
      return 175 + 25 * i + 2 * i ** 2;
  })
  .attr("cy", function(d, i) {
      return 250;
  })
  .transition()
  .duration(6000)

  .attr("cy", function(d, i) {
      if(d["ELIMINATION-1"] == "E"){
        return 3000;
      }
  })

  // .style("stroke", function(d, i) {
  //     return "#000";
  // })

  circles = circles.merge(circlesEnter);


  function ticked() {

    circles
      .attr("cx", function(d) {
        return d.x = Math.max(d.r, Math.min(width - d.r, d.x));

      })
      .attr("cy", function(d) {
        return d.y = Math.max(d.r, Math.min(height - d.r, d.y));
      });
  }

  simulation
    .nodes(data)
    .on("tick", ticked);

    var push_bachelor = {
      BACHELOR:{ x: width *3/6, y: height *0.3/6 },
      CONTESTANT: { x: width *3/6, y: height *3/6}
      // f: { x: width / 2, y: height / 3 },
      // m: { x: width / 3, y: 2*height / 3 },
      // n: { x: 2*width / 3, y: 2*height / 3 }
    }

    function splitBubbles(byVar) {
      //conso.log(byVar);
        function bubble_position_x(d) {
            //console.log(d[byVar]);
            return push_bachelor[d[byVar]].x;
          }

        function bubble_position_y(d) {
            return push_bachelor[d[byVar]].y;
          }

          simulation
        .force('x', d3
                      .forceX()
                      .strength(forceStrength)
                      .x(bubble_position_x)
                      )
      .force('y', d3
                    .forceY()
                    .strength(forceStrength)
                    .y(bubble_position_y)
                    );

            simulation.alpha(2).restart();

            // svg
            // .selectAll('rect')
            // .data(data_clothes)
            // .enter()
            // .append('rect')
            // .attr("fill", "#FFFAF0")
            // .style("fill-opacity", 0.7)
            // .attr("width", 65)
            // .attr("height", 24)
            // .attr("rx",'5')
            // .attr("ry",'5')
            // .attr('x', function (d) { return bubble_position_x(d)-10; })
            // .attr('y', function (d) { return bubble_position_y(d)-5; });
            //
            // svg
            // .selectAll('text')
            // //.data(data, function(d){ return d[byVar];})
            // .attr("class", "text-group")
            // .data(data_clothes)
            // .enter()
            // .append('text')
            // .attr('x', function (d) { return bubble_position_x(d); })
            // .attr('y', function (d) { return bubble_position_y(d); })
            // .attr('text-anchor', 'start')
            // .attr('alignment-baseline',"hanging")
            // .text(function (d) { return d[byVar]; });
        }



        splitBubbles('PARTICIPANTS');

}

function sec_3() {

  canvas_clear();

  console.log("section 3");


  var dataFilter = data.filter(function(d){
    console.log(d)

    return d["ELIMINATION-1"] != "E";
  });

  console.log(dataFilter)

  var simulation = d3.forceSimulation()
    .force("collide", d3.forceCollide(function(d) {
      return d.r + 6;
    }).iterations(16))
    .force("charge", d3.forceManyBody())
    .force("y", d3.forceY().y(height / 2))
    .force("x", d3.forceX().x(width / 2));

  var circles =  svg
                // .selectAll("image")
                .selectAll("circle")
                .data(dataFilter);



  var circlesEnter = circles.enter().append("circle")
  .attr("r", function(d, i) {
      return d.r;
  })
  .attr("cx", function(d, i) {
      return 175 + 25 * i + 2 * i ** 2;
  })
  .attr("cy", function(d, i) {
      return 250;
  })

  .style("fill", function(d, i) {
      return colorscale(d.PARTICIPANTS);
  })


  circles = circles.merge(circlesEnter);


  function ticked() {

    circles
      .attr("cx", function(d) {
        return d.x = Math.max(d.r, Math.min(width - d.r, d.x));

      })
      .attr("cy", function(d) {
        return d.y = Math.max(d.r, Math.min(height - d.r, d.y));
      });
  }

  simulation
    .nodes(dataFilter)
    .on("tick", ticked);

    var push_bachelor = {
      "D1_1":{ x: width *1/6, y: height *1.3/6 },
      "D1_2": { x: width *2.5/6, y: height*1.3/6},
      "D8": { x: width *4/6, y: height*1.3/6},
      "": { x: width *5.5/6, y: height*1.3/6},
    "N/A": { x: width *3/6, y: height*4/6}
      // f: { x: width / 2, y: height / 3 },
      // m: { x: width / 3, y: 2*height / 3 },
      // n: { x: 2*width / 3, y: 2*height / 3 }
    }

    function splitBubbles(byVar) {
      //conso.log(byVar);
        function bubble_position_x(d) {
            //console.log(d[byVar]);
            return push_bachelor[d[byVar]].x;
          }

        function bubble_position_y(d) {
            return push_bachelor[d[byVar]].y;
          }

          simulation
        .force('x', d3
                      .forceX()
                      .strength(forceStrength)
                      .x(bubble_position_x)
                      )
      .force('y', d3
                    .forceY()
                    .strength(forceStrength)
                    .y(bubble_position_y)
                    );

            simulation.alpha(2).restart();


        }



        splitBubbles('DATES-2');


}

function sec_4(){
  canvas_clear();
  //
  console.log("section 4");
  //
  var dataFilter = data.filter(function(d){
    console.log(d)

    return d["ELIMINATION-1"] != "E";
  });

  console.log(dataFilter)

  var simulation = d3.forceSimulation()
    .force("collide", d3.forceCollide(function(d) {
      return d.r + 6;
    }).iterations(16))
    .force("charge", d3.forceManyBody())
    .force("y", d3.forceY().y(height / 2))
    .force("x", d3.forceX().x(width / 2));

  var circles =  svg
                // .selectAll("image")
                .selectAll("circle")
                .data(dataFilter);



  var circlesEnter = circles.enter().append("circle")
  .attr("r", function(d, i) {
      return d.r;
  })
  .attr("cx", function(d, i) {
      return 175 + 25 * i + 2 * i ** 2;
  })
  .attr("cy", function(d, i) {
      return 250;
  })
  .transition()
  .duration(1000)
  .attr("cy", function(d, i) {
      return 0;
  })
  .style("fill", function(d, i) {
      return colorscale(d.PARTICIPANTS);
  })


  circles = circles.merge(circlesEnter);


  function ticked() {

    circles
      .attr("cx", function(d) {
        return d.x = Math.max(d.r, Math.min(width - d.r, d.x));

      })
      .attr("cy", function(d) {
        return d.y = Math.max(d.r, Math.min(height - d.r, d.y));
      });
  }

  simulation
    .nodes(dataFilter)
    .on("tick", ticked);

    var push_bachelor = {
      "D1_1":{ x: width *1/6, y: height *1.3/6 },
      "D1_2": { x: width *2.5/6, y: height*1.3/6},
      "D8": { x: width *4/6, y: height*1.3/6},
      "": { x: width *5.5/6, y: height*1.3/6},
    "N/A": { x: width *3/6, y: height*4/6}
      // f: { x: width / 2, y: height / 3 },
      // m: { x: width / 3, y: 2*height / 3 },
      // n: { x: 2*width / 3, y: 2*height / 3 }
    }

    function splitBubbles(byVar) {
      //conso.log(byVar);
        function bubble_position_x(d) {
            //console.log(d[byVar]);
            return push_bachelor[d[byVar]].x;
          }

        function bubble_position_y(d) {
            return push_bachelor[d[byVar]].y;
          }

          simulation
        .force('x', d3
                      .forceX()
                      .strength(forceStrength)
                      .x(bubble_position_x)
                      )
      .force('y', d3
                    .forceY()
                    .strength(forceStrength)
                    .y(bubble_position_y)
                    );

            simulation.alpha(2).restart();


        }



        splitBubbles('DATES-2');

}
function sec_5(){
  canvas_clear();
  console.log("section 5");


}

    var gs = d3.graphScroll()
      .container(d3.select('#container'))
      .graph(d3.selectAll('#graph'))
      .sections(d3.selectAll('#sections > div'))
      // .offset(innerWidth < 900 ? innerHeight - 30 : 200)
      .eventId('uniqueId1')
      .on('active', function(i) {



        [
          sec_1,
          sec_2,
          sec_3,
          sec_4,
          sec_5
        ][i]();

      });




  });
