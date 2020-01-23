
var realtimeUrl = "https://whiteboard.datawheel.us/api/google-analytics/realtime/random";
var frequency = 1 * 1000;

var chartDiv = document.getElementById("graph");
var width = chartDiv.clientWidth;
var height = 500;

var svg = d3.select("#graph").append("svg")
                                .attr("width", 1500)
                              .attr("height", 600);

                              function redraw(data){
                                var circleData = d3.range(data).map(function(d) { return  d; });


                                 //1. get circles and bind data (there are none in the first pass!)
                                var circles = svg.selectAll("circle")
                                                          .data(circleData);

                                  //bind data

                                 //enter data
                                 circles
                                 .enter()
                                 .append("circle")
                                        .attr("r",0);
                                      // circles.exit().remove();

                                      circles.exit()
                                        .transition()
                                        .attr('r', 0)
                                        .remove();

                                                 circles
                                                      // .attr("cx", width/2)
                                                      .attr("cx",function(d, i) {
                                                        return (i * 10) + (width/8);
                                                      })
                                                      .attr("cy", (height/2))
                                                      .attr("r", function (d,i) {
                                                        return 2*i;
                                                      })
                                                      .attr("fill", "#ff8e50")
                                                      .attr("opacity", function(d){
                                                        return 0.3;
                                                      })
                                                      // .style("fill", "orange")
                                                      .attr("stroke", "#c51236")
                                                      .attr("stroke-width", function(d,i){
                                                        return 2;
                                                      });


                                                  circles.exit().remove();


                              }

      function fetchData() {
        d3.json(realtimeUrl, function(err, users) {
          console.log(realtimeUrl);

          d3.select("#users").html("There are "+users+ " users on DATA USA!!!");
          redraw(users);


        });




      }

      fetchData();

      setInterval(fetchData, frequency);
