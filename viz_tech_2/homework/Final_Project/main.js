d3.queue()
.defer(d3.csv, "./data/clothes_perc.csv")
.defer(d3.csv, "./data/words_perc.csv")
.defer(d3.csv, "./data/schools.csv")
.await(function(error, data_clothes, data_words, data_schools) {
  console.log(data_clothes);
  console.log(data_words);
  console.log(data_schools);

  var width = d3.select('#graph').node().offsetWidth;
  var height = window.innerHeight * 0.7;

  var margin = {
    top: 20,
    right: 20,
    bottom: 50,
    left: 100
  };

  var chartWidth = width - margin.left - margin.right;
  var chartHeight = height - margin.top - margin.bottom;


  var svg = d3.select("#graph")
  .attr("width", width)
  .attr("height", height);

  function canvas_clear(){

  svg
      .selectAll("*")
      .remove();
  }

  function sec_1(){
    console.log("section 1")
    canvas_clear();

  }

  function sec_2(){  //who's won more
    canvas_clear();

      console.log("section 2")

  }

  function sec_3(){
    canvas_clear();

          console.log("section 3")

  }

  function sec_4(){
    canvas_clear();

      console.log("section 4")


  }

  function sec_5(){

    canvas_clear();

      console.log("section 5")


  }



  var gs = d3.graphScroll()
      .container(d3.select('#container'))
      .graph(d3.selectAll('#graph'))
      .sections(d3.selectAll('#sections > div'))
      // .offset(innerWidth < 900 ? innerHeight - 30 : 200)
      .eventId('uniqueId1')
      .on('active', function(i){



              [
                  sec_1,
                sec_2,
                sec_3,
                sec_4,
                sec_5 ][i]();

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
