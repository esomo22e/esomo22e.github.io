var realtimeURL = "https://whiteboard.datawheel.us/api/google-analytics/realtime/random";
var frequency = 2* 1000; // 10 seconds
var dataMax = 10;
var data = [];

var margin = {
  top: 20,
  right: 20,
  bottom: 70,
  left: 40
};

var width = window.innerWidth - margin.left - margin.right;
var height = (window.innerHeight/1.15) - margin.top - margin.bottom;

var svg = d3.select("#chart")
  .attr("width", width + 100)
  .attr("height", height + 100);

var barWidth = width / dataMax;

var x = d3.scaleLinear()
  .domain([dataMax, 1])
  .range([0, width-barWidth]);

  // var data1 = [
  //    "Hello Class, my name is Dave",
  //    "Test Title",
  //    "Some really long text that we will probably have fun working with."
  //  ];


function fetchData() {
  d3.json(realtimeURL, function(error, users) {

    var dataObject = {
      users: users,
      timestamp: new Date()
    };

    data.unshift(dataObject);

    if (data.length > dataMax) data.pop();
    // console.log(data);

    var maximum = d3.max(data, function(d) {
      return d.users;
    });

    var y = d3.scaleLinear()
      .domain([0, maximum])
      .range([height, 0]);

    var yAxis = d3.axisLeft(y);

    svg
      .append("g")
      .attr("class", "y_axis")
      .attr("transform", "translate(30,0)"); // This controls the vertical position of the Axis
    // .call(yAxis);

    svg.select('.y_axis')
      .transition()
      .duration(frequency / 2)
      .call(yAxis);

    //Get Bar Height
    var barHeight = d3.scaleLinear()
      .domain([0, maximum])
      .range([0, height]);

    // var colors = color = d3.scaleOrdinal(d3.schemeCategory20);;

    var bars = svg.selectAll(".bar")
      .data(data, function(d) {
        return d.timestamp;
      });

    //Enter Bars
    var enterBars = bars.enter().append("rect")
      .attr("class", "bar")
      .attr("width", barWidth-5)
      .attr("height", 0)
      .attr("transform", "translate(30," + 0 + ")")
      .attr("y", height)
      .attr("x", function(d, i) {
        // console.log("Bar Location:"+ x(i+1))
        return x(i + 1);
      });

    // console.log(barWidth);
    bars.merge(enterBars)
      // .transition().duration(frequency/2)
      .attr("width", barWidth-5)
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


    bars.exit()
    // .transition().duration(frequency/2)
     // .attr("height", 0)
     // .attr("y", height)
    .remove();


    var labels = svg.selectAll(".labels")
      .data(data,function(d) {
        return d.timestamp;
      });

      var fontSize = 20;


      var enterLabels = labels.enter().append("text")
        .attr("class", "labels")
        .attr("width", barWidth-5)
        // .attr("height", height)
        .attr("height", function(d){
          var h = barHeight(d.users);
          return 0;
        })
        .attr("transform", "translate(30," + 0 + ")")
        .attr("font-size", fontSize)
        .attr("baseline-shift", "-100%")
        .attr("y", function(d){
          var h = barHeight(d.users);
          return (height - h) + fontSize;
        })
        .attr("x", function(d, i) {
          // console.log("Bar Location:"+ x(i+1))
          return x(i + 1);
          // return i * barWidth;
        });

      labels.merge(enterLabels)
          // .transition().duration(frequency/2)
                  .each(function(d,i){
                    // console.log(d)
                    var textElement = d3.select(this);
                    console.log(this);
                    textElement.text("");

                    var sentUsers =  d.users + " users are using DATA USA today!!!";
                    var words = sentUsers.split(" ");


                    var tspan = textElement.append("tspan")
                      .attr("y", function(){
                        var h = barHeight(d.users);

                        return(height -h ) +(fontSize * line);

                      })
                      .attr("x", function() {

                        return x(i+1);

                        // return i * barWidth;
                      });

                    var line = 0;

                    words.forEach(function(word){
                      var sent = tspan.text();
                      // console.log(sent);
                      tspan.text(sent + " " + word);
                      var domElement = tspan.node();
                    console.log(domElement);
                      var tspanWidth = domElement.getBoundingClientRect().width;
                      // console.log(sent);
                      // console.log(word);
                      if(tspanWidth > barWidth){
                        console.log(barWidth);
                        console.log(tspanWidth);
                        line++;

                        tspan.text(sent);
                        tspan = textElement.append("tspan")
                                  .attr("y", function(){
                                    var h = barHeight(d.users);

                                    return (height -h ) +(fontSize * line);

                                  })
                                  .attr("x", function() {
                                    // console.log(i);
                                    // console.log("X LABEL:" +(barWidth- x(i+1)));

                                    return x(i+1) + (barWidth/4);

                                    // return i * barWidth;
                                  })
                                  .text(word);
                                  // console.log(word);
                      }
                    })
                  });

                  labels.exit().remove();
    ///////////Text////////////


  });





}
fetchData();
setInterval(fetchData, frequency);
