var width = d3.select('#graph').node().offsetWidth;
var height =  d3.select('#graph').node().offsetHeight;

// height = 500;
var margin = {
  top: 20,
  right: 20,
  bottom: 50,
  left: 100
};

// var chartWidth = width - margin.left - margin.right;
// var chartHeight = height - margin.top - margin.bottom;
var icon = {
    "school": "./assets/school.png"
}

var svg = d3.select("#graph")
  .append('svg')
  .attr("width", width)
  .attr("height", height);

var radius = 8;
var forceStrength = 0.3;

var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

d3.queue()
  .defer(d3.csv, "./data/clothes_perc.csv")
  .defer(d3.csv, "./data/words_perc.csv")
  .defer(d3.csv, "./data/schools.csv")
  .await(function(error, data_clothes, data_words, data_schools) {
    console.log(data_schools);



    function canvas_clear() {

      svg
        .selectAll("*")
        .remove();
    }

    function sec_1() {
      console.log("section 1")
      canvas_clear();

      data_schools.forEach(function(d) {
        d.r = radius;
        d.x = width / 2;
        d.y = height / 2;
      })

      // console.log(data_schools);

      var simulation = d3.forceSimulation()
        .force("collide", d3.forceCollide(function(d) {
          return d.r + 6;
        }).iterations(16))
        .force("charge", d3.forceManyBody())
        .force("y", d3.forceY().y(height / 2))
        .force("x", d3.forceX().x(width / 2));

      var circles =  svg
                    // .selectAll("image")
                    .selectAll("circle")
                    .data(data_schools);

        // var circlesEnter = circles
        // .enter()
        //           .append("image")
        //           .data(data_schools)
        //
        //          // .attr("r", function(d, i){ return d.r + 4; })
        //           .attr("x", function(d, i){ return 175 + 25 * i + 2 * i ** 2; })
        //           .attr("y", function(d, i){ return 250; })
        //           .attr("xlink:href",  function(d) { return icon.school;})
        //           .attr("height", 20)
        //           .attr("width", 20)
        //           .attr("fill", function(d, i) {
        //               return "#000";
        //             })
        //             .style("stroke", function(d, i) {
        //               return "#000";
        //             })
        //             .on("mouseover, mousemove", function(d){
        //
        //               d3.select(this)
        //              .transition()
        //                .duration(550)
        //              .attr("height", 30)
        //              .attr("width", 30);
        //             })
        //             .on("mouseout", function(d){
        //               d3.select(this).transition()
        //               .duration(550)
        //               .attr("height", 20)
        //               .attr("width", 20);
        //             });


      var circlesEnter = circles.enter().append("circle")
      .attr("r", function(d, i) {
          return d.r;
      })
      .attr("cx", function(d, i) {
          return 175 + 25 * i + 2 * i ** 2;
      })
      .attr("cy", function(d, i) {
          return 250;
      })
      .style("fill", function(d, i) {
          return "#000";
      })
      .style("stroke", function(d, i) {
          return "#000";
      })
      .on("mouseover, mousemove", function(d) {

          d3.select(this)
              .transition()
              .duration(550)
              .style("fill", function(d, i) {
                  return "red";
              })
              .attr("r", 15);
              console.log(d.schoolName);
              div.transition()
                .duration(200)
                .style("opacity", .9);
            div	.html("<b>" + "School: "+ "</b>"+ d.schoolName + "<br/>"
            + "<b>Students: </b>"+ d.totalStudents)
            .style("font-size", "14px")
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
          d3.select(this).transition()
              .duration(550)
              .style("fill", function(d, i) {
                  return "#000";
              })
              .attr("r", 8);

              div.transition()
        .duration(500)
        .style("opacity", 0);
      });

      circles = circles.merge(circlesEnter);


      function ticked() {
        //console.log("tick")
        //console.log(data.map(function(d){ return d.x; }));
        // circles
        //   .attr("x", function(d) {
        //     return d.x = Math.max(d.r, Math.min(width - d.r, d.x));
        //
        //   })
        //   .attr("y", function(d) {
        //     return d.y = Math.max(d.r, Math.min(height - d.r, d.y));
        //   });
        circles
          .attr("cx", function(d) {
            return d.x = Math.max(d.r, Math.min(width - d.r, d.x));

          })
          .attr("cy", function(d) {
            return d.y = Math.max(d.r, Math.min(height - d.r, d.y));
          });
      }

      simulation
        .nodes(data_schools)
        .on("tick", ticked);

      function groupBubbles() {
        // hideTitles();

        // @v4 Reset the 'x' force to draw the bubbles to the center.
        simulation
          .force('x', d3.forceX().strength(forceStrength).x(width / 2))
          .force('y', d3.forceY()
            .strength(forceStrength)
            .y(height / 2));
        // @v4 We can reset the alpha value and restart the simulation
        simulation.alpha(1).restart();
      }

      groupBubbles();


    }

    function sec_2() { //who's won more
      canvas_clear();

      console.log("section 2")
//       console.log(data_clothes);
//       var num = 20;
//
// returns random int between 0 and num
function getRandomInt() {return Math.floor(Math.random() * (num));}

// nodes returns a [list] of {id: 1, fixed:true}
var nodes = d3.range(num).map(function(d) { return {id: d}; });
console.log(nodes);


    }

    function sec_3() {
      canvas_clear();

      console.log("section 3")

    }

    function sec_4() {
      canvas_clear();

      console.log("section 4")


    }

    function sec_5() {

      canvas_clear();

      console.log("section 5")


    }



    var gs = d3.graphScroll()
      .container(d3.select('#container'))
      .graph(d3.selectAll('#graph'))
      .sections(d3.selectAll('#sections > div'))
      // .offset(innerWidth < 900 ? innerHeight - 30 : 200)
      .eventId('uniqueId1')
      .on('active', function(i) {



        [
          sec_1,
          sec_2,
          sec_3,
          sec_4,
          sec_5
        ][i]();

      });




  });


