var realtimeURL = "https://whiteboard.datawheel.us/api/google-analytics/realtime/random";
var frequency = 1 * 1000; // 10 seconds
var dataMax = 10;
var data = [];

var width = window.innerWidth;
var height = window.innerHeight;

var svg = d3.select("#chart")
  .attr("width", width)
  .attr("height", height);
var barWidth = width / dataMax;


var x = d3.scaleLinear()
  .domain([dataMax, 1])
  .range([0, width]);



function fetchData() {

  d3.json(realtimeURL, function(error, users) {

    var dataObject = {
      users: users,
      timestamp: new Date()
    };

    data.unshift(dataObject);
    // data.unshift(users);
    if (data.length > dataMax) data.pop();
    console.log(data);
    // console.log("users: "+users);
    // console.log(data);
    var maximum = d3.max(data, function(d) {
      return d.users;
    });

    var barHeight = d3.scaleLinear()
      .domain([0, maximum])
      .range([0, height]);

    var bars = svg.selectAll(".bar")
      .data(data, function(d) {
        return d.timestamp;
      });

    // bars.enter().append("rect")
    //     .attr("class", "bar")
    //
    //
    //Enter Function
    var enterBars = bars.enter().append("rect")
      .attr("class", "bar")
      .attr("width", barWidth)
      .attr("height", 0)
      // .attr("height", function(d){
      //   barHeight(d);
      // })
      .attr("fill", "lavender")
      .attr("stroke", "red")
      .attr("x", function(d, i) {
        return x(i + 1);
      })
      .attr("y", height);
    // .attr("y", function(d){
    //   var h = barHeight(d);
    //   return height -h;
    // });

    bars.merge(enterBars)
      .transition().duration(frequency / 2)
      .attr("x", function(d, i) {
        return x(i + 1);
      })
      .attr("height", function(d) {
        return barHeight(d.users);
      })
      .attr("y", function(d) {
        var h = barHeight(d.users);
        return height - h;
      })
      .attr("x", function(d, i) {
        return x(i + 1);
      });
    //Exit Function
    bars.exit().remove();
  });

}

// fetchData();
setInterval(fetchData, frequency);
