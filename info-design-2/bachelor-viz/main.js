var width = d3.select('#graph').node().offsetWidth;
var height = d3.select('#graph').node().offsetHeight;

// height = 500;
var margin = {
    top: 20,
    right: 20,
    bottom: 50,
    left: 100
};

var svg = d3.select("#graph")
    .append('svg')
    .attr("width", width)
    .attr("height", height);

// var radius = 8;
// // var forceStrength = 0.3;
// var forceStrengt2 = 0.05;

// var colors = ["#9370DB", "#B0C4DE", "#008080"];

// var colorHighlight = ["#7870db", "#7a9cc7", "#004d4d"];
// var colorscale = d3.scaleOrdinal()
//  .range(colors);
//
// var colorscaleHigh = d3.scaleOrdinal()
// .range(colorHighlight);

var radius = 40;
var colorscale = d3.scaleOrdinal(d3.schemeCategory20);
var centerScale = d3.scalePoint().padding(1).range([0, width]);
var forceStrength = 0.05;

var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

d3.queue()
    .defer(d3.csv, "./datasets/bachelor2.csv")
    .defer(d3.json, "https://gist.githubusercontent.com/zunayed/9081453/raw/d66f02aaac7745b46b2e3a15d7a339daec21cc47/countries.json")

    .await(function(error, data, data_world) {

        console.log(data);

        function canvas_clear() {


            svg
                .selectAll("*")
                .remove();
        }

        data.forEach(function(d) {
            d.r = radius;
            d.x = width / 2;
            d.y = height / 2;
        })

        function sec_1() {
            console.log("section 1")
            canvas_clear();

            var simulation = d3.forceSimulation()
                .force("collide", d3.forceCollide(function(d) {
                    return d.r + 10;
                }).iterations(16))
                .force("charge", d3.forceManyBody())
                .force("y", d3.forceY().y(height / 2))
                .force("x", d3.forceX().x(width / 2));




            var defs = svg.append("defs").attr("id", "imgdefs");

            var catpattern = defs.append("pattern")


            defs.selectAll(".circle-pattern")
                .data(data)
                .enter().append("pattern")
                .attr("class", "artist-pattern")
                .attr("id", function(d) {
                    // return d.NAME.toLowerCase().replace(" ", "_");
                    return d.ID_NAME;
                })
                .attr("height", "100%")
                .attr("width", "100%")
                .attr("patternContentUnits", "objectBoundingBox")
                .attr("x", "0")
                .attr("y", "0")
                .append("image")
                .attr("height", 1)
                .attr("width", 1)
                .attr("preserveAspectRatio", "none")
                .attr("xlink:href", function(d, i) {
                    // return imgurl;
                    console.log(d.NAME)
                    return "./images/" + d.ID_NAME + ".jpeg"
                });;

            var circles = svg
                // .selectAll("image")
                .selectAll("circle")
                .data(data);


            var circlesEnter = circles.enter().append("circle")
                .attr("class", "first-circle")
                .attr("r", function(d, i) {

                    if (d.NAME == "Jason Mesnick") {

                        return d.r + 15;

                    } else {
                        return d.r;
                    }
                })
                .attr("cx", function(d, i) {
                    return 175 + 25 * i + 2 * i ** 2;
                })
                .attr("cy", function(d, i) {
                    return 250;
                })
                // .style("fill", "url(#grump_avatar)")
                .style("fill", function(d, i) {
                    // return colorscale(d.PARTICIPANTS);
                    return "url(#" + d.ID_NAME + ")"
                })
                .on("mouseover, mousemove", function(d) {



                    d3.select(this)
                        .transition()
                        .duration(400)
                        //     .style("fill", function(d, i) {
                        //         return "#FF6666";
                        //     })
                        .attr("r", function(d) {
                            if (d.NAME == "Jason Mesnick") {
                                return d.r + 25;

                            } else {
                                return d.r + 10;

                            }
                        });
                    // //console.log(d.schoolName);
                    div.transition()
                        .duration(200)
                        .style("opacity", .9);
                    div.html("<b>" + "Name: " + "</b>" + d.NAME + "<br/>" +
                            "<b>Age: </b>" + d.AGE + "<br/>" +
                            "<b>Hometown: </b>" + d.HOMETOWN + "<br/>" +
                            "<b>Employment: </b>" + d.JOB)
                        .style("font-size", "14px")
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                })
                .on("mouseout", function(d) {

                    d3.select(this)
                        .transition()
                        .duration(400)
                        //     .style("fill", function(d, i) {
                        //         return "#FF6666";
                        //     })
                        .attr("r", function(d) {
                            if (d.NAME == "Jason Mesnick") {
                                return d.r + 15;

                            } else {
                                return d.r;

                            }
                        });
                    // d3.select(this).transition()
                    //     .duration(550)
                    //     .style("fill", function(d, i) {
                    //         return "#003366";
                    //     })
                    //       .attr("r", 8);
                    //
                    div.transition()
                        .duration(200)
                        .style("opacity", 0);
                });

            circles = circles.merge(circlesEnter);


            function ticked() {

                circles
                    .attr("cx", function(d) {
                        return d.x = Math.max(d.r, Math.min(width - d.r, d.x));

                    })
                    .attr("cy", function(d) {
                        return d.y = Math.max(d.r, Math.min(height - d.r, d.y));
                    });
            }

            simulation
                .nodes(data)
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

        function sec_2() {
            canvas_clear();

            console.log("section 2");


            var simulation = d3.forceSimulation()
                .force("collide", d3.forceCollide(function(d) {
                    return d.r + 10;
                }).iterations(16))
                .force("charge", d3.forceManyBody())
                .force("y", d3.forceY().y(height / 2))
                .force("x", d3.forceX().x(width / 2));

            var defs = svg.append("defs").attr("id", "imgdefs");

            var catpattern = defs.append("pattern")


            defs.selectAll(".circle-pattern")
                .data(data)
                .enter().append("pattern")
                .attr("class", "artist-pattern")
                .attr("id", function(d) {
                    // return d.NAME.toLowerCase().replace(" ", "_");
                    return d.ID_NAME;
                })
                .attr("height", "100%")
                .attr("width", "100%")
                .attr("patternContentUnits", "objectBoundingBox")
                .attr("x", "0")
                .attr("y", "0")
                .append("image")
                .attr("height", 1)
                .attr("width", 1)
                .attr("preserveAspectRatio", "none")
                .attr("xlink:href", function(d, i) {
                    // return imgurl;
                    console.log(d.NAME)
                    return "./images/" + d.ID_NAME + ".jpeg"
                });

            var circles = svg
                // .selectAll("image")
                .selectAll("circle")
                .data(data);

            // //console.log(data_schools);


            // groupBubbles();
            var circlesEnter = circles.enter().append("circle")
                .attr("class", "second-circle")
                .style("fill", function(d, i) {
                    // return colorscale(d.PARTICIPANTS);
                    return "url(#" + d.ID_NAME + ")"
                })
                .attr("r", function(d, i) {

                    if (d.NAME == "Jason Mesnick") {

                        return d.r + 15;

                    } else {
                        return d.r;
                    }
                })
                .attr("cx", function(d, i) {
                    return 175 + 25 * i + 2 * i ** 2;
                })
                .attr("cy", function(d, i) {
                    return 250;
                })
                .on("mouseover, mousemove", function(d) {



                    d3.select(this)
                        .transition()
                        .duration(400)
                        //     .style("fill", function(d, i) {
                        //         return "#FF6666";
                        //     })
                        .attr("r", function(d) {
                            if (d.NAME == "Jason Mesnick") {
                                return d.r + 25;

                            } else {
                                return d.r + 10;

                            }
                        });
                    // //console.log(d.schoolName);
                    div.transition()
                        .duration(200)
                        .style("opacity", .9);
                    div.html("<b>" + "Name: " + "</b>" + d.NAME + "<br/>" +
                            "<b>Age: </b>" + d.AGE + "<br/>" +
                            "<b>Hometown: </b>" + d.HOMETOWN + "<br/>" +
                            "<b>Employment: </b>" + d.JOB)
                        .style("font-size", "14px")
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                })
                .on("mouseout", function(d) {

                    d3.select(this)
                        .transition()
                        .duration(400)
                        //     .style("fill", function(d, i) {
                        //         return "#FF6666";
                        //     })
                        .attr("r", function(d) {
                            if (d.NAME == "Jason Mesnick") {
                                return d.r + 15;

                            } else {
                                return d.r;

                            }
                        });
                    // d3.select(this).transition()
                    //     .duration(550)
                    //     .style("fill", function(d, i) {
                    //         return "#003366";
                    //     })
                    //       .attr("r", 8);
                    //
                    div.transition()
                        .duration(200)
                        .style("opacity", 0);
                });

            d3.selectAll(".second-circle")
                .transition()
                .duration(6000)

                .attr("cy", function(d, i) {
                    if (d["ELIMINATION-1"] == "E") {
                        return 10000;
                    }
                })

            // .style("stroke", function(d, i) {
            //     return "#000";
            // })

            circles = circles.merge(circlesEnter);


            function ticked() {

                circles
                    .attr("cx", function(d) {
                        return d.x = Math.max(d.r, Math.min(width - d.r, d.x));

                    })
                    .attr("cy", function(d) {
                        return d.y = Math.max(d.r, Math.min(height - d.r, d.y));
                    });
            }

            simulation
                .nodes(data)
                .on("tick", ticked);

            var push_bachelor = {
                BACHELOR: {
                    x: width * 3 / 6,
                    y: height * 0.5 / 6
                },
                CONTESTANT: {
                    x: width * 3 / 6,
                    y: height * 4 / 6
                }
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


            d3.selectAll(".second-circle")
            .style("stroke", function(d,i){


                if(d["ELIMINATION-1"] == "R1"){
                    return  "#FFD700";
                }
                else if(d["ELIMINATION-1"] == "R"){
                    return  "#228B22";
                }
                else if(d["ELIMINATION-1"] == ""){
                    return  "#EF2A2A";
                }
                // return colorscale(d.PARTICIPANTS);
            })
            .style("stroke-width", function(d){
                return 4;
            })

            splitBubbles('PARTICIPANTS');

        }




//       MAAAAAAY DELETE
        // function sec_3() {
        //
        //     canvas_clear();
        //
        //     console.log("section 3");
        //
        //
        //     var dataFilter = data.filter(function(d) {
        //         // console.log(d)
        //
        //         return d["ELIMINATION-1"] != "E";
        //     });
        //
        //     console.log(dataFilter)
        //
        //     var simulation = d3.forceSimulation()
        //         .force("collide", d3.forceCollide(function(d) {
        //             return d.r + 4;
        //         }).iterations(16))
        //         .force("charge", d3.forceManyBody())
        //         .force("y", d3.forceY().y(height / 2))
        //         .force("x", d3.forceX().x(width / 2));
        //
        //         var defs = svg.append("defs").attr("id", "imgdefs");
        //
        //         var catpattern = defs.append("pattern")
        //
        //
        //         defs.selectAll(".circle-pattern")
        //             .data(data)
        //             .enter().append("pattern")
        //             .attr("class", "artist-pattern")
        //             .attr("id", function(d) {
        //                 // return d.NAME.toLowerCase().replace(" ", "_");
        //                 return d.ID_NAME;
        //             })
        //             .attr("height", "100%")
        //             .attr("width", "100%")
        //             .attr("patternContentUnits", "objectBoundingBox")
        //             .attr("x", "0")
        //             .attr("y", "0")
        //             .append("image")
        //             .attr("height", 1)
        //             .attr("width", 1)
        //             .attr("preserveAspectRatio", "none")
        //             .attr("xlink:href", function(d, i) {
        //                 // return imgurl;
        //                 console.log(d.NAME)
        //                 return "./images/" + d.ID_NAME + ".jpeg"
        //             });
        //
        //     var circles = svg
        //         // .selectAll("image")
        //         .selectAll("circle")
        //         .data(dataFilter);
        //
        //
        //
        //     var circlesEnter = circles.enter().append("circle")
        //     .attr("class", "third-circle")
        //     .style("fill", function(d, i) {
        //         // return colorscale(d.PARTICIPANTS);
        //         return "url(#" + d.ID_NAME + ")"
        //     })
        //     .attr("r", function(d, i) {
        //
        //         if (d.NAME == "Jason Mesnick") {
        //
        //             return d.r + 15;
        //
        //         } else {
        //             return d.r;
        //         }
        //     })
        //         .attr("cx", function(d, i) {
        //             return 175 + 25 * i + 2 * i ** 2;
        //         })
        //         .attr("cy", function(d, i) {
        //             return 250;
        //         })
        //
        //
        //
        //     circles = circles.merge(circlesEnter);
        //
        //
        //     function ticked() {
        //
        //         circles
        //             .attr("cx", function(d) {
        //                 return d.x = Math.max(d.r, Math.min(width - d.r, d.x));
        //
        //             })
        //             .attr("cy", function(d) {
        //                 return d.y = Math.max(d.r, Math.min(height - d.r, d.y));
        //             });
        //     }
        //
        //     simulation
        //         .nodes(dataFilter)
        //         .on("tick", ticked);
        //
        //     var push_bachelor = {
        //         "D1_1": {
        //             x: width * 0 / 3,
        //             y: height * 4 / 6
        //         },
        //         "D1_2": {
        //             x: width * 0.7 / 3,
        //             y: height * 4 / 6
        //         },
        //         "D8": {
        //             x: width * 1.5 / 3,
        //             y: height * 4 / 6
        //         },
        //         "": {
        //             x: width * 3/ 3,
        //             y: height * 4 / 6
        //         },
        //         "N/A": {
        //             x: width * 1.5 / 3,
        //             y: height * 1 / 6
        //         }
        //
        //     }
        //
        //     function splitBubbles(byVar) {
        //         //conso.log(byVar);
        //         function bubble_position_x(d) {
        //             //console.log(d[byVar]);
        //             return push_bachelor[d[byVar]].x;
        //         }
        //
        //         function bubble_position_y(d) {
        //             return push_bachelor[d[byVar]].y;
        //         }
        //
        //         simulation
        //             .force('x', d3
        //                 .forceX()
        //                 .strength(forceStrength)
        //                 .x(bubble_position_x)
        //             )
        //             .force('y', d3
        //                 .forceY()
        //                 .strength(forceStrength)
        //                 .y(bubble_position_y)
        //             );
        //
        //         simulation.alpha(2).restart();
        //
        //
        //     }
        //
        //     d3.selectAll(".third-circle")
        //     .style("stroke", function(d,i){
        //
        //
        //         if(d["ELIMINATION-2"] == "R"){
        //             return  "#B266FF";
        //         }
        //         else if(d["ELIMINATION-2"] == ""){
        //             return  "#EF2A2A";
        //         }
        //         // return colorscale(d.PARTICIPANTS);
        //     })
        //     .style("stroke-width", function(d){
        //         return 4;
        //     })
        //
        //
        //
        //     splitBubbles('DATES-2');
        //
        //
        // }

        function sec_4() {
            canvas_clear();
            //
            console.log("section 4");
            //
            var dataFilter = data.filter(function(d) {
                // console.log(d)

                return d["ELIMINATION-1"] != "E";
            });

            // console.log(dataFilter)

            var simulation = d3.forceSimulation()
                .force("collide", d3.forceCollide(function(d) {
                    return d.r + 4;
                }).iterations(16))
                .force("charge", d3.forceManyBody())
                .force("y", d3.forceY().y(height / 2))
                .force("x", d3.forceX().x(width / 2));

                var defs = svg.append("defs").attr("id", "imgdefs");

                var catpattern = defs.append("pattern")


                defs.selectAll(".circle-pattern")
                    .data(data)
                    .enter().append("pattern")
                    .attr("class", "artist-pattern")
                    .attr("id", function(d) {
                        // return d.NAME.toLowerCase().replace(" ", "_");
                        return d.ID_NAME;
                    })
                    .attr("height", "100%")
                    .attr("width", "100%")
                    .attr("patternContentUnits", "objectBoundingBox")
                    .attr("x", "0")
                    .attr("y", "0")
                    .append("image")
                    .attr("height", 1)
                    .attr("width", 1)
                    .attr("preserveAspectRatio", "none")
                    .attr("xlink:href", function(d, i) {
                        // return imgurl;
                        console.log(d.NAME)
                        return "./images/" + d.ID_NAME + ".jpeg"
                    });



            var circles = svg
                // .selectAll("image")
                .selectAll("circle")
                .data(dataFilter);



            var circlesEnter = circles.enter().append("circle")
                .attr("class", "fourth-circle")
                .style("fill", function(d, i) {
                    // return colorscale(d.PARTICIPANTS);
                    return "url(#" + d.ID_NAME + ")"
                })
                .attr("r", function(d, i) {

                    if (d.NAME == "Jason Mesnick") {

                        return d.r + 15;

                    } else {
                        return d.r;
                    }
                })
                .attr("cx", function(d, i) {
                    return 175 + 25 * i + 2 * i ** 2;
                })
                .attr("cy", function(d, i) {
                    return 250;
                })
                .transition()
                .duration(function(d, i) {

                    return 8000;
                })
                .attr("cy", function(d, i) {
                    if (d["ELIMINATION-2"] == "E") {

                        return 5000;
                    }
                    if (d["ELIMINATION-2"] == "EQ") {

                        return 10000;
                    }
                })



            circles = circles.merge(circlesEnter);


            function ticked() {

                circles
                    .attr("cx", function(d) {
                        return d.x = Math.max(d.r, Math.min(width - d.r, d.x));

                    })
                    .attr("cy", function(d) {
                        return d.y = Math.max(d.r, Math.min(height - d.r, d.y));
                    });
            }

            simulation
                .nodes(dataFilter)
                .on("tick", ticked);

                var push_bachelor = {
                    "D1_1": {
                        x: width * 0 / 3,
                        y: height * 4 / 6
                    },
                    "D1_2": {
                        x: width * 0.7 / 3,
                        y: height * 4 / 6
                    },
                    "D8": {
                        x: width * 1.5 / 3,
                        y: height * 4/ 6
                    },
                    "": {
                        x: width * 3/ 3,
                        y: height * 4 / 6
                    },
                    "N/A": {
                        x: width * 1.5 / 3,
                        y: height * 1 / 6
                    }

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

            d3.selectAll(".fourth-circle")
            .style("stroke", function(d,i){


                if(d["ELIMINATION-2"] == "R"){
                    return  "#B266FF";
                }
                else if(d["ELIMINATION-2"] == ""){
                    return  "#EF2A2A";
                }
                // return colorscale(d.PARTICIPANTS);
            })
            .style("stroke-width", function(d){
                return 4;
            })



            d3.selectAll(".fourth-circle")
                .transition()
                .delay(function(d, i) {
                    if (d["ELIMINATION-2"] == "EQ") {
                        return 1000;
                    }
                    // else if(d["ELIMINATION-3"] == "ED"){
                    //       return 100;
                    // }
                })
                .duration(function(d, i) {
                    //   if(d["ELIMINATION-2"] == "EQ"){
                    //   return 6000;
                    // }
                    // else if(d["ELIMINATION-2"] == "E"){
                    //   return 8000;
                    // }
                    return 6000;
                })
                .attr("cx", function(d, i) {
                    if (d["ELIMINATION-2"] == "EQ") {

                        return (175 + 25 * i + 2 * i ** 2) - 1000;
                    }
                });

            d3.selectAll(".fourth-circle")
                .transition()
                .delay(function(d, i) {
                    if (d["ELIMINATION-3"] == "E") {
                        return 3000;
                    }
                    // else if(d["ELIMINATION-3"] == "ED"){
                    //       return 100;
                    // }
                })
                .duration(function(d, i) {
                    //   if(d["ELIMINATION-2"] == "EQ"){
                    //   return 6000;
                    // }
                    // else if(d["ELIMINATION-2"] == "E"){
                    //   return 8000;
                    // }
                    return 6000;
                })
                .attr("cy", function(d, i) {
                    if (d["ELIMINATION-3"] == "E") {

                        return 5000;
                    }

                })

            splitBubbles('DATES-2');


        }

        function sec_5() {
            canvas_clear();
            console.log("section 5");

            var dataFilter2 = data.filter(function(d) {
                // console.log(d)

                return d["ELIMINATION-1"] != "E" && d["ELIMINATION-2"] != "E" && d["ELIMINATION-2"] != "EQ";
            });

            console.log(dataFilter2);


                        var simulation = d3.forceSimulation()
                            .force("collide", d3.forceCollide(function(d) {
                                return d.r + 3;
                            }).iterations(16))
                            .force("charge", d3.forceManyBody())
                            .force("y", d3.forceY().y(height / 2))
                            .force("x", d3.forceX().x(width / 2));

                            var defs = svg.append("defs").attr("id", "imgdefs");

                            var catpattern = defs.append("pattern")


                            defs.selectAll(".circle-pattern")
                                .data(data)
                                .enter().append("pattern")
                                .attr("class", "artist-pattern")
                                .attr("id", function(d) {
                                    // return d.NAME.toLowerCase().replace(" ", "_");
                                    return d.ID_NAME;
                                })
                                .attr("height", "100%")
                                .attr("width", "100%")
                                .attr("patternContentUnits", "objectBoundingBox")
                                .attr("x", "0")
                                .attr("y", "0")
                                .append("image")
                                .attr("height", 1)
                                .attr("width", 1)
                                .attr("preserveAspectRatio", "none")
                                .attr("xlink:href", function(d, i) {
                                    // return imgurl;
                                    console.log(d.NAME)
                                    return "./images/" + d.ID_NAME + ".jpeg"
                                });

            var circles = svg
                // .selectAll("image")
                .selectAll("circle")
                .data(dataFilter2);



            var circlesEnter = circles.enter().append("circle")
                .attr("class", "fifth-circle")
                .style("fill", function(d, i) {
                    // return colorscale(d.PARTICIPANTS);
                    return "url(#" + d.ID_NAME + ")"
                })
                .style("fill", function(d, i) {
                    // return colorscale(d.PARTICIPANTS);
                    return "url(#" + d.ID_NAME + ")"
                })
                .attr("r", function(d, i) {

                    if (d.NAME == "Jason Mesnick") {

                        return d.r + 15;

                    } else {
                        return d.r;
                    }
                })
                .attr("cx", function(d, i) {
                    return 175 + 25 * i + 2 * i ** 2;
                })
                .attr("cy", function(d, i) {
                    return 250;
                })



            circles = circles.merge(circlesEnter);


            function ticked() {

                circles
                    .attr("cx", function(d) {
                        return d.x = Math.max(d.r, Math.min(width - d.r, d.x));

                    })
                    .attr("cy", function(d) {
                        return d.y = Math.max(d.r, Math.min(height - d.r, d.y));
                    });
            }

            simulation
                .nodes(dataFilter2)
                .on("tick", ticked);

                var push_bachelor = {
                    "D1_1": {
                        x: width * 0 / 3,
                        y: height * 4 / 6
                    },
                    "D1_2": {
                        x: width * 1 / 3,
                        y: height * 4 / 6
                    },
                    "D8": {
                        x: width * 2 / 3,
                        y: height * 4 / 6
                    },
                    "": {
                        x: width * 3/ 3,
                        y: height * 4 / 6
                    },
                    "N/A": {
                        x: width * 1.5 / 3,
                        y: height * 1 / 6
                    }

                }

            // console.log(push_bachelor);

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

            d3.selectAll(".fifth-circle")
            .style("stroke", function(d,i){


                if(d["ELIMINATION-3"] == "R"){
                    return  "#B266FF";
                }
                else if(d["ELIMINATION-3"] == ""){
                    return  "#EF2A2A";
                }
                // return colorscale(d.PARTICIPANTS);
            })
            .style("stroke-width", function(d){
                return 4;
            })

            d3.selectAll(".fifth-circle")
                .transition()
                .delay(function(d, i) {
                    if (d["ELIMINATION-3"] == "ED") {
                        return 1000;
                    }
                    // else if(d["ELIMINATION-3"] == "ED"){
                    //       return 100;
                    // }
                })
                .duration(function(d, i) {
                    //   if(d["ELIMINATION-2"] == "EQ"){
                    //   return 6000;
                    // }
                    // else if(d["ELIMINATION-2"] == "E"){
                    //   return 8000;
                    // }
                    return 6000;
                })
                .attr("cx", function(d, i) {
                    if (d["ELIMINATION-3"] == "ED") {

                        return (175 + 25 * i + 2 * i ** 2) - 1000;
                    }
                });

            d3.selectAll(".fifth-circle")
                .transition()
                .delay(function(d, i) {
                    if (d["ELIMINATION-3"] == "E") {
                        return 3000;
                    }
                    // else if(d["ELIMINATION-3"] == "ED"){
                    //       return 100;
                    // }
                })
                .duration(function(d, i) {
                    //   if(d["ELIMINATION-2"] == "EQ"){
                    //   return 6000;
                    // }
                    // else if(d["ELIMINATION-2"] == "E"){
                    //   return 8000;
                    // }
                    return 6000;
                })
                .attr("cy", function(d, i) {
                    if (d["ELIMINATION-3"] == "E") {

                        return 5000;
                    }

                })
            //

            splitBubbles('DATES-3');


        }

        function sec_6() {

            canvas_clear();
            console.log("section 6");

            var dataFilter3 = data.filter(function(d) {
                // console.log(d)

                return d["ELIMINATION-1"] != "E" && d["ELIMINATION-2"] != "E" && d["ELIMINATION-2"] != "EQ" && d["ELIMINATION-3"] != "E" && d["ELIMINATION-3"] != "ED";
            });

            console.log(dataFilter3);


            var simulation = d3.forceSimulation()
                .force("collide", d3.forceCollide(function(d) {
                    return d.r + 4;
                }).iterations(16))
                .force("charge", d3.forceManyBody())
                .force("y", d3.forceY().y(height / 2))
                .force("x", d3.forceX().x(width / 2));

                var defs = svg.append("defs").attr("id", "imgdefs");

                var catpattern = defs.append("pattern")


                defs.selectAll(".circle-pattern")
                    .data(data)
                    .enter().append("pattern")
                    .attr("class", "artist-pattern")
                    .attr("id", function(d) {
                        // return d.NAME.toLowerCase().replace(" ", "_");
                        return d.ID_NAME;
                    })
                    .attr("height", "100%")
                    .attr("width", "100%")
                    .attr("patternContentUnits", "objectBoundingBox")
                    .attr("x", "0")
                    .attr("y", "0")
                    .append("image")
                    .attr("height", 1)
                    .attr("width", 1)
                    .attr("preserveAspectRatio", "none")
                    .attr("xlink:href", function(d, i) {
                        // return imgurl;
                        console.log(d.NAME)
                        return "./images/" + d.ID_NAME + ".jpeg"
                    });

            var circles = svg
                // .selectAll("image")
                .selectAll("circle")
                .data(dataFilter3);



            var circlesEnter = circles.enter().append("circle")
                .attr("class", "sixth-circle")
                .style("fill", function(d, i) {
                    // return colorscale(d.PARTICIPANTS);
                    return "url(#" + d.ID_NAME + ")"
                })
                .attr("r", function(d, i) {

                    if (d.NAME == "Jason Mesnick") {

                        return d.r + 15;

                    } else {
                        return d.r;
                    }
                })
                .attr("cx", function(d, i) {
                    return 175 + 25 * i + 2 * i ** 2;
                })
                .attr("cy", function(d, i) {
                    return 250;
                })



            circles = circles.merge(circlesEnter);


            function ticked() {

                circles
                    .attr("cx", function(d) {
                        return d.x = Math.max(d.r, Math.min(width - d.r, d.x));

                    })
                    .attr("cy", function(d) {
                        return d.y = Math.max(d.r, Math.min(height - d.r, d.y));
                    });
            }

            simulation
                .nodes(dataFilter3)
                .on("tick", ticked);

            var push_bachelor = {
                "D1": {
                    x: width * 0 / 2,
                    y: height * 4 / 6
                },
                "D2": {
                    x: width * 1 / 2,
                    y: height * 4 / 6
                },
                "D6": {
                    x: width * 2/ 2,
                    y: height * 4 / 6
                },
                "N/A": {
                    x: width * 1/2,
                    y: height * 1 / 6
                }
                // f: { x: width / 2, y: height / 3 },
                // m: { x: width / 3, y: 2*height / 3 },
                // n: { x: 2*width / 3, y: 2*height / 3 }
            }

            console.log(push_bachelor);

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

            d3.selectAll(".sixth-circle")
            .style("stroke", function(d,i){


                if(d["ELIMINATION-4"] == "R"){
                    return  "#B266FF";
                }
                else if(d["ELIMINATION-4"] == ""){
                    return  "#EF2A2A";
                }
                // return colorscale(d.PARTICIPANTS);
            })
            .style("stroke-width", function(d){
                return 4;
            })


            d3.selectAll(".sixth-circle")
                .transition()
                .delay(function(d, i) {
                    if (d["ELIMINATION-4"] == "ED") {
                        return 1000;
                    }
                    // else if(d["ELIMINATION-3"] == "ED"){
                    //       return 100;
                    // }
                })
                .duration(function(d, i) {
                    //   if(d["ELIMINATION-2"] == "EQ"){
                    //   return 6000;
                    // }
                    // else if(d["ELIMINATION-2"] == "E"){
                    //   return 8000;
                    // }
                    return 6000;
                })
                .attr("cx", function(d, i) {
                    if (d["ELIMINATION-4"] == "ED") {

                        return (175 + 25 * i + 2 * i ** 2) + 1000;
                    }
                });

            d3.selectAll(".sixth-circle")
                .transition()
                .delay(function(d, i) {
                    if (d["ELIMINATION-4"] == "E") {
                        return 3000;
                    }
                    // else if(d["ELIMINATION-3"] == "ED"){
                    //       return 100;
                    // }
                })
                .duration(function(d, i) {
                    //   if(d["ELIMINATION-2"] == "EQ"){
                    //   return 6000;
                    // }
                    // else if(d["ELIMINATION-2"] == "E"){
                    //   return 8000;
                    // }
                    return 6000;
                })
                .attr("cy", function(d, i) {
                    if (d["ELIMINATION-4"] == "E") {

                        return 5000;
                    }

                })

            splitBubbles('DATES-4');


        }

        function sec_7() {
            canvas_clear();
            console.log("section 7 - 1ST US MAP TO SEATTLE");

            // var zoom = d3.zoom()
            //             .translateExtent([[0,0],
            //               [width, height]
            //             ])
            //             .scaleExtent([1,8])
            //             .on("zoom", zoomed);
            //
            // function zoomed(){
            //   svg.attr("transform", d3.event.transform);
            // }
            //
            // svg.call(zoom)
            //     .on("dblclick.zoom", null);
            // D3 Projection
            var projection = d3.geoMercator()
                // .center([-41.2284, 70.9098])
                .center([-100.2437, 60.05221])
                .scale(400)
            // .scale(350);
            var path = d3.geoPath()
                .projection(projection);

            svg.append("g")
                .selectAll("path")
                .data(data_world.features)
                .enter()
                .append("path")
                .attr("title", function(d) {
                    return d.id;
                })
                .style("fill", "#43a2ca")
                .style("stroke", "#fff")
                .attr("d", path);

            var points = [{
                    "name": "Los Angelas",
                    "coords": [-118.2437, 34.05221]
                },
                {
                    "name": "Seattle",
                    "coords": [-122.3321, 47.6062]
                }
            ];

            var circ_points = svg.selectAll("circle")
                .data(points);

            console.log(points[0])

            circ_points.enter().append("circle")
                .attr("transform", function(d) {
                    return "translate(" + projection(d.coords) + ")";
                })
                .attr("r", 10)
                .attr("fill", "aquamarine")
                .attr("stroke", "blue");

            var route = svg.append("path")
                .datum({
                    type: "LineString",
                    coordinates: [points[1].coords, points[0].coords]
                })
                .attr("class", "route")
                .attr("d", path)
                .attr("stroke", "#d3d3d3")
                .attr("stroke-width", 4)
                .attr("fill", "none");

            var totalLength = route.node().getTotalLength();
            repeat();

            function repeat() {
                route
                    .attr("stroke-dasharray", totalLength + "," + totalLength)
                    .attr("stroke-dashoffset", totalLength)
                    .transition()
                    .duration(2000)
                    .ease(d3.easeCubic)
                    .attr("stroke-dashoffset", totalLength * 2)
                    .transition()
                    .duration(2000)
                    .attr("stroke-dashoffset", totalLength * 3)
                    .on("end", repeat); // when the transition finishes start again

            };
        }

        function sec_8() {
            canvas_clear();
            console.log("section 8");

            var dataFilter4 = data.filter(function(d) {
                // console.log(d)

                return d["ELIMINATION-1"] != "E" && d["ELIMINATION-2"] != "E" && d["ELIMINATION-2"] != "EQ" && d["ELIMINATION-3"] != "E" && d["ELIMINATION-3"] != "ED" && d["ELIMINATION-4"] != "E" && d["ELIMINATION-4"] != "ED";
            });

            // console.log(dataFilter4)

            var simulation = d3.forceSimulation()
                .force("collide", d3.forceCollide(function(d) {
                    return d.r + 4;
                }).iterations(16))
                .force("charge", d3.forceManyBody())
                .force("y", d3.forceY().y(height / 2))
                .force("x", d3.forceX().x(width / 2));


                var defs = svg.append("defs").attr("id", "imgdefs");

                var catpattern = defs.append("pattern")


                defs.selectAll(".circle-pattern")
                    .data(data)
                    .enter().append("pattern")
                    .attr("class", "artist-pattern")
                    .attr("id", function(d) {
                        // return d.NAME.toLowerCase().replace(" ", "_");
                        return d.ID_NAME;
                    })
                    .attr("height", "100%")
                    .attr("width", "100%")
                    .attr("patternContentUnits", "objectBoundingBox")
                    .attr("x", "0")
                    .attr("y", "0")
                    .append("image")
                    .attr("height", 1)
                    .attr("width", 1)
                    .attr("preserveAspectRatio", "none")
                    .attr("xlink:href", function(d, i) {
                        // return imgurl;
                        console.log(d.NAME)
                        return "./images/" + d.ID_NAME + ".jpeg"
                    });

            var circles = svg
                // .selectAll("image")
                .selectAll("circle")
                .data(dataFilter4);



            var circlesEnter = circles.enter().append("circle")
                .attr("class", "eigth-circle")
                .style("fill", function(d, i) {
                    // return colorscale(d.PARTICIPANTS);
                    return "url(#" + d.ID_NAME + ")"
                })
                .attr("r", function(d, i) {

                    if (d.NAME == "Jason Mesnick") {

                        return d.r + 15;

                    } else {
                        return d.r;
                    }
                })
                .attr("cx", function(d, i) {
                    return 175 + 25 * i + 2 * i ** 2;
                })
                .attr("cy", function(d, i) {
                    return 250;
                })
                .style("stroke", function(d,i){


                    // if(d["ELIMINATION-4"] == "R"){
                    //     return  "#B266FF";
                    // }
                    if(d["ELIMINATION-5"] == ""){
                        return  "#EF2A2A";
                    }
                    // return colorscale(d.PARTICIPANTS);
                })
                .style("stroke-width", function(d){
                    return 4;
                })


                // .style("fill", function(d, i) {
                //     return colorscale(d.PARTICIPANTS);
                // })


            circles = circles.merge(circlesEnter);


            function ticked() {

                circles
                    .attr("cx", function(d) {
                        return d.x = Math.max(d.r, Math.min(width - d.r, d.x));

                    })
                    .attr("cy", function(d) {
                        return d.y = Math.max(d.r, Math.min(height - d.r, d.y));
                    });
            }

            simulation
                .nodes(dataFilter4)
                .on("tick", ticked);

            var push_bachelor = {
                "D1_1": {
                    x: width * 0 / 6,
                    y: height * 1.3 / 6
                },
                "D1_2": {
                    x: width * 1.5 / 6,
                    y: height * 1.3 / 6
                },
                "D3": {
                    x: width * 5 / 6,
                    y: height * 1.3 / 6
                },
                "N/A": {
                    x: width * 3 / 6,
                    y: height * 4 / 6
                }
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

            // d3.selectAll(".eigght-circle")
            // .style("stroke", function(d,i){
            //
            //
            //     // if(d["ELIMINATION-4"] == "R"){
            //     //     return  "#B266FF";
            //     // }
            //     if(d["ELIMINATION-5"] == ""){
            //         return  "#EF2A2A";
            //     }
            //     // return colorscale(d.PARTICIPANTS);
            // })
            // .style("stroke-width", function(d){
            //     return 4;
            // })


            d3.selectAll(".eigth-circle")
                .transition()
                .duration(function(d, i) {

                    return 6000;
                })
                // .attr("cx", function(d, i) {
                //   // if(d["ELIMINATION-2"] == "E"){
                //     return (15 + 25 * i + 2 * i ** 2) -100;
                //         // }
                // })
                .attr("cy", function(d, i) {
                    if (d["ELIMINATION-5"] == "E") {

                        return 5000;
                    }

                })

            splitBubbles('DATES-5');
        }

        function sec_9() {
            canvas_clear();
            console.log("section 9 - DATE 6: HOMETOWN ALL OVER THE COUNTRY AND CANADA");

            // D3 Projection
            var projection = d3.geoMercator()
                // .center([-41.2284, 70.9098])
                .center([-100.2437, 60.05221])
                .scale(500)
            // .scale(350);
            var path = d3.geoPath()
                .projection(projection);

            svg.append("g")
                .selectAll("path")
                .data(data_world.features)
                .enter()
                .append("path")
                .attr("title", function(d) {
                    return d.id;
                })
                .style("fill", "#43a2ca")
                .style("stroke", "#fff")
                .attr("d", path);

            var points = [{
                    "name": "Kelowna, British Columbia",
                    "coords": [-119.4960, 49.8880]
                },
                {
                    "name": "Grand Rapids, Michigan",
                    "coords": [-85.6681, 42.9634]
                },
                {
                    "name": "Lake Elsinore, California",
                    "coords": [-117.3273, 33.6681]
                },
                {
                    "name": "Grand Rapids, Michigan",
                    "coords": [-96.7970, 32.7767]
                }
            ];

            var circ_points = svg.selectAll("circle")
                .data(points);

            console.log(points[0])

            circ_points.enter().append("circle")
                .attr("transform", function(d) {
                    return "translate(" + projection(d.coords) + ")";
                })
                .attr("r", 10)
                .attr("fill", "aquamarine")
                .attr("stroke", "blue");

            var route = svg.append("path")
                .datum({
                    type: "LineString",
                    coordinates: [points[3].coords, points[2].coords, points[1].coords, points[0].coords]
                })
                .attr("class", "route")
                .attr("d", path)
                .attr("stroke", "#d3d3d3")
                .attr("stroke-width", 4)
                .attr("fill", "none");

            var totalLength = route.node().getTotalLength();
            repeat();

            function repeat() {
                route
                    .attr("stroke-dasharray", totalLength + "," + totalLength)
                    .attr("stroke-dashoffset", totalLength)
                    .transition()
                    .duration(2000)
                    .ease(d3.easeCubic)
                    .attr("stroke-dashoffset", totalLength * 2)
                    .transition()
                    .duration(2000)
                    .attr("stroke-dashoffset", totalLength * 3)
                    .on("end", repeat); // when the transition finishes start again

            };

        }

        function sec_9_1() {

            console.log("section 8");
            canvas_clear();


            var dataFilter4_1 = data.filter(function(d) {
                // console.log(d)

                return d["ELIMINATION-1"] != "E" && d["ELIMINATION-2"] != "E" && d["ELIMINATION-2"] != "EQ" && d["ELIMINATION-3"] != "E" && d["ELIMINATION-3"] != "ED" && d["ELIMINATION-4"] != "E"
                && d["ELIMINATION-4"] != "ED" && d["ELIMINATION-5"] != "E";
            });

            // console.log(dataFilter4)

            var simulation = d3.forceSimulation()
                .force("collide", d3.forceCollide(function(d) {
                    return d.r + 10;
                }).iterations(16))
                .force("charge", d3.forceManyBody())
                .force("y", d3.forceY().y(height / 2))
                .force("x", d3.forceX().x(width / 2));


                var defs = svg.append("defs").attr("id", "imgdefs");

                var catpattern = defs.append("pattern")


                defs.selectAll(".circle-pattern")
                    .data(data)
                    .enter().append("pattern")
                    .attr("class", "artist-pattern")
                    .attr("id", function(d) {
                        // return d.NAME.toLowerCase().replace(" ", "_");
                        return d.ID_NAME;
                    })
                    .attr("height", "100%")
                    .attr("width", "100%")
                    .attr("patternContentUnits", "objectBoundingBox")
                    .attr("x", "0")
                    .attr("y", "0")
                    .append("image")
                    .attr("height", 1)
                    .attr("width", 1)
                    .attr("preserveAspectRatio", "none")
                    .attr("xlink:href", function(d, i) {
                        // return imgurl;
                        console.log(d.NAME)
                        return "./images/" + d.ID_NAME + ".jpeg"
                    });

            var circles = svg
                // .selectAll("image")
                .selectAll("circle")
                .data(dataFilter4_1);



            var circlesEnter = circles.enter().append("circle")
                .attr("class", "ninth-circle")
                .style("fill", function(d, i) {
                    // return colorscale(d.PARTICIPANTS);
                    return "url(#" + d.ID_NAME + ")"
                })
                .attr("r", function(d, i) {

                    if (d.NAME == "Jason Mesnick") {

                        return d.r + 15;

                    } else {
                        return d.r;
                    }
                })
                .attr("cx", function(d, i) {
                    return 175 + 25 * i + 2 * i ** 2;
                })
                .attr("cy", function(d, i) {
                    return 250;
                })

                // .style("fill", function(d, i) {
                //     return colorscale(d.PARTICIPANTS);
                // })


            circles = circles.merge(circlesEnter);


            function ticked() {

                circles
                    .attr("cx", function(d) {
                        return d.x = Math.max(d.r, Math.min(width - d.r, d.x));

                    })
                    .attr("cy", function(d) {
                        return d.y = Math.max(d.r, Math.min(height - d.r, d.y));
                    });
            }

            simulation
                .nodes(dataFilter4_1)
                .on("tick", ticked);

            var push_bachelor = {
                "D1_1": {
                    x: width * 0 / 6,
                    y: height * 1.3 / 6
                },
                "D1_2": {
                    x: width * 1.5 / 6,
                    y: height * 1.3 / 6
                },
                "D3": {
                    x: width * 5 / 6,
                    y: height * 1.3 / 6
                },
                "N/A": {
                    x: width * 3 / 6,
                    y: height * 4 / 6
                }
                // f: { x: width / 2, y: height / 3 },
                // m: { x: width / 3, y: 2*height / 3 },
                // n: { x: 2*width / 3, y: 2*height / 3 }
            }



            d3.selectAll(".ninth-circle")
            .style("stroke", function(d,i){


                // if(d["ELIMINATION-4"] == "R"){
                //     return  "#B266FF";
                // }
                if(d["ELIMINATION-6"] == ""){
                    return  "#EF2A2A";
                }
                // return colorscale(d.PARTICIPANTS);
            })
            .style("stroke-width", function(d){
                return 4;
            })


            d3.selectAll(".ninth-circle")
                .transition()
                .duration(function(d, i) {

                    return 6000;
                })
                // .attr("cx", function(d, i) {
                //   // if(d["ELIMINATION-2"] == "E"){
                //     return (15 + 25 * i + 2 * i ** 2) -100;
                //         // }
                // })
                .attr("cy", function(d, i) {
                    if (d["ELIMINATION-6"] == "E") {

                        return 5000;
                    }

                })


        }

        function sec_10() {
            canvas_clear();
            console.log("section 10 - DATE 7: WORLD MAP NEW ZEALAND");



            // D3 Projection
            var projection = d3.geoMercator()
            .scale(width / 2 / Math.PI)
     //.scale(100)
     .translate([width / 2, height / 2])
            // .scale(350);
            // -8.001200110732396, -137.9888190969885
            var path = d3.geoPath()
                .projection(projection);

            svg.append("g")
                .selectAll("path")
                .data(data_world.features)
                .enter()
                .append("path")
                .attr("title", function(d) {
                    return d.id;
                })
                .style("fill", "#43a2ca")
                .style("stroke", "#fff")
                .attr("d", path);

            var points = [{
                    "name": "United States",
                    "coords": [-95.7129, 37.0902]
                },
                {
                    "name": "New Zealand",
                    "coords": [153.58708518866334, 2.0492002763844686]
                }
            ];
// -43.597547304909334, 173.20130659406337
            // -0.8191406583433406, -170.98942871328362
            // -2.0492002763844686, -153.58708518866334

            var circ_points = svg.selectAll("circle")
                .data(points);

            console.log(points[0])

            circ_points.enter().append("circle")
                .attr("transform", function(d) {
                    return "translate(" + projection(d.coords) + ")";
                })
                .attr("r", 10)
                .attr("fill", "aquamarine")
                .attr("stroke", "blue");

            var route = svg.append("path")
                .datum({
                    type: "LineString",
                    coordinates: [points[1].coords, points[0].coords]
                })
                .attr("class", "route")
                .attr("d", path)
                .attr("stroke", "#d3d3d3")
                .attr("stroke-width", 4)
                .attr("fill", "none");

            var totalLength = route.node().getTotalLength();
            repeat();

            function repeat() {
                route
                    .attr("stroke-dasharray", totalLength + "," + totalLength)
                    .attr("stroke-dashoffset", totalLength)
                    .transition()
                    .duration(2000)
                    .ease(d3.easeCubic)
                    .attr("stroke-dashoffset", totalLength * 2)
                    .transition()
                    .duration(2000)
                    .attr("stroke-dashoffset", totalLength * 3)
                    .on("end", repeat); // when the transition finishes start again

            };
        }

        function sec_11() {
            canvas_clear();
            console.log("section 11 - DATE 7: TOP 3");

            var dataFilter5 = data.filter(function(d) {
                // console.log(d)

                return d["ELIMINATION-1"] != "E" && d["ELIMINATION-2"] != "E" && d["ELIMINATION-2"] != "EQ" &&
                    d["ELIMINATION-3"] != "E" && d["ELIMINATION-3"] != "ED" && d["ELIMINATION-4"] != "E" && d["ELIMINATION-4"] != "ED" && d["ELIMINATION-5"] != "E" && d["ELIMINATION-6"] != "E";
            });
            // D3 Projection

            // console.log(dataFilter5)

            var simulation = d3.forceSimulation()
                .force("collide", d3.forceCollide(function(d) {
                    return d.r + 6;
                }).iterations(16))
                .force("charge", d3.forceManyBody())
                .force("y", d3.forceY().y(height / 2))
                .force("x", d3.forceX().x(width / 2));

                var defs = svg.append("defs").attr("id", "imgdefs");

                var catpattern = defs.append("pattern")


                defs.selectAll(".circle-pattern")
                    .data(data)
                    .enter().append("pattern")
                    .attr("class", "artist-pattern")
                    .attr("id", function(d) {
                        // return d.NAME.toLowerCase().replace(" ", "_");
                        return d.ID_NAME;
                    })
                    .attr("height", "100%")
                    .attr("width", "100%")
                    .attr("patternContentUnits", "objectBoundingBox")
                    .attr("x", "0")
                    .attr("y", "0")
                    .append("image")
                    .attr("height", 1)
                    .attr("width", 1)
                    .attr("preserveAspectRatio", "none")
                    .attr("xlink:href", function(d, i) {
                        // return imgurl;
                        console.log(d.NAME)
                        return "./images/" + d.ID_NAME + ".jpeg"
                    });

            var circles = svg
                // .selectAll("image")
                .selectAll("circle")
                .data(dataFilter5);



            var circlesEnter = circles.enter().append("circle")
                .attr("class", "eleventh-circle")
                .style("fill", function(d, i) {
                    // return colorscale(d.PARTICIPANTS);
                    return "url(#" + d.ID_NAME + ")"
                })
                .attr("r", function(d, i) {

                    if (d.NAME == "Jason Mesnick") {

                        return d.r + 15;

                    } else {
                        return d.r;
                    }
                })
                .attr("cx", function(d, i) {
                    return 175 + 25 * i + 2 * i ** 2;
                })
                .attr("cy", function(d, i) {
                    return 250;
                })
                .style("stroke", function(d,i){


                    // if(d["ELIMINATION-4"] == "R"){
                    //     return  "#B266FF";
                    // }
                    if(d["ELIMINATION-7"] == ""){
                        return  "#EF2A2A";
                    }
                    // return colorscale(d.PARTICIPANTS);
                })
                .style("stroke-width", function(d){
                    return 4;
                })

                // .style("fill", function(d, i) {
                //     return colorscale(d.PARTICIPANTS);
                // })


            circles = circles.merge(circlesEnter);


            function ticked() {

                circles
                    .attr("cx", function(d) {
                        return d.x = Math.max(d.r, Math.min(width - d.r, d.x));

                    })
                    .attr("cy", function(d) {
                        return d.y = Math.max(d.r, Math.min(height - d.r, d.y));
                    });
            }

            simulation
                .nodes(dataFilter5)
                .on("tick", ticked);

            var push_bachelor = {
                "D1": {
                    x: width * 3 / 6,
                    y: height * 1.3 / 6
                },
                "N/A": {
                    x: width * 3 / 6,
                    y: height * 4 / 6
                }
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

            d3.selectAll(".eleventh-circle")
                .transition()


                .duration(function(d, i) {

                    return 6000;
                })
                // .attr("cx", function(d, i) {
                //   // if(d["ELIMINATION-2"] == "E"){
                //     return (15 + 25 * i + 2 * i ** 2) -100;
                //         // }
                // })
                .attr("cy", function(d, i) {
                    if (d["ELIMINATION-7"] == "E") {

                        return 7000;
                    }

                })

            splitBubbles('DATES-6');

        }

        function sec_12() {
            canvas_clear();
            console.log("section 12 - DATE 7: FINALE");

            // D3 Projection


            var dataFilter6 = data.filter(function(d) {
                // console.log(d)

                return d["ELIMINATION-1"] != "E" && d["ELIMINATION-2"] != "E" && d["ELIMINATION-2"] != "EQ" &&
                    d["ELIMINATION-3"] != "E" && d["ELIMINATION-3"] != "ED" && d["ELIMINATION-4"] != "E" && d["ELIMINATION-4"] != "ED" && d["ELIMINATION-5"] != "E" &&
                    d["ELIMINATION-6"] != "E" && d["ELIMINATION-7"] != "E";
            });
            // D3 Projection

            // console.log(dataFilter6)

            var simulation = d3.forceSimulation()
                .force("collide", d3.forceCollide(function(d) {
                    return d.r + 4;
                }).iterations(16))
                .force("charge", d3.forceManyBody())
                .force("y", d3.forceY().y(height / 2))
                .force("x", d3.forceX().x(width / 2));

                var defs = svg.append("defs").attr("id", "imgdefs");

                var catpattern = defs.append("pattern")


                defs.selectAll(".circle-pattern")
                    .data(data)
                    .enter().append("pattern")
                    .attr("class", "artist-pattern")
                    .attr("id", function(d) {
                        // return d.NAME.toLowerCase().replace(" ", "_");
                        return d.ID_NAME;
                    })
                    .attr("height", "100%")
                    .attr("width", "100%")
                    .attr("patternContentUnits", "objectBoundingBox")
                    .attr("x", "0")
                    .attr("y", "0")
                    .append("image")
                    .attr("height", 1)
                    .attr("width", 1)
                    .attr("preserveAspectRatio", "none")
                    .attr("xlink:href", function(d, i) {
                        // return imgurl;
                        console.log(d.NAME)
                        return "./images/" + d.ID_NAME + ".jpeg"
                    });

            var circles = svg
                // .selectAll("image")
                .selectAll("circle")
                .data(dataFilter6);



            var circlesEnter = circles.enter().append("circle")
                .attr("class", "twelfth-circle")
                .style("fill", function(d, i) {
                    // return colorscale(d.PARTICIPANTS);
                    return "url(#" + d.ID_NAME + ")"
                })
                .attr("r", function(d, i) {

                    if (d.NAME == "Jason Mesnick") {

                        return d.r + 15;

                    } else {
                        return d.r;
                    }
                })
                .attr("cx", function(d, i) {
                    return 175 + 25 * i + 2 * i ** 2;
                })
                .attr("cy", function(d, i) {
                    return 250;
                })
                .style("stroke", function(d,i){


                    // if(d["ELIMINATION-4"] == "R"){
                    //     return  "#B266FF";
                    // }
                    if(d["ELIMINATION-8"] == "W"){
                        return  "#EF2A2A";
                    }
                    // return colorscale(d.PARTICIPANTS);
                })
                .style("stroke-width", function(d){
                    return 4;
                })

                // .style("fill", function(d, i) {
                //     return colorscale(d.PARTICIPANTS);
                // })


            circles = circles.merge(circlesEnter);


            function ticked() {

                circles
                    .attr("cx", function(d) {
                        return d.x = Math.max(d.r, Math.min(width - d.r, d.x));

                    })
                    .attr("cy", function(d) {
                        return d.y = Math.max(d.r, Math.min(height - d.r, d.y));
                    });
            }

            simulation
                .nodes(dataFilter6)
                .on("tick", ticked);

            var push_bachelor = {
                "E": {
                    x: width * 0.5 / 2,
                    y: height * 3 / 6
                },
                "W": {
                    x: width * 1.5 / 2,
                    y: height * 3 / 6
                }

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

            splitBubbles('ELIMINATION-8');

        }

        function sec_13() {
            canvas_clear();
            console.log("section 13 - DATE 7: AFTERMATH");

            // D3 Projection


            var dataFilter7 = data.filter(function(d) {
                // console.log(d)

                return d["ELIMINATION-1"] != "E" && d["ELIMINATION-2"] != "E" && d["ELIMINATION-2"] != "EQ" &&
                    d["ELIMINATION-3"] != "E" && d["ELIMINATION-3"] != "ED" && d["ELIMINATION-4"] != "E" && d["ELIMINATION-4"] != "ED" && d["ELIMINATION-5"] != "E" &&
                    d["ELIMINATION-6"] != "E";
            });
            // D3 Projection

            // console.log(dataFilter7)


            var simulation = d3.forceSimulation()
                .force("collide", d3.forceCollide(function(d) {
                    return d.r + 4;
                }).iterations(16))
                .force("charge", d3.forceManyBody())
                .force("y", d3.forceY().y(height / 2))
                .force("x", d3.forceX().x(width / 2));

                var defs = svg.append("defs").attr("id", "imgdefs");

                var catpattern = defs.append("pattern")


                defs.selectAll(".circle-pattern")
                    .data(data)
                    .enter().append("pattern")
                    .attr("class", "artist-pattern")
                    .attr("id", function(d) {
                        // return d.NAME.toLowerCase().replace(" ", "_");
                        return d.ID_NAME;
                    })
                    .attr("height", "100%")
                    .attr("width", "100%")
                    .attr("patternContentUnits", "objectBoundingBox")
                    .attr("x", "0")
                    .attr("y", "0")
                    .append("image")
                    .attr("height", 1)
                    .attr("width", 1)
                    .attr("preserveAspectRatio", "none")
                    .attr("xlink:href", function(d, i) {
                        // return imgurl;
                        console.log(d.NAME)
                        return "./images/" + d.ID_NAME + ".jpeg"
                    });

            var circles = svg
                // .selectAll("image")
                .selectAll("circle")
                .data(dataFilter7);



            var circlesEnter = circles.enter().append("circle")
                .attr("class", "thirteenth-circle")
                .style("fill", function(d, i) {
                    // return colorscale(d.PARTICIPANTS);
                    return "url(#" + d.ID_NAME + ")"
                })
                .attr("r", function(d, i) {

                    if (d.NAME == "Jason Mesnick") {

                        return d.r + 15;

                    } else {
                        return d.r;
                    }
                })
                .attr("cx", function(d, i) {
                    return 175 + 25 * i + 2 * i ** 2;
                })
                .attr("cy", function(d, i) {
                    return 250;
                })

                // .style("fill", function(d, i) {
                //     return colorscale(d.PARTICIPANTS);
                // })


            circles = circles.merge(circlesEnter);


            function ticked() {

                circles
                    .attr("cx", function(d) {
                        return d.x = Math.max(d.r, Math.min(width - d.r, d.x));

                    })
                    .attr("cy", function(d) {
                        return d.y = Math.max(d.r, Math.min(height - d.r, d.y));
                    });
            }

            simulation
                .nodes(dataFilter7)
                .on("tick", ticked);

                var push_bachelor = {
                    "Not Married": {
                        x: width * 0 / 1,
                        y: height * 3 / 6
                    },
                    "Married": {
                        x: width * 1 / 2,
                        y: height * 2 / 6
                    },
                    "Bachelorette": {
                        x: width * 2 / 2,
                        y: height * 3 / 6
                    },


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

                splitBubbles('AFTERMATH');

            // D3 Projection

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
                    // sec_3,
                    sec_4,
                    sec_5,
                    sec_6,
                    sec_7,
                    sec_8,
                    sec_9,
                    sec_9_1,
                    sec_10,
                    sec_11,
                    sec_12,
                    sec_13
                ][i]();

            });




    });
