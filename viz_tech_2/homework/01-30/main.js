var realtimeURL = "https://whiteboard.datawheel.us/api/google-analytics/realtime/random";
var frequency = 4 * 1000; // 10 seconds
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


    ///////////Text////////////
    var data2 =["There are " + users + " on DATA USA today!!!!"];

    // console.log(data2);
    // console.log(users);
    var labels = svg.selectAll(".label")
                    .data(data2);

    var fontSize = 20;
      // console.log(labels);
    var enterLabels = labels.enter().append("text")
                        .attr("class", "label")
                        .attr("width", barWidth-5)
                        .attr("height", 0)
                        .attr("transform", "translate(30," + 0 + ")")
                        .attr("font-size", fontSize)
                        .attr("y", 0)
                        .attr("x", function(d, i) {
                          // console.log("Bar Location:"+ x(i+1))
                          return x(i + 1);
                          // return i * barWidth;
                        });

      labels.merge(enterBars)
            // .transition().duration(frequency/2)
            .each(function(d,i){
              // console.log(d)
              var textElement = d3.select(this);
              textElement.text(d);

              var words = d.split(" ");
              console.log(words);

              var tspan = textElement.append("tspan")
                .attr("text-anchor", "middle");

              var line = 0;

              words.forEach(function(word){
                var sent = tspan.text();
                // console.log(sent);
                tspan.text(sent + "" + word);
                var domElement = tspan.node();
                var tspanWidth = domElement.getBoundingClientRect().width;

                if(tspanWidth > barWidth){
                  line++;

                  tspan.text(sent);
                  tspan = textElement.append("tspan")
                  .attr("width", barWidth-5)
                  .attr("height", function(d) {
                    return barHeight(d.users);
                  })
                            .attr("y", function(){
                              var h = barHeight(users);

                              return (height -h ) +(fontSize * line) - 20;

                            })
                            .attr("x", function() {
                              // console.log(i);
                              // console.log("X LABEL:" +(barWidth- x(i+1)));

                              return x(i+1);

                              // return i * barWidth;
                            })
                            .text(word);

                            console.log(tspan);
                }
              })
            });
            labels.exit().remove();



  // var enterLabels = labels.enter().append("text")
////////////TEXT NOT WORKING///////////////

// var data2 =["One little string is " + users];
//           var labels = svg.selectAll(".label")
//                           .data(data);
//
//                           // console.log(data);
//         var fontSize = 20;
//
//         var enterLabels = labels.enter().append("text")
//                                 .attr("class", "label")
//                                 .attr("width", barWidth-5)
//                                 .attr("height", 0)
//                                 .attr("transform", "translate(30," + 0 + ")")
//                                 .attr("y",0)
//                                 .attr("font-size", fontSize)
//                                 .attr("x", function(d, i) {
//                                   // return x(i +1);
//                                   return i * barWidth;
//                                 });
//
//           labels.merge(enterLabels)
//           .transition().duration(frequency/2)
//           .each(function(d,i){
//             //Get Full Dom element
//
//             var textElement = d3.select(this);
//             textElement.text("");
//             // console.log(textElement);
//             var sentUsers = "One little string is " + d.users;
//             console.log(sentUsers);
//             var words = sentUsers.split(",");
//             console.log(words);
//             // console.log(users);
//
//             var tspan = textElement.append("tspan")
//                           .attr("text-anchor", "middle");
//
//             var line = 0;
//             // console.log(timeStamp);
//
//             words.forEach(function(word){
//
//               var sent = tspan.text();
//               tspan.text(sent + " " + word);
//
//               var domElement = tspan.node();
//               var tspanWidth = domElement.getBoundingClientRect().width;
//
//
//               if(tspanWidth > barWidth){
//                 console.log("TSPAN WIDTH: " + tspanWidth);
//                 console.log("BAR WIDTH: " + barWidth);
//
//                 line++;
//
//                 tspan.text(sent);
//                 tspan = textElement.append("tspan")
//                           .attr("x", function(){
//                             console.log(i);
//                             return x(i+1);
//                           })
//                           .attr("y", function(){
//                             // console.log(barHeight(d.users));
//                             var h = barHeight(d.users);
//                             return (height -h ) +(fontSize * line) - 20;
//                           })
//                           // .attr("width", barWidth-5)
//                           // .attr("height", 0)
//                           .text(word);
//
//                           // tspan.text(sent);
//                           // tspan = textElement.append("tspan")
//                           //           // .attr("y", fontSize * barHeight(d.users))
//                           //           .attr("x", function(){
//                           //
//                           //             return x(i+1);
//                           //             // return x(i+1) * barWidth;
//                           //           })
//                           //           // .attr("y", fontSize * line)
//                           //           .attr("y", function(){
//                           //             // console.log(barHeight(d.users));
//                           //             var h = barHeight(d.users);
//                           //             return (height-h) * line;
//                           //           })
//                           //           // .attr("dy", line++ + dy +"em")
//                           //           // .attr("width", barWidth * fontSize)
//                           //           // .attr("height", 10)
//                           //           // .attr("x", function(){
//                           //           //   // console.log(d);
//                           //           //   return (barWidth-10) * i;
//                           //           //   // return x(user) * i;
//                           //           // })
//                           //           .text(users);
//               }
//
//
//             })
//
//
//
//           });
//
//           labels.exit().remove();
          // .transition().duration(frequency / 2)


  });





}
fetchData();
setInterval(fetchData, frequency);
