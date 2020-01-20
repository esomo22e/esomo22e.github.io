
var realtimeUrl = "https://whiteboard.datawheel.us/api/google-analytics/realtime/111999474";
var frequency = 1 * 1000;

var chartDiv = document.getElementById("graph");
var width = chartDiv.clientWidth;
var height = 500;

var svg = d3.select("#graph").append("svg")
                                .attr("width", 1500)
                              .attr("height", 600);


      function fetchData() {
        d3.json(realtimeUrl, function(err, users) {
          console.log(realtimeUrl);

          d3.select("#users").html("There are "+users+ " this morning");

          var circleData = d3.range(users).map(function(d) { return  d; });


          var circles = svg.selectAll("circle")
                                    .data(circleData)
                                   .enter().append("circle");
                           circles
                                .attr("cx",function(d, i) {return (i * 10) + 30})
                                .attr("cy", (height/2))
                                .attr("r", function (d) { return d; })
                                .style("fill", "orange")
                                .attr("stroke", "red");

                      var labels = circles.append("text")
                          .attr("dy", (height/2))
                          .text(function(d){
                            console.log(d)
                              return d;
                            }
                          )
                          ;

                                circles.exit().remove();


        });


      }

      setInterval(fetchData, frequency);
// var fetchData = function(){
//   d3.json(realtimeUrl, function(error, users){
//     // console.log(users);
//     d3.select("#users").html("Users:" + users);
//
//
//     var circles = d3.range(users).map(function(d){
//       return d;
//     })
//
//     console.log(circles);
//
//
//
//   });
// }
//
//
//
//
// setInterval(fetchData, frequency);
// fetchData();
// console.log(fetchData);