// var oldWidth = 0
// function render(){
//
//   if (oldWidth == innerWidth) return
//   oldWidth = innerWidth
//
//   var width = d3.select('#graph').node().offsetWidth,
//       height = innerWidth > 925 ? width : innerHeight * 0.9
//       ;
//       //,
//       //this sets the graph on mobile at a 7th of the height, while on desktop it'll be a square
//
// var svg = d3
//             .select('#graph')
//             .html('')
//             .append('svg')
//             .attrs({width: width, height: height})
//             ;
//
// function canvas_clear(){
//
// svg
//     .selectAll("*")
//     .remove();
// }
//
//
//
// function sec_1(){
//
//       canvas_clear();
//
//     console.log("part 1 of final project");
//
//
// }
//
// function sec_2(){
//
//       canvas_clear();
//       console.log("part 2 of final project");
//
//
//
// }
//
// function sec_3(){    //how has dominance changed over the decades
//
//       canvas_clear();
//
//       console.log("part 3 of final project");
//
//
// }
//
//
// function sec_4(){   //where have they played each other?
//
//       canvas_clear();
//
//       console.log("part 4 of final project");
//
//
// }
//
//
//
// function sec_5(){
//
//       canvas_clear();
//
//       console.log("part 5 of final project");
//
//
// }
//
//
// function sec_6(){    //categorising or 'binning' the victory margins
//                       //find how close Ind-Pak matches have been
//
//
//       canvas_clear();
//
//       console.log("part 6 of final project");
//
// }
//
//
//
//   var gs = d3.graphScroll()
//       .container(d3.select('#container'))
//       .graph(d3.selectAll('#graph'))
//       .sections(d3.selectAll('#sections > div'))
//       // .offset(innerWidth < 900 ? innerHeight - 30 : 200)
//       .eventId('uniqueId1')
//       .on('active', function(i){
//
//               [
//                 sec_1,
//                 sec_2,
//                 sec_3,
//                 sec_4,
//                 sec_5
//                        ][i]();
//
// })
//
// //the brace above is completed by the brace appearing before the list of function names
//
// }
// //this is the brace that closes the render function
//
// render()
// d3.select(window).on('resize', render)
