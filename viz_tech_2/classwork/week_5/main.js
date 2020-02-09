var realtimeURL = "https://whiteboard.datawheel.us/api/google-analytics/realtime/random";
     var frequency = 1 * 1000; // 1 seconds

     var dataMax = 5;
     var data = [];

     var width = window.innerWidth;
     var height = window.innerHeight;
     var margin = {
       top: 20,
       right: 20,
       bottom: 50,
       left: 100
     };


     var chartWidth = width - margin.left - margin.right;
var chartHeight = height - margin.top - margin.bottom;

     var svg = d3.select("#chart")
       .attr("width", width)
       .attr("height", height);

     // var barWidth = chartWidth / dataMax;

     var domainValue = d3.range(1, dataMax +1);

     var x = d3.scaleBand()
            .domain(domainValue.reverse())
            .range([margin.left, margin.left + chartWidth])
            //inside the bar - in between bars
            .paddingInner(0.2)
            //outside the bar
            .paddingOuter(0.1);

            var barWidth = x.bandwidth();

       // .domain([dataMax, 1])
       // .range([margin.left, margin.left + chartWidth - barWidth]);

     function fetchData() {

       d3.json(realtimeURL, function(error, users) {

         var dataObject = {
           users: users,
           timestamp: new Date()
         };

         data.unshift(dataObject);
         if (data.length > dataMax) data.pop();
         console.log (data);

         var maximum = d3.max(data, function(d) {
           return d.users;
         });

         var barHeight = d3.scaleLinear()
           .domain([0, maximum])
           .range([0, chartHeight]);

           var y = d3.scaleLinear()
   .domain([0, maximum])
   .range([margin.top + chartHeight, margin.top]);



    var yAxis = d3.axisLeft(y);
          svg.select("#y")
          .attr("transform", "translate(" + margin.left + ",0)")
          .transition().duration(frequency/2)
          .call(yAxis);


    var xAxis = d3.axisBottom(x)
    .tickFormat(function(d){
      var tickData = data[d-1];
      if(tickData){
        var now = new Date();
        var msAgo = now -tickData.timestamp;
        var secAgo = Math.round(msAgo/1000);
        // var time = tickData.timestamp;
        if(secAgo === 0){
          return "Now"
        }
        // else if(secAgo === 1){
        //   return secAgo + " second ago"
        // }
        else{
          //Single if expression
          //word is variable
          //if secondsAgo is truthy 1 -> second
          //if false -> seconds
          var word = secAgo  === 1 ? "second" : "seconds";
          return secAgo + " " + word+ " ago";
        }

      }
      else{
        return "";
      }
      console.log(d, tickData)
      // return d;
    });
      svg.select("#x")
          .attr("transform", "translate(0," + (margin.top + chartHeight) +")")
          .call(xAxis);

          function zeroState(selection){
            selection
             .attr("height", 0)
             // .attr("y", y(0))
                    .attr("y", function(d){
                      return d.users;
                    });
          }

         var bars = svg.select("#shapes").selectAll(".bar")
           .data(data, function(d) {
             return d.timestamp;
           });

         var enter = bars.enter().append("rect")
           .attr("class", "bar")
           .attr("width", barWidth)

           .attr("fill", "lavender")
           .attr("stroke", "purple")
           .call(zeroState)
           //Replace zero state
                // .attr("height", 0)
           // .attr("y", y(0))
           // .attr("y", margin.top + chartHeight)
           .attr("x", function(d, i) {
             return x(i + 1);
           });

         bars.merge(enter)
           .transition().duration(frequency / 2)
           .attr("width", barWidth)
           .attr("height", function(d) {
             return barHeight(d.users);
           })
           .attr("y", function(d) {
             // var h = barHeight(d.users);
             // return height - h;
             return y(d.users)
           })
           .attr("x", function(d, i) {
             return x(i + 1);
           });

         bars.exit()
           .transition().duration(frequency / 2)
           .call(zeroState)
           //Replace zero state
           // .attr("height", 0)
           // // .attr("y", height)
           // .attr("y", y(0))
           .remove();

       });

     }

     fetchData();
     setInterval(fetchData, frequency);
