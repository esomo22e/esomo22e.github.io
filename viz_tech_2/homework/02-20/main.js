// var apiUrl = "https://www.metaweather.com/api/location/search/?lattlong=50.96,-122.02";
var apiUrl = "https://ron-swanson-quotes.herokuapp.com/v2/quotes";

var frequency = 5 * 1000;
var dataMax = 10;
var data = [];

var width = window.innerWidth;
var height = window.innerHeight * 3/4;
var margin = {
  top: 20,
  right: 20,
  bottom: 150,
  left: 100
};

var chartWidth = width - margin.left - margin.right;
var chartHeight = height - margin.top - margin.bottom;

var svg = d3.select("#chart")
            .attr("width", width)
            .attr("height", height);

              var scaleWidth = 300;
              var scaleHeight = 20;
              var scaleX = margin.left + chartWidth / 2 - (scaleWidth / 2);
              var scaleY = margin.top + chartHeight + 40;

              var scale = svg.select("#scale")
                .attr("transform", "translate(" + scaleX + "," + scaleY + ")");

              scale.select("#scaleRect")
                .attr("width", scaleWidth)
                .attr("height", scaleHeight);


var domainValue = d3.range(1, dataMax +1);

var x = d3.scaleBand()
          .domain(domainValue.reverse())
          .range([margin.left, margin.left + chartWidth])
          .paddingInner(0.2)
          .paddingOuter(0.1);

var barWidth = x.bandwidth();

function fetchData(){

  d3.json(apiUrl, function(error, sent){
    d3.select("#quote").html("<strong>Ron Swanson said:</strong> " + sent[0] + "");
    d3.select("#num").html("Ron Swanson quote has <strong>" + sent[0].length + "</strong> characters.");


      var dataObject = {
        sent: sent[0].length,
        timestamp: new Date()
      };

      data.unshift(dataObject);
      if (data.length > dataMax) data.pop();

      var maximum = d3.max(data, function(d){
        return d.sent;
      });

      var barColor = d3.scaleSequential(d3.interpolateCubehelixDefault)
              .domain([0, maximum]);

              var stops = d3.range(0, 1.25, 0.25);

              svg.select("#colorGradient").selectAll("stop")
                  .data(stops).enter()
                  .append("stop")
                  .attr("offset", function(d){
                    return d * 100 + "%";
                  })
                  .attr("stop-color", function(d){
                    return barColor(d * maximum);
                  });

                  var gradiantScale = d3.scaleLinear()
                    .domain([0, maximum])
                    .range([0, scaleWidth]);

                  var scaleAxis = d3.axisBottom(gradiantScale);


                  scale.select("#scaleAxis")
                    .attr("transform", "translate(0," + scaleHeight + ")")
                    .transition().duration(frequency / 2)
                    .call(scaleAxis);

      var barHeight = d3.scaleLinear()
                        .domain([0, maximum])
                        .range([0, chartHeight]);

      var y = d3.scaleLinear()
                .domain([0, maximum])
                .range([margin.top + chartHeight, margin.top]);

      var yAxis = d3.axisLeft(y);
      svg.select("#y")
      .attr("transform", "translate(" + margin.left + ",0)")
      .transition().duration(frequency/2)
      .call(yAxis);

      var xAxis = d3.axisBottom(x)
                    .tickFormat(function(d){
                      var tickData = data[d-1];
                      if(tickData){
                        var now = new Date();
                        var msAgo = now - tickData.timestamp;
                        var secAgo = Math.round(msAgo/1000);

                        if(secAgo === 0){
                          return "Ron said what?!";
                        }
                        else{
                          var word = secAgo === 1 ? "second" : "seconds";
                          return "Ron said what " + secAgo + " " + word  + " ago?!";
                        }
                      }
                      else{

                        return "";

                      }
                    });

                    svg.select("#x")
                       .attr("transform", "translate(0," + (margin.top + chartHeight) + ")")
                       .call(xAxis);

                    function zeroState(selection){
                      selection
                        .attr("height", 0)
                        .attr("y", function(d){
                          return d.sent;
                        });
                    }

                    var bars = svg.select("#shapes").selectAll(".bar")
                                  .data(data, function(d){
                                    return d.timestamp;
                                  });

                  var enterBars = bars.enter().append("rect")
                                      .attr("class", "bar")
                                      .attr("width", barWidth)
                                      // .attr("fill", "red")
                                      .call(zeroState)
                                      .attr("x", function(d,i){
                                        return x(i +1);
                                      });

                      bars.merge(enterBars)
                          .transition().duration(frequency/2)
                          .attr("fill", function(d){
                              return barColor(d.sent);
                            })
                          .attr("width", barWidth)
                          .attr("height", function(d){
                            return barHeight(d.sent);
                          })
                          .attr("y", function(d){
                            return y(d.sent);
                          })
                          .attr("x", function(d,i){
                            return x(i+1);
                          });

                        bars.exit()
                            .transition().duration(frequency/2)
                            .call(zeroState)
                            .remove();

  });
}
fetchData();
setInterval(fetchData, frequency);




