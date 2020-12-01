// save this file as sketch.js
// Sketch Four
var s = function( p ) { // p could be any variable name
  var x = 100;
  var y = 100;
  p.setup = function() {
    p.createCanvas(p.windowWidth/3, p.windowHeight/3);
  };

  p.draw = function() {
    p.background(0);
    p.fill(255);
    p.rect(x,y,50,50);

    if ((p.mouseX > 0) && (p.mouseX < (p.windowWidth/3)) && (p.mouseY > 0) && (p.mouseY < (p.windowHeight/3))){
      p.background(100,200,100);
      p.fill(255,0,255);
      p.rect(x,y,50,50);

    }
    else{
      p.background(0);
      p.fill(255);
      p.rect(x,y,50,50);
    }
  };
};
var myp5 = new p5(s, 'sketch4');

// Sketch Five
var t = function( p ) {
  var x = 100.0;
  var y = 100;
  var speed = 2.5;
  p.setup = function() {
    p.createCanvas(p.windowWidth/3, p.windowHeight/3);
  };

  p.draw = function() {
    p.background(100);
    p.fill(1);
    if ((p.mouseX > 0) && (p.mouseX < (p.windowWidth/3)) && (p.mouseY > 0) && (p.mouseY < (p.windowHeight/3))){
      p.background(100, 50, 187);

      x += speed;
      if(x > p.width){
        x = 0;
      }
      p.ellipse(x,y,50,50);
    }
    else{
      p.background(100);

    }


  };
};
var myp5 = new p5(t, 'sketch5');

// Sketch Six
var t = function( p ) {
  var x = 100.0;
  var y = 100;
  var speed = 2.5;
  p.setup = function() {
    p.createCanvas(p.windowWidth/3, p.windowHeight/3);
  };

  p.draw = function() {
    p.background(20,10,100);
    p.fill(1);
    if ((p.mouseX > 0) && (p.mouseX < (p.windowWidth/3)) && (p.mouseY > 0) && (p.mouseY < (p.windowHeight/3))){
      p.background(220,150,220);

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
var myp5 = new p5(t, 'sketch6');
