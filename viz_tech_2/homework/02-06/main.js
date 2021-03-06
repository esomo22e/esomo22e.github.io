// var apiUrl = "https://www.metaweather.com/api/location/search/?lattlong=50.96,-122.02";
var apiUrl = "https://ron-swanson-quotes.herokuapp.com/v2/quotes";

var frequency = 5 * 1000;
var dataMax = 5;
var data = [];

var width = window.innerWidth;
var height = window.innerHeight * 3/4;
var margin = {
  top: 20,
  right: 20,
  bottom: 50,
  left: 100
};

var chartWidth = width - margin.left - margin.right;
var chartHeight = height - margin.top - margin.bottom;

var svg = d3.select("#chart")
            .attr("width", width)
            .attr("height", height);

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

    console.log(sent[0]);
    console.log(sent[0].length);
      var dataObject = {
        sent: sent[0].length,
        timestamp: new Date()
      };

      data.unshift(dataObject);
      if (data.length > dataMax) data.pop();
      console.log(data);

      var maximum = d3.max(data, function(d){
        return d.sent;
      });

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
                          return "Recent Quote";
                        }
                        else{
                          var word = secAgo === 1 ? "second" : "seconds";
                          return secAgo + " " + word  + " ago";
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
                                    console.log(data);
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

// d3.json(apiUrl, function(error, data){
//   console.log(apiUrl);
// });
