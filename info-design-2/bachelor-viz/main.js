// using d3 for convenience
var main = d3.select('main')
var scrolly = main.select('#scrolly');
var figure = scrolly.select('figure');
var article = scrolly.select('article');
var step = article.selectAll('.step');


var width = scrolly.node().getBoundingClientRect().width;
var height = window.innerHeight;
var margin = {
    top: 20,
    bottom: 40,
    left: 50,
    right: 40,
};

var radius = 25;
var color = d3.scaleOrdinal(d3.schemeCategory20);
var centerScale = d3.scalePoint().padding(1).range([0, width]);
var forceStrength = 0.05;

var svg = scrolly.select("figure")
    .append("svg")
    .attr("class", "chart_container")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

    var simulation = d3.forceSimulation()
            .force("collide",d3.forceCollide( function(d){
                return d.r + 8 }).iterations(16)
            )
            .force("charge", d3.forceManyBody())
            .force("y", d3.forceY().y(height / 2))
            .force("x", d3.forceX().x(width / 2))


d3.csv('bachelor.csv', function(data) {

  data.forEach(function(d){
    d.r = radius;
    d.x = width / 2;
    d.y = height  / 2;
  })

  console.table(data);

  var circles = svg.selectAll("circle")
    .data(data, function(d){ return d.ID ;});

  var circlesEnter = circles.enter().append("circle")
    .attr("r", function(d, i){ return d.r; })
    .attr("cx", function(d, i){ return 175 + 25 * i + 2 * i ** 2; })
    .attr("cy", function(d, i){ return 250; })
    .style("fill", function(d, i){ return color(d.ID); })
    .style("stroke", function(d, i){ return color(d.ID); })
    .style("stroke-width", 10)
    .style("pointer-events", "all")
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

// d3.json('http://huskynunews.wpengine.com/interactive/2020/02/gender-gap_scroll/data/metrics-wos2017-l-1A.json')

        // d3.json('/interactive/2020/02/science-gender-gap/scrolly-graph/data/gender_gap.json')
        //   .then(function(data) {

        // console.log(dataFilter);
        //  console.log(data[0]);
        // console.log(d3.keys(data[0]).filter(function (key) { return key !== "year"; }));

        // console.log(keys);
        // var keys = data.columns.slice(1)
        //create width and height and the margins of the d3 graphic


        var figureHeight = height * 2 / 3;
        var figureMarginTop = (height - figureHeight) * 2 / 3;



        function canvas_clear() {

            svg
                .selectAll("*")
                .remove();

        }



        function sec_1() {
            canvas_clear();
            console.log("section 1");

            // svg
            //     .selectAll("myLayers")
            //     .data(stackedData.reverse())
            //     .enter()
            //     .append("path")
            //     .attr("class", "stackLayers")
            //     .attr("fill", function(d) {
            //         // console.log(color(d.key));
            //         return color(d.key);
            //     })
            //     .attr("stroke", "none")
            //     .attr("transform", "translate(" + margin.left + ",5)")
            //     .attr("d", d3.area()
            //         .x(function(d, i) {
            //
            //             return x(d.data.year);
            //         })
            //         .y0(function(d) {
            //             return y(d[0]);
            //         })
            //         .y1(function(d) {
            //             return y(d[1]);
            //         })
            //     );
            //





        }

        function sec_2() {
            console.log("section 2");

            canvas_clear();
            // svg
            //     .selectAll("myLayers")
            //     .data(stackedData.reverse())
            //     .enter()
            //     .append("path")
            //     .attr("class", "stackLayers")
            //     .attr("fill", function(d) {
            //         // console.log(color(d.key));
            //         return color(d.key);
            //
            //     })
            //     .attr("stroke-width", function(d) {
            //         // console.log(d.key)
            //         if (d.key === "female") {
            //             return 5;
            //         }
            //
            //     })
            //     .attr("stroke", "white")
            //     .attr("transform", "translate(" + margin.left + ",5)")
            //     .attr('opacity', 1)
            //     .transition()
            //     .ease(d3.easeLinear)
            //     .duration(1000)
            //     .attr('opacity', function(d) {
            //         if (d.key === "female") {
            //             return 1;
            //         } else {
            //             return 0.2;
            //
            //         }
            //     })
            //
            //     .attr("d", d3.area()
            //         .x(function(d, i) {
            //
            //             return x(d.data.year);
            //
            //         })
            //         .y0(function(d) {
            //             return y(d[0]);
            //         })
            //         .y1(function(d) {
            //             return y(d[1]);
            //         })
            //     );
            //
            // svg.append("line")
            //     .data(stackedData.reverse())
            //     .attr("class", "stackLayers")
            //     .attr("stroke", "#000")
            //     .attr("stroke-dasharray", "6,6")
            //     .attr("stroke-width", 2)
            //     .attr("x1", function(d) {
            //
            //
            //         // return d.year === 1955;
            //         return x(d[1].data.year) + margin.left;
            //     })
            //     .attr("y1", 0)
            //     .attr("x2", function(d) {
            //         return x(d[1].data.year) + margin.left;
            //     })
            //     .attr("y2", figureHeight);
            //
            //
            //
            // circle
            //     .data(stackedData.reverse())
            //     .enter()
            //     .append("circle")
            //     .attr("id", "dot")
            //     .attr("r", 7)
            //     .attr("stroke", "white")
            //     .attr("class", "stackLayers")
            //     .attr("cx", function(d) {
            //
            //         return x(d[1].data.year) + margin.left;
            //     })
            //     .transition()
            //     .duration(2000)
            //     .attr("cy", function(d) {
            //
            //         return y(d[1].data.female);
            //     });
            //
            //
            // var annotations = [{
            //     type: d3.annotationCalloutCircle,
            //     note: {
            //
            //         title: "1955",
            //         label: "12.3% authors are female."
            //     },
            //     connector: {
            //         end: "arrow" // 'dot' also available
            //     },
            //     //settings for the subject, in this case the circle radius
            //     subject: {
            //         radius: 20
            //     },
            //     x: x(dataFilter[1].year) + margin.left,
            //     y: y(dataFilter[1].female),
            //     dy: -57,
            //     dx: 162
            // }].map(function(d) {
            //     console.log(d);
            //
            //     d.color = "#000";
            //     return d
            // });
            //
            // var makeAnnotations = d3.annotation()
            //     .type(d3.annotationLabel)
            //     .annotations(annotations);
            //
            // svg
            //     .append("g")
            //     .attr("class", "stackLayers")
            //     .attr("id", "annotation-group")
            //     .call(makeAnnotations);


        }

        function sec_3() {
            console.log("section 3");


            canvas_clear();
            // svg
            //     .selectAll("myLayers")
            //     .data(stackedData.reverse())
            //     .enter()
            //     .append("path")
            //     .attr("class", "stackLayers")
            //     .attr("fill", function(d) {
            //         // console.log(color(d.key));
            //         return color(d.key);
            //     })
            //     .attr("stroke-width", function(d) {
            //         // console.log(d.key)
            //         if (d.key === "female") {
            //             return 5;
            //         }
            //
            //
            //     })
            //     .attr("opacity", function(d) {
            //         if (d.key === "female") {
            //             return 1;
            //         } else {
            //             return 0.2;
            //
            //         }
            //     })
            //     .attr("stroke", "white")
            //     .attr("transform", "translate(" + margin.left + ",5)")
            //     .attr("d", d3.area()
            //         .x(function(d, i) {
            //
            //             return x(d.data.year);
            //
            //         })
            //         .y0(function(d) {
            //             return y(d[0]);
            //         })
            //         .y1(function(d) {
            //             return y(d[1]);
            //         })
            //     );
            //
            // // console.log(stackedData)
            //
            // svg.append("line")
            //     .data(stackedData.reverse())
            //     .attr("class", "stackLayers")
            //     .attr("stroke", "#000")
            //     .attr("stroke-dasharray", "6,6")
            //     .attr("stroke-width", 2)
            //     .attr("x1", function(d) {
            //
            //         // console.log(d.length);
            //         // return d.year === 1955;
            //         return x(d[d.length - 2].data.year) + margin.left;
            //     })
            //     .attr("y1", 0)
            //     .attr("x2", function(d) {
            //         return x(d[d.length - 2].data.year) + margin.left;
            //     })
            //     .attr("y2", figureHeight);
            //
            // // svg.selectAll("circle")
            // circle
            //     .data(stackedData.reverse())
            //     .enter()
            //     .append("circle")
            //     .attr("id", "dot")
            //     .attr("r", 7)
            //     .attr("stroke", "white")
            //     .attr("class", "stackLayers")
            //     .attr("cx", function(d) {
            //
            //         return x(d[d.length - 2].data.year) + margin.left;
            //     })
            //     .transition()
            //     .duration(2000)
            //     .attr("cy", function(d) {
            //
            //         return y(d[d.length - 2].data.female) + 5;
            //     });
            //
            // var annotations = [{
            //     type: d3.annotationCalloutCircle,
            //     note: {
            //
            //         title: "2005",
            //         label: "35.4% authors are female."
            //     },
            //     connector: {
            //         end: "arrow" // 'dot' also available
            //     },
            //     //settings for the subject, in this case the circle radius
            //     subject: {
            //         radius: 20
            //     },
            //     x: x(dataFilter[dataFilter.length - 2].year) + margin.left,
            //     y: y(dataFilter[dataFilter.length - 2].female) + 5,
            //     dy: -87,
            //     dx: -180
            // }].map(function(d) {
            //     d.color = "#000";
            //     return d
            // })
            //
            // var makeAnnotations = d3.annotation()
            //     .type(d3.annotationLabel)
            //     .annotations(annotations);
            //
            // svg
            //     .append("g")
            //     .attr("class", "stackLayers")
            //     .attr("id", "annotation-group")
            //     .call(makeAnnotations);
        }

        function sec_4() {
            console.log("section 4");
            canvas_clear();

    //         var initialarea = d3.area()
    //           .x(function(d) { return x(d.data.year); })
    //           .y0(figureHeight + 5)
    //           .y1(figureHeight + 5);
    //
    //
    //         var area =  d3.area()
    //             .x(function(d, i) {
    //
    //                 return x(d.data.year);
    //             })
    //             .y0(function(d) {
    //                 return y(d[0]);
    //             })
    //             .y1(function(d) {
    //                 return y(d[1]);
    //             });
    //
    //         svg
    //             .selectAll("myLayers")
    //             .data(stackedData.reverse())
    //             .enter()
    //             .append("path")
    //             .attr("class", "stackLayers")
    //             .attr("fill", function(d) {
    //                 // console.log(color(d.key));
    //                 return color(d.key);
    //             })
    //             .attr("stroke", "none")
    //             .attr("transform", "translate(" + margin.left + ",5)")
    //             .attr("d", initialarea)
    //             .transition()
    // .duration(2000)
    //             .attr("d", area);
    //
    //
    //         svg.append("text")
    //             .data(stackedData.reverse())
    //             .attr("x", function(d) {
    //                 console.log(d);
    //                 return x(d[d.length - 2].data.year) * 7.5 / 8;
    //             })
    //             .attr("y", function(d) {
    //                 return height - (y(d[d.length - 1].data.female) * 4 / 5);
    //                 // return  height - (y(d[d.length -1].data.female)/2);
    //             })
    //             .transition()
    //             .delay(3000)
    //             .duration(3000)
    //             .attr("class", "stackLayers")
    //             .attr("id", "text-label-fem")
    //             .attr("fill", "#fff")
    //             // .attr("font-size", "30px")
    //             // .attr("font-weight", 600)
    //             .text("27.1%");
    //
    //         svg.append("text")
    //             .data(stackedData.reverse())
    //             .attr("x", function(d) {
    //                 console.log(d);
    //                 return x(d[d.length - 2].data.year) * 7.5 / 8;
    //             })
    //             .attr("y", function(d) {
    //                 return y(d[d.length - 1].data.male);
    //             })
    //             .transition()
    //             .delay(2000)
    //             .duration(3000)
    //             .attr("class", "stackLayers")
    //             .attr("id", "text-label-male")
    //             // .attr("dy", "0.71em")
    //             .attr("fill", "#fff")
    //             // .attr("font-size", "30px")
    //             // .attr("font-weight", 600)
    //             .text("72.9%");


        }

        // initialize the scrollama
        var scroller = scrollama();

        var activateFunctions = [];
        activateFunctions[0] = sec_1;
        activateFunctions[1] = sec_2;
        activateFunctions[2] = sec_3;
        activateFunctions[3] = sec_4;

        // generic window resize listener event
        function handleResize() {
            // 1. update height of step elements
            var stepH = Math.floor(height * 0.75);
            step.style('height', stepH + 'px');



            figure
                .style('height', figureHeight + 'px')
                .style('top', figureMarginTop + 'px');


            // 3. tell scrollama to update new element dimensions
            scroller.resize();
        }

        // scrollama event handlers
        function handleStepEnter(response) {
            // console.log(response)
            // response = { element, direction, index }

            // add color to current step only
            step.classed('is-active', function(d, i) {
                return i === response.index;
            })

            // update graphic based on step
            figure.select('p').text(response.index + 1);
            figure.call(activateFunctions[response.index]);
        }

        function setupStickyfill() {
            d3.selectAll('.sticky').each(function() {
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
                    debug: false,
                    // debug: false,
                })
                .onStepEnter(handleStepEnter)


            // setup resize event
            window.addEventListener('resize', handleResize);
        }

        // kick things off
        init();
    })
