var realtimeURL = "https://whiteboard.datawheel.us/api/google-analytics/realtime/random";
var frequency = 1 * 1000; // 1 seconds

var dataMax = 5;
var data = [];

var width = window.innerWidth;
var height = window.innerHeight;
var margin = {
  top: 20,
  right: 150,
  bottom: 100,
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

  var legendX = margin.left + chartWidth;
  var legendY = margin.top;
  var legendSize = 20;
  var legendPadding = 10;

  var legend = svg.select("#legend")
                  .attr("transform", "translate(" + legendX + "," + legendY + ")");
// var barWidth = chartWidth / dataMax;

var domainValue = d3.range(1, dataMax + 1);

var x = d3.scaleBand()
  .domain(domainValue.reverse())
  .range([margin.left, margin.left + chartWidth])
  //inside the bar - in between bars
  .paddingInner(0.2)
  //outside the bar
  .paddingOuter(0.1);

var barWidth = x.bandwidth();

// .domain([dataMax, 1])
// .range([margin.left, margin.left + chartWidth - barWidth]);

function fetchData() {

  d3.json(realtimeURL, function(error, users) {

    var dataObject = {
      users: users,
      timestamp: new Date()
    };

    data.unshift(dataObject);
    if (data.length > dataMax) data.pop();
    console.log(data);

    var legendData = data.map(function(d){
      return d.users;
    });

    legendData = legendData.filter(function(d,i){
      return legendData.indexOf(d) === i;
    });

    legendData = legendData.sort(function(a, b) {
      return a - b;
    });

    console.log(legendData);



    var maximum = d3.max(data, function(d) {
      return d.users;
    });

    var barColor = d3.scaleSequential(d3.interpolateCubehelixDefault)
      .domain([0, maximum]);
    // var barColor = d3.scaleLinear()
    //                .domain([0, maximum])
    //                .range(["lavender", "red"]);
    var legendRects = legend.selectAll("rect")
                            .data(legendData);

      console.log(legendData);
    var legendRectsEnter = legendRects.enter().append("rect");


    legendRects.merge(legendRectsEnter)
               .attr("x", 0)
               .attr("y", function(d,i){
                 return i * legendSize + i * 10;
               })
               .attr("fill", barColor)
              .attr("width", legendSize)
              .attr("height", legendSize);


var legendTexts = legend.selectAll("text")
  .data(legendData);

  var legendTextsEnter = legendTexts.enter().append("text")
  .attr("baseline-shift", "-100%");

  legendTexts.merge(legendTextsEnter)
  .attr("x", legendSize + 5)
  .attr("y", function(d, i) {
    return i * legendSize + i * 10;
  })
  .text(function(d) {
    return d;
  });
    var stops = d3.range(0, 1.25, 0.25);
    console.log(stops);

    svg.select("#colorGradient").selectAll("stop")
      .data(stops).enter()
      .append("stop")
      .attr("offset", function(d) {
        return d * 100 + "%";
      })
      .attr("stop-color", function(d) {
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

    if (data.length === dataMax) clearInterval(myInterval);

    var barHeight = d3.scaleLinear()
      .domain([0, maximum])
      .range([0, chartHeight]);

    var y = d3.scaleLinear()
      .domain([0, maximum])
      .range([margin.top + chartHeight, margin.top]);



    var yAxis = d3.axisLeft(y);
    svg.select("#y")
      .attr("transform", "translate(" + margin.left + ",0)")
      .transition().duration(frequency / 2)
      .call(yAxis);


    var xAxis = d3.axisBottom(x)
      .tickFormat(function(d) {
        var tickData = data[d - 1];
        if (tickData) {
          var now = new Date();
          var msAgo = now - tickData.timestamp;
          var secAgo = Math.round(msAgo / 1000);
          // var time = tickData.timestamp;
          if (secAgo === 0) {
            return "Now"
          }
          // else if(secAgo === 1){
          //   return secAgo + " second ago"
          // }
          else {
            //Single if expression
            //word is variable
            //if secondsAgo is truthy 1 -> second
            //if false -> seconds
            var word = secAgo === 1 ? "second" : "seconds";
            return secAgo + " " + word + " ago";
          }

        } else {
          return "";
        }
        console.log(d, tickData)
        // return d;
      });
    svg.select("#x")
      .attr("transform", "translate(0," + (margin.top + chartHeight) + ")")
      .call(xAxis);

    function zeroState(selection) {
      selection
        .attr("height", 0)
        // .attr("y", y(0))
        .attr("y", function(d) {
          return d.users;
        });
    }

    var bars = svg.select("#shapes").selectAll(".bar")
      .data(data, function(d) {
        return d.timestamp;
      });

    var enter = bars.enter().append("rect")
      .attr("class", "bar")
      .attr("width", barWidth)
      .attr("fill", function(d) {
        return barColor(d.users);
      })
      .attr("stroke", "purple")
      .call(zeroState)


      //Replace zero state
      // .attr("height", 0)
      // .attr("y", y(0))
      // .attr("y", margin.top + chartHeight)
      .attr("x", function(d, i) {
        return x(i + 1);
      });

    bars.merge(enter)
      .transition().duration(frequency / 2)
      .attr("fill", function(d) {
        return barColor(d.users);
      })
      .attr("width", barWidth)
      .attr("height", function(d) {
        return barHeight(d.users);
      })
      .attr("y", function(d) {
        // var h = barHeight(d.users);
        // return height - h;
        return y(d.users)
      })
      .attr("x", function(d, i) {
        return x(i + 1);
      });

    bars.exit()
      .transition().duration(frequency / 2)
      .call(zeroState)
      //Replace zero state
      // .attr("height", 0)
      // // .attr("y", height)
      // .attr("y", y(0))
      .remove();

  });

}

fetchData();
var myInterval = setInterval(fetchData, frequency);
// setInterval(fetchData, frequency);
