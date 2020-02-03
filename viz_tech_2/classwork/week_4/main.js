var svg = d3.select("#chart");

var data1 = [
   "Hello Class, my name is Dave",
   "Test Title",
   "Some really long text that we will probably have fun working with."
 ];

 var data2 = [
   "One little string..."
 ];

 var columnWidth = 100;

 function drawBoxes(currentData){
   var boxes = svg.selectAll(".box")
                  .data(currentData);

  boxes.enter().append("rect")
        .attr("class", "box")
        .attr("x", function(d,i){
          return i * columnWidth;
        })
        .attr("y", 0)
        // .attr("fill", "none")
        // .attr("stroke", "red")
        // .attr("stroke-width", "10px")
        .attr("width", columnWidth)
        .attr("height", 500);

      boxes.exit().remove();

      var labels = svg.selectAll(".label")
                      .data(currentData);
                console.log(currentData);
                console.log(labels);
    var fontSize = 20;

      var enterLabels = labels.enter().append("text")
                              .attr("class", "label")
                              // .attr("baseline-shift", "-100%")
                              .attr("x", function(d,i){
                                // console.log(this);
                                // console.log(currentData);
                                console.log(i * columnWidth);
                                return i * columnWidth;
                              })
                              .attr("font-size", fontSize)
                              .attr("y", 0)
                              // .attr("fill", "none")
                              // .attr("stroke", "red")
                              // .attr("stroke-width", "10px")
                              .attr("width", columnWidth)
                              .attr("height", 500);

                              ///text anchor to center textElement
          //allows us to run custom Jaascript code for each element selected
          labels.merge(enterLabels)
                .each(function(d,i){
                  //Get Full Dom element
                  var textElement = d3.select(this);
                  textElement.text("");
                  // console.log(textElement);
                  console.log(d);
                  var words = d.split(" ")
                  console.log(words);
                  var tspan = textElement.append("tspan")
                  .attr("text-anchor", "middle");

                  var line = 0;
                  words.forEach(function(word){
                    // tspan.text(word);
                    var sent = tspan.text();
                    tspan.text(sent + " " + word);
                    var domElement = tspan.node();
                    var tspanWidth = domElement.getBoundingClientRect().width;
                    // console.log(domElement);
                    // console.log(tspanWidth);

                    if(tspanWidth > columnWidth){
                      line++;

                      tspan.text(sent);
                      tspan = textElement.append("tspan")
                                .attr("y", fontSize * line)
                                .attr("x", columnWidth * i)
                                .text(word);
                    }
                    // var lineWidth = tspan.node().getBoundingClientRect().width;
                    //
                    // if(lineWidth > columnWidth){
                    //   tspan.text(text);
                    //   tspan = textElement.append("tspan")
                    //                     .text(word);
                    // }
                  })
                });
          labels.exit().remove();
 }
drawBoxes(data1);

// var data2 =["One little string is " + users];
//
// // console.log(data2);
// // console.log(users);
// var labels = svg.selectAll(".label")
//                 .data(data2);
//
// var fontSize = 20;
//   // console.log(labels);
// var enterLabels = bars.enter().append("text")
//                     .attr("class", "label")
//                     .attr("width", barWidth-5)
//                     .attr("height", 0)
//                     .attr("transform", "translate(30," + 0 + ")")
//                     .attr("y", height)
//                     .attr("x", function(d, i) {
//                       // console.log("Bar Location:"+ x(i+1))
//                       // return x(i + 1);
//                       return i * barWidth;
//                     });
//
//   labels.merge(enterBars)
//         .transition().duration(frequency/2)
//         .each(function(d,i){
//           // console.log(d)
//           var textElement = d3.select(this)
//           textElement.text("");
//
//           var words = d.toString().split(" ");
//           console.log(words);
//
//           var tspan = textElement.append("tspan")
//           .attr("text-anchor", "middle");
//
//           var line = 0;
//
//           words.forEach(function(word){
//             var sent = tspan.text();
//             tspan.text(sent + " " + word);
//             var domElement = tspan.node();
//             var tspanWidth = domElement.getBoundingClientRect().width;
//
//             if(tspanWidth > barWidth){
//               line++;
//
//               tspan.text(sent);
//               tspan = textElement.append("tspan")
//                         .attr("y", function(){
//                           var h = barHeight(users);
//
//                           return (height -h ) +(fontSize * line) - 20;
//
//                         })
//                         // .attr("y", function(){
//                         //                     // console.log(barHeight(d.users));
//                         //     var h = barHeight(d.users);
//                         //     return (height-h) * line;
//                         //   })
//                         // .attr("y", function(){
//                         //     // console.log(barHeight(d.users));
//                         //     var h = barHeight(d.users);
//                         //     return (height-h) * line;
//                         //   })
//                         .attr("x", function(d, i) {
//                           // return x(i +1);
//                           return x(i + 1);
//
//                           // return i * barWidth;
//                         })
//                         .text(word);
//             }
//           })
//         });
//         labels.exit().remove();
