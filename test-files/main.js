// using d3 for convenience
var main = d3.select('main')
var scrolly = main.select('#scrolly');
var figure = scrolly.select('figure');
var article = scrolly.select('article');
var step = article.selectAll('.step');

var width = 200;
var height = 300;
var margin = { top: 40, bottom: 40, left: 70, right: 40 };


var radius = 25;
var color = d3.scaleOrdinal(d3.schemeCategory20);
var centerScale = d3.scalePoint().padding(1).range([0, width]);
var forceStrength = 0.05;


var svg = scrolly.select('figure')
.append("svg")
.attr("class", "container")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)

var simulation = d3.forceSimulation()
        .force("center",d3.forceCollide( function(d){
            return d.r + 8 })
        )
        .force("charge", d3.forceManyBody().strength(5))
        .force("y", d3.forceY().y(height / 2).strength(0.1))
        .force("x", d3.forceX().x(width / 2).strength(0.1))


d3.queue()
.defer(d3.csv, "./datasets/bachelor2.csv")
.await(function(error, data) {

    function canvas_clear() {

        svg
            .selectAll("*")
            .remove();
        // svg.selectAll(".circle")
        //   .remove()

    }

    data.forEach(function(d){
      d.r = radius;
      d.x = width / 2;
      d.y = height  / 2;
    })

    var circles = svg.selectAll("circle")
      .data(data, function(d){ return d.ID ;});

    function dragstarted(d,i) {
      //console.log("dragstarted " + i)
      if (!d3.event.active) simulation.alpha(1).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d,i) {
      //console.log("dragged " + i)
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragended(d,i) {
      //console.log("dragended " + i)
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
      var me = d3.select(this)
      console.log(me.classed("selected"))
      me.classed("selected", !me.classed("selected"))

      // d3.selectAll("circle")
      //   .style("fill", function(d, i){ return color(d.ID); })
      //
      // d3.selectAll("circle.selected")
      //   .style("fill", "none")

    }

//functions
function sec_0(){

 canvas_clear();

  svg.append("circle")
    .attr("cx", 50)
    .attr("cy", 100)
    .attr("r", 20)
    .attr("fill", "red")
    .attr("id","red")
    .attr("class", "circle")

    var circlesEnter = circles.enter().append("circle")
       .attr("class", "chart1")
         .attr("r", function(d, i){ return d.r; })
         .attr("cx", function(d, i){ return 175 + 25 * i + 2 * i ** 2; })
         .attr("cy", function(d, i){ return 250; })
         .style("fill", function(d, i){ return color(d.PARTICIPANTS); })
         .style("stroke", function(d, i){ return color(d.PARTICIPANTS); })
         .style("stroke-width", 10)
         .style("pointer-events", "all")
         // .attr("opacity",0)
         .call(d3.drag()
                 .on("start", dragstarted)
                 .on("drag", dragged)
                 .on("end", dragended));

           circles = circles.merge(circlesEnter)

           function ticked() {
             //console.log("tick")
             //console.log(data.map(function(d){ return d.x; }));
             circles
                 .attr("cx", function(d){ return d.x; })
                 .attr("cy", function(d){ return d.y; });
           }

           simulation
                 .nodes(data)
                 .on("tick", ticked);

                 var push_bachelor = {
                   CONTESTANT:{ x: width *3/6, y: height *5/6 },
                   BACHELOR: { x: width *5/6, y: height *0/6}
                   // f: { x: width / 2, y: height / 3 },
                   // m: { x: width / 3, y: 2*height / 3 },
                   // n: { x: 2*width / 3, y: 2*height / 3 }
                 }


                 function splitBubbles(byVar) {
                   //conso.log(byVar);
                     function bubble_position_x(d) {
                         //console.log(d[byVar]);
                         return push_bachelor[d[byVar]].x;
                       }

                     function bubble_position_y(d) {
                         return push_bachelor[d[byVar]].y;
                       }

                       simulation
                     .force('x', d3
                                   .forceX()
                                   .strength(forceStrength)
                                   .x(bubble_position_x)
                                   )
                   .force('y', d3
                                 .forceY()
                                 .strength(forceStrength)
                                 .y(bubble_position_y)
                                 );

                         simulation.alpha(2).restart();


                     }

                     // splitBubbles('PARTICIPANTS');


}

function sec_1(){

  svg.selectAll(".circle")
    .remove()

  svg.append("circle")
    .attr("cx", 100)
    .attr("cy", 100)
    .attr("r", 20)
    .attr("fill", "yellow")
    .attr("id", "yellow")
    .attr("class", "circle")
    .attr("opacity",0)

    var circlesEnter = circles.enter().append("circle")
       .attr("class", "chart1")
         .attr("r", function(d, i){ return d.r; })
         .attr("cx", function(d, i){ return 175 + 25 * i + 2 * i ** 2; })
         .attr("cy", function(d, i){ return 250; })
         .style("fill", function(d, i){ return color(d.PARTICIPANTS); })
         .style("stroke", function(d, i){ return color(d.PARTICIPANTS); })
         .style("stroke-width", 10)
         .style("pointer-events", "all")
         // .attr("opacity",0)
         .call(d3.drag()
                 .on("start", dragstarted)
                 .on("drag", dragged)
                 .on("end", dragended));

           circles = circles.merge(circlesEnter)

           function ticked() {
             //console.log("tick")
             //console.log(data.map(function(d){ return d.x; }));
             circles
                 .attr("cx", function(d){ return d.x; })
                 .attr("cy", function(d){ return d.y; });
           }

           simulation
                 .nodes(data)
                 .on("tick", ticked);

                 var push_bachelor = {
                   CONTESTANT:{ x: width *3/6, y: height *5/6 },
                   BACHELOR: { x: width *5/6, y: height *0/6}
                   // f: { x: width / 2, y: height / 3 },
                   // m: { x: width / 3, y: 2*height / 3 },
                   // n: { x: 2*width / 3, y: 2*height / 3 }
                 }


                 function splitBubbles(byVar) {
                   //conso.log(byVar);
                     function bubble_position_x(d) {
                         //console.log(d[byVar]);
                         return push_bachelor[d[byVar]].x;
                       }

                     function bubble_position_y(d) {
                         return push_bachelor[d[byVar]].y;
                       }

                       simulation
                     .force('x', d3
                                   .forceX()
                                   .strength(forceStrength)
                                   .x(bubble_position_x)
                                   )
                   .force('y', d3
                                 .forceY()
                                 .strength(forceStrength)
                                 .y(bubble_position_y)
                                 );

                         simulation.alpha(2).restart();


                     }

                     // splitBubbles('PARTICIPANTS');

}

function sec_2(){

  svg.append("circle")
    .attr("cx", 150)
    .attr("cy", 100)
    .attr("r", 20)
    .attr("fill", "green")
    .attr("id", "green")
    .attr("class", "circle")
    .attr("opacity",0)

    var circlesEnter = circles.enter().append("circle")
       .attr("class", "chart1")
         .attr("r", function(d, i){ return d.r; })
         .attr("cx", function(d, i){ return 175 + 25 * i + 2 * i ** 2; })
         .attr("cy", function(d, i){ return 250; })
         .style("fill", function(d, i){ return color(d.PARTICIPANTS); })
         .style("stroke", function(d, i){ return color(d.PARTICIPANTS); })
         .style("stroke-width", 10)
         .style("pointer-events", "all")
         // .attr("opacity",0)
         .call(d3.drag()
                 .on("start", dragstarted)
                 .on("drag", dragged)
                 .on("end", dragended));

           circles = circles.merge(circlesEnter)

           function ticked() {
             //console.log("tick")
             //console.log(data.map(function(d){ return d.x; }));
             circles
                 .attr("cx", function(d){ return d.x; })
                 .attr("cy", function(d){ return d.y; });
           }

           simulation
                 .nodes(data)
                 .on("tick", ticked);

                 var push_bachelor = {
                   CONTESTANT:{ x: width *3/6, y: height *5/6 },
                   BACHELOR: { x: width *5/6, y: height *0/6}
                   // f: { x: width / 2, y: height / 3 },
                   // m: { x: width / 3, y: 2*height / 3 },
                   // n: { x: 2*width / 3, y: 2*height / 3 }
                 }


                 function splitBubbles(byVar) {
                   //conso.log(byVar);
                     function bubble_position_x(d) {
                         //console.log(d[byVar]);
                         return push_bachelor[d[byVar]].x;
                       }

                     function bubble_position_y(d) {
                         return push_bachelor[d[byVar]].y;
                       }

                       simulation
                     .force('x', d3
                                   .forceX()
                                   .strength(forceStrength)
                                   .x(bubble_position_x)
                                   )
                   .force('y', d3
                                 .forceY()
                                 .strength(forceStrength)
                                 .y(bubble_position_y)
                                 );

                         simulation.alpha(2).restart();


                     }

                     splitBubbles('PARTICIPANTS');


}

function sec_3(){

  svg.append("circle")
    .attr("cx", 200)
    .attr("cy", 100)
    .attr("r", 20)
    .attr("fill", "blue")
    .attr("id", "blue")
    .attr("class", "circle")
    .attr("opacity",0)


}

sec_0();
sec_1();
sec_2();
sec_3();

function showEvent0(){
  svg.selectAll(".circle").interrupt().attr("opacity", 0);

  svg.selectAll("#red")
  .transition()
  .duration(1000)
  .attr("opacity", 1)
}

function showEvent1(){
  svg.selectAll(".circle").interrupt().attr("opacity", 0);

  svg.selectAll("#yellow")
  .transition()
  .duration(1000)
  .attr("opacity", 1)
}

function showEvent2(){
  svg.selectAll(".circle").interrupt().attr("opacity", 0);

  svg.selectAll("#green")
  .transition()
  .duration(1000)
  .attr("opacity", 1)

}

function showEvent3(){
  svg.selectAll(".circle").interrupt().attr("opacity", 0);

  svg.selectAll("#blue")
    .transition()
    .duration(1000)
    .attr("opacity", 1)

}

// initialize the scrollama
var scroller = scrollama();

var activateFunctions = [];
activateFunctions[0] = sec_0;
activateFunctions[1] = sec_1;
activateFunctions[2] = sec_2;
activateFunctions[3] = sec_3;

		// generic window resize listener event
function handleResize() {
  // 1. update height of step elements
  var stepH = Math.floor(window.innerHeight * 1.75);
  step.style('height', stepH + 'px');

  var figureHeight = window.innerHeight / 2
  var figureMarginTop = (window.innerHeight - figureHeight) / 2

  figure
    .style('height', figureHeight + 'px')
    .style('top', figureMarginTop + 'px');

  // 3. tell scrollama to update new element dimensions
  scroller.resize();
}

// scrollama event handlers
function handleStepEnter(response) {
  console.log(response)
  // response = { element, direction, index }

  // add color to current step only
  step.classed('is-active', function (d, i) {
    return i === response.index;
  })

  // update graphic based on step
  figure.select('p').text(response.index + 1);
  figure.call(activateFunctions[response.index])

}

function setupStickyfill() {
  d3.selectAll('.sticky').each(function () {
    Stickyfill.add(this);
  });
}

function init() {
  setupStickyfill();

  // 1. force a resize on load to ensure proper dimensions are sent to scrollama
  handleResize();

  // 2. setup the scroller passing options
  // 		this will also initialize trigger observations
  // 3. bind scrollama event handlers (this can be chained like below)
  scroller.setup({
    step: '#scrolly article .step',
    offset: 0.33,
    debug: true,
  })
    .onStepEnter(handleStepEnter)

  // setup resize event
  window.addEventListener('resize', handleResize);
}

// kick things off
init();

    })


// // using d3 for convenience
// var main = d3.select('main')
// var scrolly = main.select('#scrolly');
// var figure = scrolly.select('figure');
// var article = scrolly.select('article');
// var step = article.selectAll('.step');
//
// // var width = 200;
// var width =  scrolly.node().getBoundingClientRect().width/2;
// var height = 300;
// var margin = { top: 40, bottom: 40, left: 70, right: 40 };
//
// var radius = 25;
// var color = d3.scaleOrdinal(d3.schemeCategory20);
// var centerScale = d3.scalePoint().padding(1).range([0, width]);
// var forceStrength = 0.05;
//
// var svg = scrolly.select('figure')
// .append("svg")
// .attr("class", "container")
// .attr("width", width + margin.left + margin.right)
// .attr("height", height + margin.top + margin.bottom)
//
// var simulation = d3.forceSimulation()
//         .force("center",d3.forceCollide( function(d){
//             return d.r + 8 })
//         )
//         .force("charge", d3.forceManyBody().strength(5))
//         .force("y", d3.forceY().y(height / 2).strength(0.1))
//         .force("x", d3.forceX().x(width / 2).strength(0.1))
//
//
// d3.queue()
// .defer(d3.csv, "./datasets/bachelor2.csv")
// .await(function(error, data) {
//
//   console.log(data);
//
//   function canvas_clear() {
//
//       // svg
//       //     .selectAll("*")
//       //     .remove();
//       svg.selectAll(".circle")
//         .remove()
//
//   }
//
//   data.forEach(function(d){
//     d.r = radius;
//     d.x = width / 2;
//     d.y = height  / 2;
//   })
//
//   var circles = svg.selectAll("circle")
//     .data(data, function(d){ return d.ID ;});
//
//   function dragstarted(d,i) {
//     //console.log("dragstarted " + i)
//     if (!d3.event.active) simulation.alpha(1).restart();
//     d.fx = d.x;
//     d.fy = d.y;
//   }
//
//   function dragged(d,i) {
//     //console.log("dragged " + i)
//     d.fx = d3.event.x;
//     d.fy = d3.event.y;
//   }
//
//   function dragended(d,i) {
//     //console.log("dragended " + i)
//     if (!d3.event.active) simulation.alphaTarget(0);
//     d.fx = null;
//     d.fy = null;
//     var me = d3.select(this)
//     console.log(me.classed("selected"))
//     me.classed("selected", !me.classed("selected"))
//
//     // d3.selectAll("circle")
//     //   .style("fill", function(d, i){ return color(d.ID); })
//     //
//     // d3.selectAll("circle.selected")
//     //   .style("fill", "none")
//
//   }
//   // sec_0();
//
// function sec_0(){
//
//   svg.selectAll(".circle")
//     .remove()
//
//   svg.append("circle")
//     .attr("cx", 50)
//     .attr("cy", 100)
//     .attr("r", 20)
//     .attr("fill", "red")
//     .attr("id","red")
//     .attr("class", "circle")
//
//
//
//     var circlesEnter = circles.enter().append("circle")
//     .attr("class", "chart1")
//       .attr("r", function(d, i){ return d.r; })
//       .attr("cx", function(d, i){ return 175 + 25 * i + 2 * i ** 2; })
//       .attr("cy", function(d, i){ return 250; })
//       .style("fill", function(d, i){ return color(d.PARTICIPANTS); })
//       .style("stroke", function(d, i){ return color(d.PARTICIPANTS); })
//       .style("stroke-width", 10)
//       .style("pointer-events", "all")
//       // .attr("opacity",0)
//       .call(d3.drag()
//               .on("start", dragstarted)
//               .on("drag", dragged)
//               .on("end", dragended));
//
//         circles = circles.merge(circlesEnter)
//
//         function ticked() {
//           //console.log("tick")
//           //console.log(data.map(function(d){ return d.x; }));
//           circles
//               .attr("cx", function(d){ return d.x; })
//               .attr("cy", function(d){ return d.y; });
//         }
//
//         simulation
//               .nodes(data)
//               .on("tick", ticked);
//
//               var push_bachelor = {
//                 CONTESTANT:{ x: width *3/6, y: height *5/6 },
//                 BACHELOR: { x: width *5/6, y: height *0/6}
//                 // f: { x: width / 2, y: height / 3 },
//                 // m: { x: width / 3, y: 2*height / 3 },
//                 // n: { x: 2*width / 3, y: 2*height / 3 }
//               }
//
//
//               function splitBubbles(byVar) {
//                 //conso.log(byVar);
//                   function bubble_position_x(d) {
//                       //console.log(d[byVar]);
//                       return push_bachelor[d[byVar]].x;
//                     }
//
//                   function bubble_position_y(d) {
//                       return push_bachelor[d[byVar]].y;
//                     }
//
//                     simulation
//                   .force('x', d3
//                                 .forceX()
//                                 .strength(forceStrength)
//                                 .x(bubble_position_x)
//                                 )
//                 .force('y', d3
//                               .forceY()
//                               .strength(forceStrength)
//                               .y(bubble_position_y)
//                               );
//
//                       simulation.alpha(2).restart();
//
//
//                   }
//
//                   splitBubbles('PARTICIPANTS');
//
//
// }
//
// function sec_1(){
//
//   // canvas_clear();
//   // canvas_clear();
//
//
//   svg.append("circle")
//     .attr("cx", 100)
//     .attr("cy", 100)
//     .attr("r", 20)
//     .attr("fill", "yellow")
//     .attr("id", "yellow")
//     .attr("class", "circle")
//     .attr("opacity",0)
//
// }
// function sec_2(){
//
//   svg.append("circle")
//     .attr("cx", 150)
//     .attr("cy", 100)
//     .attr("r", 20)
//     .attr("fill", "green")
//     .attr("id", "green")
//     .attr("class", "circle")
//     .attr("opacity",0)
//
// }
//
// function sec_3(){
//
//   svg.append("circle")
//     .attr("cx", 200)
//     .attr("cy", 100)
//     .attr("r", 20)
//     .attr("fill", "blue")
//     .attr("id", "blue")
//     .attr("class", "circle")
//     .attr("opacity",1)
//
//
// }
//
// sec_0();
// sec_1();
// sec_2();
// sec_3();
//
// function showEvent0(){
//   svg.selectAll(".circle").interrupt().attr("opacity", 0);
//
//   svg.selectAll("#red")
//    .transition()
//    .duration(1000)
//    .attr("opacity", 1)
//
//   // svg.selectAll(".chart1")
//   // .transition()
//   // .duration(1000)
//   // .attr("opacity", 1)
//   // .attr("cy", 500)
//
// }
//
// function showEvent1(){
//   svg.selectAll(".circle").interrupt().attr("opacity", 0);
//
//   svg.selectAll("#yellow")
//   .transition()
//   .duration(1000)
//   .attr("opacity", 1)
// }
//
// function showEvent2(){
//   svg.selectAll(".circle").interrupt().attr("opacity", 0);
//
//   svg.selectAll("#green")
//   .transition()
//   .duration(1000)
//   .attr("opacity", 1)
// 	    .attr("cy", 0)
//
// }
//
// function showEvent3(){
//   svg.selectAll(".circle").interrupt().attr("opacity", 0);
//
//   svg.selectAll("#blue")
//     .transition()
//     .duration(1000)
//     .attr("opacity", 1)
//     .attr("cy", 500)
//
//
// }
//
// // initialize the scrollama
// var scroller = scrollama();
//
// var activateFunctions = [];
// activateFunctions[0] = showEvent0;
// activateFunctions[1] = showEvent1;
// activateFunctions[2] = showEvent2;
// activateFunctions[3] = showEvent3;
//
// 		// generic window resize listener event
// function handleResize() {
//   // 1. update height of step elements
//   var stepH = Math.floor(window.innerHeight * 1.75);
//   step.style('height', stepH + 'px');
//
//   var figureHeight = window.innerHeight / 2
//   var figureMarginTop = (window.innerHeight - figureHeight) / 2
//
//   figure
//     .style('height', figureHeight + 'px')
//     .style('top', figureMarginTop + 'px');
//
//   // 3. tell scrollama to update new element dimensions
//   scroller.resize();
// }
//
// // scrollama event handlers
// function handleStepEnter(response) {
//   console.log(response)
//   // response = { element, direction, index }
//
//   // add color to current step only
//   step.classed('is-active', function (d, i) {
//     return i === response.index;
//   })
//
//   // update graphic based on step
//   figure.select('p').text(response.index + 1);
//   figure.call(activateFunctions[response.index])
//
// }
//
// function setupStickyfill() {
//   d3.selectAll('.sticky').each(function () {
//     Stickyfill.add(this);
//   });
// }
//
// function init() {
//   setupStickyfill();
//
//   // 1. force a resize on load to ensure proper dimensions are sent to scrollama
//   handleResize();
//
//   // 2. setup the scroller passing options
//   // 		this will also initialize trigger observations
//   // 3. bind scrollama event handlers (this can be chained like below)
//   scroller.setup({
//     step: '#scrolly article .step',
//     offset: 0.33,
//     debug: true,
//   })
//     .onStepEnter(handleStepEnter)
//
//   // setup resize event
//   window.addEventListener('resize', handleResize);
// }
//
// // kick things off
// init();
//     })
