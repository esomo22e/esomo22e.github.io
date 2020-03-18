// d3.csv("./data/clothes_perc.csv", function(error, data){
//     console.log(data);
// });
d3.queue()
.defer(d3.csv, "./data/clothes_perc.csv")
.defer(d3.csv, "./data/words_perc.csv")
.defer(d3.csv, "./data/schools.csv")
.await(function(error, data_clothes, data_words, data_schools) {
  console.log(data_clothes);
  console.log(data_words);
  console.log(data_schools);


});
