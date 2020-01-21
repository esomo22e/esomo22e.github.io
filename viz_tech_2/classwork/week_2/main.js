// var data = [];
//
// function convert2numbers(d,i){
//   // console.log(i, d.country);
//
//   d.value = +d.value;
// }
//
// // function drawLabel(){
// //   d3.select("#label").html(data);
// //
// // }
//
// function analyzeData(error, newData){
//
//   // data[0].value = 0;
//
//
//
//   data.forEach(convert2numbers);
//   console.log("error:", error);
//   console.log("data:", data);
//
//   data = newData;
//   // drawLabel();
//
//
// };
//
// var url = "https://datausa.io/api/data?drilldowns=State&measures=Population&year=latest";
//
// // d3.csv("data.csv", analyzeData);
// // d3.json(url, analyzeData);
//
// d3.json(url, function(error, data){
//
//   console.log(data);
// });
// console.log("Hello Eunice!")

var realtimeUrl = "https://whiteboard.datawheel.us/api/google-analytics/realtime/111999474";
var frequency = 10 * 1000;
function fetchData() {
  d3.json(realtimeUrl, function(err, users) {
    console.log(users);

    d3.select("#users").html("There are "+users+ " this night");
  });
}

setInterval(fetchData, frequency);
