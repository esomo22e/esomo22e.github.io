var d = 300;
function setup(){
  createCanvas(windowWidth, windowHeight);
    background(173,216,230);

  // noFill();
  // strokeWeight(3);
}

function draw(){

  background(173,216,230);
  // translate(width/4, height/4);
  var step = 10;
      noStroke();
  // ellipse(windowWidth/4, windowHeight * 0.75, d,d);
    fill(255,0,0);
    // ellipse(windowWidth * 0.75, windowHeight *0.25, d,d);
    ellipse(windowWidth * 0.25, windowHeight *0.75, d,d);
   for(var j = 0; j <= (windowHeight); j+=12){
        for(var i =0; i <= (windowWidth); i+=12){
            stroke(j*0.2,j * 0.2,j * 1);
            strokeWeight(0.01*j);
            // line(i,0,i, windowHeight);
          line(0,j,windowWidth,j);

        }

   }

  var r = d/2;
     // translate(windowWidth/4, windowHeight * 0.75);
  translate(windowWidth * 0.75, windowHeight * 0.25);
  for(var y = -r+ step/2; y <= d -step/2; y+=step){
    var wave = abs(pow(sin(y * 0.003 *0.1),10));
    var wy = y - map(wave,0,1,-step,step);
    var X = sqrt(sq(r) - sq(y)) * map(wave, 0, 1, 1, 1.1);
    var cRate = map(y, -r + step / 2, r + step / 2, 0, 1);
    stroke(255,0,0);

    beginShape();
    // ;
    //
    for(var x = -X; x <= X; x += 1){
        //
           //
                strokeWeight(x * 0.03);

      vertex(x,wy);
    }
    endShape();
  }

  textSize(50);
  stroke(255,215,0);
  strokeWeight(5);
text('WEDNESDAY', -500, 30);
  text('02.05.2020', -470, 70);



}
