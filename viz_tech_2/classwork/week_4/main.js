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
 }
