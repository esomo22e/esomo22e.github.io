d3.queue()
.defer(d3.csv, "./data/clothes_perc.csv")
.defer(d3.csv, "./data/words_perc.csv")
.defer(d3.csv, "./data/schools.csv")
.await(function(error, data_clothes, data_words, data_schools) {
  console.log(data_clothes);
  console.log(data_words);
  console.log(data_schools);


function sec_1(){
  console.log("part 1");
}
function sec_2(){
  console.log("part 2");

}
function sec_3(){
  console.log("part 3");

}
function sec_4(){
  console.log("part 4");

}
function sec_5(){
  console.log("part 5");

}

var gs = d3.graphScroll()
    .container(d3.select('#container'))
    .graph(d3.selectAll('#graph'))
    .sections(d3.selectAll('#sections > div'))
    .eventId('uniqueId1')
    .on('active', function(i){


});

});
