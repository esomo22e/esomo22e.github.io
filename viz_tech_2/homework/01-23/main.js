var realtimeURL = "https://whiteboard.datawheel.us/api/google-analytics/realtime/random";
var frequency = 1 * 1000; // 10 seconds
var dataMax = 10;
var data = [];

var width = window.innerWidth;
var height = window.innerHeight;

var svg = d3.select("#chart")
            .attr("width", width)
            .attr("height", height);

  var barWidth = width/dataMax;

  var x = d3.scaleLinear()
            .domain([dataMax, 1])
            .range([0, width]);

function fetchData(){
  d3.json(realtimeURL, function(error, users){

    var dataObject = {
      users: users,
      timestamp: new Date()
    };

    data.unshift(dataObject);

    if(data.length > dataMax) data.pop();
    console.log(data);

    var maximum = d3.max(data, function(d){
      return d.users;
    });

    var y = d3.scaleLinear()
              .domain([0, maximum])
              .range([height, 0]);

      var yAxis = d3.axisLeft(y);

   svg
      .append("g")
      .attr("class", "y_axis")
      .attr("transform", "translate(30,0)");      // This controls the vertical position of the Axis
      // .call(yAxis);

      svg.select('.y_axis')
   .transition()
   .duration(frequency/2)
   .call(yAxis);

//Get Bar Height
    var barHeight = d3.scaleLinear()
      .domain([0,maximum])
      .range([0, height]);

       var colors = color = d3.scaleOrdinal(d3.schemeCategory20);;

    var bars = svg.selectAll(".bar")
                  .data(data, function(d){
                    return d.timestamp;
                  });

//Enter Bars
    var enterBars = bars.enter().append("rect")
                        .attr("class", "bar")
                        .attr("width", barWidth)
                        .attr("height", 0)
                        .attr("fill", function(d,i){

                          return "lavender";
                        })
                        .attr("transform", "translate(30," + 0 + ")")
                        .attr("stroke", "lavender")
                        .attr("x", function(d, i){
                          return x(i+1);
                        })
                        .attr("y", height);

      bars.merge(enterBars)
          .transition().duration(frequency/2)
          .attr("x", function(d, i){
            return x(i+1);
          })
          .attr("height", function(d){
            return barHeight(d.users);
          })
          .attr("y", function(d){
            var h = barHeight(d.users);
            return height -h;
          })
          .attr("x", function(d,i){
            return x(i +1);
          });


                bars.exit().remove();

  });





}
fetchData();
setInterval(fetchData, frequency);