// // var apiUrl = "https://www.metaweather.com/api/location/search/?lattlong=50.96,-122.02";
// var apiUrl = "https://ron-swanson-quotes.herokuapp.com/v2/quotes";
//
// var frequency = 5 * 1000;
// var dataMax = 10;
// var data = [];
//
// var width = window.innerWidth;
// var height = window.innerHeight * 3/4;
// var margin = {
//   top: 20,
//   right: 20,
//   bottom: 150,
//   left: 100
// };
//
// var chartWidth = width - margin.left - margin.right;
// var chartHeight = height - margin.top - margin.bottom;
//
// var svg = d3.select("#chart")
//             .attr("width", width)
//             .attr("height", height);
//
//             var scaleWidth = 300;
//             var scaleHeight = 20;
//             var scaleX = margin.left + chartWidth / 2 - (scaleWidth / 2);
//             var scaleY = margin.top + chartHeight + 40;
//
//             var scale = svg.select("#scale")
//               .attr("transform", "translate(" + scaleX + "," + scaleY + ")");
//
//             scale.select("#scaleRect")
//               .attr("width", scaleWidth)
//               .attr("height", scaleHeight);
//
// var domainValue = d3.range(1, dataMax +1);
//
// var x = d3.scaleBand()
//           .domain(domainValue.reverse())
//           .range([margin.left, margin.left + chartWidth])
//           .paddingInner(0.2)
//           .paddingOuter(0.1);
//
// var barWidth = x.bandwidth();
//
// function fetchData(){
//
//   d3.json(apiUrl, function(error, sent){
//     d3.select("#quote").html("<strong>Ron Swanson said:</strong> " + sent[0] + "");
//     d3.select("#num").html("Ron Swanson quote has <strong>" + sent[0].length + "</strong> characters.");
//
//       var dataObject = {
//         sent: sent[0].length,
//         timestamp: new Date()
//       };
//
//       data.unshift(dataObject);
//       if (data.length > dataMax) data.pop();
//
//       var maximum = d3.max(data, function(d){
//         return d.sent;
//       });
//
//       // if (data.length === dataMax) clearInterval(myInterval);
//
//       var barColor = d3.scaleSequential(d3.interpolateCubehelixDefault)
//         .domain([0, maximum]);
//
//       var stops = d3.range(0, 1.25, 0.25);
//
//       svg.select("#colorGradient").selectAll("stop")
//           .data(stops).enter()
//           .append("stop")
//           .attr("offset", function(d){
//             return d * 100 + "%";
//           })
//           .attr("stop-color", function(d){
//             return barColor(d * maximum);
//           });
//
//           var gradiantScale = d3.scaleLinear()
//             .domain([0, maximum])
//             .range([0, scaleWidth]);
//
//           var scaleAxis = d3.axisBottom(gradiantScale);
//
//
//           scale.select("#scaleAxis")
//             .attr("transform", "translate(0," + scaleHeight + ")")
//             .transition().duration(frequency / 2)
//             .call(scaleAxis);
//
//         var barHeight = d3.scaleLinear()
//                         .domain([0, maximum])
//                         .range([0, chartHeight]);
//
//       var y = d3.scaleLinear()
//                 .domain([0, maximum])
//                 .range([margin.top + chartHeight, margin.top]);
//
//       var yAxis = d3.axisLeft(y);
//       svg.select("#y")
//       .attr("transform", "translate(" + margin.left + ",0)")
//       .transition().duration(frequency/2)
//       .call(yAxis);
//
//       var xAxis = d3.axisBottom(x)
//                     .tickFormat(function(d){
//                       var tickData = data[d-1];
//                       if(tickData){
//                         var now = new Date();
//                         var msAgo = now - tickData.timestamp;
//                         var secAgo = Math.round(msAgo/1000);
//
//                         if(secAgo === 0){
//                           return "Most Recent Quote";
//                         }
//                         else{
//                           var word = secAgo === 1 ? "second" : "seconds";
//                           return secAgo + " " + word  + " Ron Swanson quote";
//                         }
//                       }
//                       else{
//
//                         return "";
//
//                       }
//                     });
//
//                     svg.select("#x")
//                        .attr("transform", "translate(0," + (margin.top + chartHeight) + ")")
//                        .call(xAxis);
//
//                     function zeroState(selection){
//                       selection
//                         .attr("height", 0)
//                         .attr("y", function(d){
//                           return d.sent;
//                         });
//                     }
//
//                     var bars = svg.select("#shapes").selectAll(".bar")
//                                   .data(data, function(d){
//                                     return d.timestamp;
//                                   });
//
//                   var enterBars = bars.enter().append("rect")
//                                       .attr("class", "bar")
//                                       .attr("width", barWidth)
//                                       // .attr("fill", "red")
//                                       .call(zeroState)
//                                       .attr("x", function(d,i){
//                                         return x(i +1);
//                                       });
//
//                       bars.merge(enterBars)
//                           .transition().duration(frequency/2)
//                           .attr("fill", function(d){
//                             return barColor(d.sent);
//                           })
//                           .attr("width", barWidth)
//                           .attr("height", function(d){
//                             return barHeight(d.sent);
//                           })
//                           .attr("y", function(d){
//                             return y(d.sent);
//                           })
//                           .attr("x", function(d,i){
//                             return x(i+1);
//                           });
//
//                         bars.exit()
//                             .transition().duration(frequency/2)
//                             .call(zeroState)
//                             .remove();
//
//   });
// }
// fetchData();
// // var myInterval = setInterval(fetchData, frequency);
//
// setInterval(fetchData, frequency);

// d3.json(apiUrl, function(error, data){
//   console.log(apiUrl);
// });
