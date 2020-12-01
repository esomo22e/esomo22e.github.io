// save this file as sketch.js
// Sketch Seven
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

    if ((p.mouseX > 0) && (p.mouseX < (p.windowWidth/3.05)) && (p.mouseY > 0) && (p.mouseY < (p.windowHeight/3.05))){
      p.background(150,120,220);
      p.fill(224,45,130);
      p.rect(x,y,50,50);
    }
    else{
      p.background(0);
      p.fill(255);
      p.rect(x,y,50,50);
    }
  };
};
var myp5 = new p5(s, 'sketch7');

// Sketch Eight
var t = function( p ) {
  var x = 100.0;
  var y = 100;
  var speed = 2.5;
  p.setup = function() {
    p.createCanvas(p.windowWidth/3.05, p.windowHeight/3.05);
  };

  p.draw = function() {
    p.background(100);
    p.fill(1);
    if ((p.mouseX > 0) && (p.mouseX < (p.windowWidth/3.05)) && (p.mouseY > 0) && (p.mouseY < (p.windowHeight/3.05))){
      p.background(200, 50, 137);

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
var myp5 = new p5(t, 'sketch8');

// Sketch Nine
var t = function( p ) {
  var x = 100.0;
  var y = 100;
  var speed = 2.5;
  p.setup = function() {
    p.createCanvas(p.windowWidth/3.05, p.windowHeight/3.05);
  };

  p.draw = function() {
    p.background(120,10,100);
    p.fill(1);
    if ((p.mouseX > 0) && (p.mouseX < (p.windowWidth/3.05)) && (p.mouseY > 0) && (p.mouseY < (p.windowHeight/3.05))){
      p.background(20,150,20);

    x += speed;
    if(x > p.width){
      x = 0;
    }
    p.ellipse(x,y,50,50);
  }
  else{
    p.background(120,10,100);

  }

  };
};
var myp5 = new p5(t, 'sketch9');
