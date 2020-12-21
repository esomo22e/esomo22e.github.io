var margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40
    },
    width = d3.select("#chart").node().getBoundingClientRect().width - margin.left - margin.right ,
    height = d3.select("#chart").node().getBoundingClientRect().height - margin.top - margin.bottom;



var svg = d3.select("#chart").append("svg")
    // .attr("width", width + margin.left + margin.right)
    // .attr("height", height + margin.top + margin.bottom)
    .attr("viewBox", "0 0 " + width + " " + height)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .append("g")
// .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var color = d3.scaleOrdinal()
    // .domain([3301,3302,3303,3304,3305])
    .range(["#2c574d", "#ff692e", '#57006b', "#b01463", "#264876"])


var opacityScale = d3.scaleLinear()
    .domain([0, 400000])
    .range([0, 1])
    // .domain([0, 433333.33, 866666.67, 1300000])
    // .range([0, 0.33, 0.67, 1])


// var strokeScale = d3.scaleLinear()
// .domain([0, 9])
// .range([0,3])

// .range(['#ededed','#57006b'])

// A scale that gives a X target position for each group
var x = d3.scaleOrdinal()
    // .domain([1, 2, 3])
    .range([0, width / 5, 2 * (width / 5), 3 * (width / 5), 4 * (width / 5)])

d3.json("./data/results3.json", function(error, data) {
    // console.log(data);

    var tooltip = d3.select("body")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")

        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")

    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover = function(d) {
        tooltip
            .style("opacity", 1)
    }
    var mousemove = function(d, i) {


        tooltip
            .html('<u>' + d.geo.PUMA + '</u>' + "<br>" + "Race: " + d.couple[0].RACE + '</u>' + "<br>" + "Family Count: " + (d["childrenCount"] + d["coupleCount"]) + '</u>' + "<br>" + "Total Income: " + (d.couple[0].INCTOT + d.couple[1].INCTOT))
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY) + "px")
    }
    var mouseleave = function(d) {
        tooltip
            .style("opacity", 0)
    }

    var node = svg.append("g")
        // .attr("viewBox", "0 0 " + width+ " " + height )
        // .attr("preserveAspectRatio", "xMidYMid meet")
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "node")
        .attr("r", function(d) {
            d["coupleCount"]
            return d["childrenCount"] + d["coupleCount"];
        })
        .attr("cx", width / 2)
        .attr("cy", height / 2)
        .style("fill", function(d) {
            return color(d.geo.PUMA);
            // if(d.geo.PUMA == "3303"){
            //   return color(d.geo.PUMA);
            // }
            // else if(d.geo.PUMA == "3302"){
            //   // return "Back Bay, Beacon Hill, Charlestown, East Boston, Central & South End";
            //
            //    }
            //    else if(d.geo.PUMA == "3301"){
            //      // return "Allston, Brighton & Fenway";
            //
            //       }
            //       else if(d.geo.PUMA == "3304"){
            //         // return "Mattapan & Roxbury";
            //
            //          }
            //          else if(d.geo.PUMA == "3305"){
            //              // return "Hyde Park, Jamaica Plain, Roslindale & West Roxbury";
            //             }

        })
        .style("fill-opacity", function(d, i) {
            // console.log(d.couple[0].INCTOT + d.couple[1].INCTOT);
            if(d.couple[0].INCTOT + d.couple[1].INCTOT > 400000){
                return 1.0;
            }
            else{
                return opacityScale(d.couple[0].INCTOT + d.couple[1].INCTOT);

            }
        })
        .attr("stroke", "#69a2b2")
        .style("stroke-width", 1)
        .on("mouseover", mouseover) // What to do when hovered
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave);


    var text = svg.selectAll("text")
        .attr("class", "labels")
        .data(data.filter(function(d,i) {

            return i==0 || i == 1 || i == 4 || i == 7 || i == 8;
        }))        .enter()
        .append("text")
    //Add SVG Text Element Attributes
    var textLabels = text
        .attr("x", function(d, i) {
            return x(d.geo.PUMA) + 100;
        })
        .attr("y", function(d) {
            return 50;
        })
        // .select("p")
        .text(function(d, i) {
            return d.geo.PUMA;
        })
        // .attr("font-family", "sans-serif")
        .attr("font-size", "30px");


    // .attr("fill", "black");
    var text2 = svg.selectAll("text2")
        .attr("class", "labels2")
        .data(data.filter(function(d,i) {

            return i==0 || i == 1 || i == 4 || i == 7 || i == 8;
        }))
        .enter()
        .append("text")

    var textLabels2 = text2
        .attr("x", function(d, i) {
            return x(d.geo.PUMA);
        })
        .attr("y", function(d) {
            return 90;
        })
        // .select("p")
        .text(function(d,i) {
            if (d.geo.PUMA == "3303") {
                return "Dorchester & South Boston";
            } else if (d.geo.PUMA == "3302") {
                return "Back Bay, Beacon Hill, Charlestown, East Boston, Central & South End";

            } else if (d.geo.PUMA == "3301") {
                return "Allston, Brighton & Fenway";

            } else if (d.geo.PUMA == "3304") {
                return "Mattapan & Roxbury";

            } else if (d.geo.PUMA == "3305") {
                return "Hyde Park, Jamaica Plain, Roslindale & West Roxbury";
            }
        })
        .attr("font-size", "15px")
              .each(wrap);

    // textLabels.exit().remove();
    function test(d){
        return x(d.geo.PUMA)/5;
    }
    function wrap(d,i) {
        // console.log(i);
         var text = d3.select(this),
           width =200,
           x = (i * (width * 1.4)),
           y = text2.attr("y"),
           words = text.text().split(/\s+/).reverse(),
           word,
           line = [],
           lineNumber = 0,
           lineHeight = 1.1,
           tspan = text.text(null).append("tspan").attr("x", x).attr("y", y);
         while (word = words.pop()) {
           line.push(word);
           tspan.text(line.join(" "));
           if (tspan.node().getComputedTextLength() > width) {
             line.pop();
             tspan.text(line.join(" "));
             line = [word];
             tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + "em").text(word);
             // console.log(width);
           }
         }
     }
     // filter(function(d,i) { return !(i%5); })
