// save this file as sketch.js
// Sketch One
var s = function( p ) { // p could be any variable name
  var x = 100;
  var y = 100;
  p.setup = function() {
    p.createCanvas(p.windowWidth/3.05, p.windowHeight/3.05);
  };

  p.draw = function() {

    p.background(0);
    p.fill(255);
    p.rect(x,y,50,50);

    // console.log(p.mouseX);

    if ((p.mouseX > 0) && (p.mouseX < (p.windowWidth/3.05)) && (p.mouseY > 0) && (p.mouseY < (p.windowHeight/3.05))){
      p.background(50,120,120);
      p.fill(124,45,230);
      p.rect(x,y,50,50);
    }
    else{
      p.background(0);
      p.fill(255);
      p.rect(x,y,50,50);
    }
  };
};
var myp5 = new p5(s, 'sketch1');

// Sketch Two
var t = function( p ) {
  var x = 100.0;
  var y = 100;
  var speed = 2.5;
  p.setup = function() {
    p.createCanvas(p.windowWidth/3.05, p.windowHeight/3.05);
  };

  p.draw = function() {
    p.fill(1);
     p.background(100);
     console.log(p.windowWidth/3.05)
     console.log(p.windowWidth * (2/3.05))
     if ((p.mouseX >0) && (p.mouseX < (p.windowWidth/3.05)) && (p.mouseY > 0) && (p.mouseY < (p.windowHeight/3.05))){

       p.background(50,50,100);

       x += speed;
       if(x > p.width){
         x = 0;
       }
       p.ellipse(x,y,50,50);
}
else{
  p.background(100);

}


    //   if ((p.mouseX > 0) && (p.mouseX < (p.windowWidth * (2/3.05))) &&
    //     (p.mouseY > 0) && (p.mouseY < (p.windowWidth/3.05))){
    // p.background(150,200,189);
    //
    // x += speed;
    // if(x > p.width){
    //   x = 0;
    // }
    // p.ellipse(x,y,50,50);
    // }
    // else{
    //   p.background(100);
    //
    // }


  };
};
var myp5 = new p5(t, 'sketch2');

// Sketch Three
var t = function( p ) {
  var x = 100.0;
  var y = 100;
  var speed = 2.5;
  p.setup = function() {
    p.createCanvas(p.windowWidth/3.05, p.windowHeight/3.05);
  };

  p.draw = function() {
    p.background(20,10,100);
    p.fill(1);
    if ((p.mouseX >0) && (p.mouseX < (p.windowWidth/3.05)) && (p.mouseY > 0) && (p.mouseY < (p.windowHeight/3.05))){

      p.background(250,250,100);

      x += speed;
      if(x > p.width){
        x = 0;
      }
      p.ellipse(x,y,50,50);
}
else{
  p.background(20,10,100);

}

  };
};
var myp5 = new p5(t, 'sketch3');