//      var legendData = data.map(function(d){
//        return (d.couple[0].INCTOT + d.couple[1].INCTOT);
//      });
//
//      legendData = legendData.filter(function(d,i){
//        return legendData.indexOf(d) === i;
//      });
//
//      legendData = legendData.sort(function(a, b) {
//        return a - b;
//      });
//
//      console.log(legendData);
//
//
//
//      var maximum = d3.max(data, function(d) {
//        // return (d.couple[0].INCTOT + d.couple[1].INCTOT);
//        return 400000;
//      });
//
//      var barColor = d3.scaleSequential(d3.interpolateCubehelixDefault)
//        .domain([0, 400000]);
//      // var barColor = d3.scaleL
//
//      var legendRects = legend.selectAll("rect")
//                         .data(legendData);
//
//   console.log(legendData);
// var legendRectsEnter = legendRects.enter().append("rect");
//
//
// legendRects.merge(legendRectsEnter)
//            .attr("x", 0)
//            .attr("y", function(d,i){
//              return i * legendSize + i * 10;
//            })
//            .attr("fill", barColor)
//           .attr("width", legendSize)
//           .attr("height", legendSize);
//
//           var legendTexts = legend.selectAll("text")
//             .data(legendData);
//
//             var legendTextsEnter = legendTexts.enter().append("text")
//             .attr("baseline-shift", "-100%");
//
//             legendTexts.merge(legendTextsEnter)
//             .attr("x", legendSize + 5)
//             .attr("y", function(d, i) {
//               return i * legendSize + i * 10;
//             })
//             .text(function(d) {
//               return d;
//             });
//               var stops = d3.range(0, 1.25, 0.25);
//               console.log(stops);
//
//               svg.select("#colorGradient").selectAll("stop")
//                 .data(stops).enter()
//                 .append("stop")
//                 .attr("offset", function(d) {
//                   return d * 100 + "%";
//                 })
//                 .attr("stop-color", function(d) {
//                   return barColor(d * maximum);
//                 });
//
//
//               var gradiantScale = d3.scaleLinear()
//                 .domain([0, maximum])
//                 .range([0, scaleWidth]);
//
//               var scaleAxis = d3.axisBottom(gradiantScale);

    // Features of the forces applied to the nodes:
    var simulation = d3.forceSimulation()
        .force("x", d3.forceX().strength(0.5).x(function(d) {
            return x(d.geo.PUMA)
        }))
        .force("y", d3.forceY().strength(0.1).y(height / 2))
        .force("center", d3.forceCenter().x(width / 2).y(height / 2)) // Attraction to the center of the svg area
        .force("charge", d3.forceManyBody().strength(0)) // Nodes are attracted one each other of value is > 0
        .force("collide", d3.forceCollide().strength(.01).radius(20).iterations(1)) // Force that avoids circle overlapping

    // Apply these forces to the nodes and update their positions.
    // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
    simulation
        .nodes(data)
        .on("tick", function(d) {
            node
                .attr("cx", function(d) {
                    return d.x;
                })
                .attr("cy", function(d) {
                    return d.y;
                })
        });



});
