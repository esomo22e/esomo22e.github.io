// save this file as sketch.js
// Sketch Seven
var tileW, tileHt, centerItemX, centerItemY;
var textSize = 50;
// ;

var s = function(p) { // p could be any variable name
  var x = 100;
  var y = 100;
  var header;
  var num = '7';
  var font;
  var img, img2;



  p.preload = function() {
    img = p.loadImage('assets/tile-7-glue.png');
    // img2 = p.loadImage('assets/hand_2.png');


  }

  p.setup = function() {

    p.createCanvas(window.innerWidth / 3.05, window.innerHeight / 3.05);
    font = 'Helvetica';

    tileW = (window.innerWidth / 3.05);
    tileH = (window.innerHeight / 3.05);
    centerItemX = ((window.innerWidth / 3.05) - (window.innerWidth / 6.10));
    centerItemY = window.innerHeight / 6.05;
    // console.log(window.innerWidth/3.05);
    // console.log(window.innerHeight);
    //
    // console.log("WIDTH/2:" + ((window.innerWidth/3.05) - (window.innerWidth/6.10)));

    img2 = p.loadGif('assets/tile-7-glue.gif');


  };

  p.draw = function() {


    p.background(255, 151, 148);


    p.imageMode(p.CENTER);
    p.image(img, centerItemX, centerItemY + 15, window.innerWidth / 3.5, window.innerHeight / 3.5);
    // textSize = 40;

    p.rectMode(p.CENTER);
    p.fill(100);
    // p.rect(centerItemX, centerItemY-10, window.innerWidth/3.05, window.innerHeight/3.05);

    p.rect(centerItemX, centerItemY, 100, 100);

    p.fill(255);
    p.textAlign(p.CENTER);
    p.textSize(textSize);

    p.text(num, centerItemX, centerItemY + 20);



    if ((p.mouseX > 0) && (p.mouseX < tileW) && (p.mouseY > 0) && (p.mouseY < tileH)) {

      // p.background(120,20,231);
      p.background(255, 151, 148);

      p.imageMode(p.CENTER);

      p.image(img2, centerItemX, centerItemY, 300, 300);

      num = "";
      p.textSize(textSize);
      p.text(num, centerItemX, centerItemY);



    } else {

      //
      // p.background(255, 151, 148);
      p.imageMode(p.CENTER);
      p.image(img, centerItemX, centerItemY + 15, window.innerWidth / 3.5, window.innerHeight / 3.5);



      num = "7";
      p.text(num, centerItemX, centerItemY + 20);



    }


  };


};
var myp5 = new p5(s, 'sketch7');

// Sketch Eight
var t = function(p) {
  var x = 100.0;
  var y = 100;
  var num2 = '8';
  var img3, img4;

  var speed = 2.5;
  p.preload = function() {
    img3 = p.loadImage('assets/tile-8-press.png');
    // img4 = p.loadImage('assets/hand_2.png');


  }

  p.setup = function() {
    p.createCanvas(window.innerWidth / 3.05, window.innerHeight / 3.05);

    tileW = (window.innerWidth / 3.05);
    tileH = (window.innerHeight / 3.05);
    centerItemX = ((window.innerWidth / 3.05) - (window.innerWidth / 6.10));
    centerItemY = window.innerHeight / 6.05;

    img4=  p.loadGif('assets/tile-8-press.gif');

  };

  p.draw = function() {
    // p.fill(1);
    p.background(255, 151, 148);
    // console.log(window.innerWidth/3.05)
    // console.log(window.innerWidth * (2/3.05))
    p.imageMode(p.CENTER);
    p.image(img3, centerItemX, centerItemY - 5, window.innerWidth / 4.5, window.innerHeight / 3.25);
    // textSize = 40;

    p.rectMode(p.CENTER);
    p.fill(100);
    // p.rect(centerItemX, centerItemY-10, window.innerWidth/3.05, window.innerHeight/3.05);

    p.rect(centerItemX, centerItemY, 100, 100);

    p.fill(255);
    p.textAlign(p.CENTER);
    p.textSize(textSize);

    p.text(num2, centerItemX, centerItemY + 20);

    if ((p.mouseX > 0) && (p.mouseX < tileW) && (p.mouseY > 0) && (p.mouseY < tileH)) {

      // p.background(50,50,100);
      p.background(255, 151, 148);

      p.imageMode(p.CENTER);

      p.image(img4, centerItemX, centerItemY, 300, 300);


      num = "";
      p.textSize(textSize);
      p.text(num2, centerItemX, centerItemY);

    } else {
      // p.background(100);
      // p.background(255, 151, 148);
      p.imageMode(p.CENTER);
      p.image(img3, centerItemX, centerItemY - 5, window.innerWidth / 4.5, window.innerHeight / 3.25);

      num2 = "8";
      p.textSize(textSize);

      p.text(num2, centerItemX, centerItemY + 20);

    }



  };
};
var myp5 = new p5(t, 'sketch8');

// Sketch Nine
var t = function(p) {
  var x = 100.0;
  var y = 100;
  var num3 = '9';
  var img5, img6;

  var speed = 2.5;
  p.preload = function() {
    img5 = p.loadImage('assets/tile-9-fake-complete.png');
    // img6 = p.loadImage('assets/hand_2.png');


  }

  p.setup = function() {
    p.createCanvas(window.innerWidth / 3.05, window.innerHeight / 3.05);

    tileW = (window.innerWidth / 3.05);
    tileH = (window.innerHeight / 3.05);
    centerItemX = ((window.innerWidth / 3.05) - (window.innerWidth / 6.10));
    centerItemY = window.innerHeight / 6.05;

    img6 = p.loadGif('assets/tile-9-complete.gif');

  };

  p.draw = function() {
    // p.fill(1);
    p.background(255, 151, 148);
    // console.log(window.innerWidth/3.05)
    // console.log(window.innerWidth * (2/3.05))
    p.imageMode(p.CENTER);
    p.image(img5, centerItemX, centerItemY +15, window.innerWidth / 6, window.innerHeight / 3.5);
    // textSize = 40;

    p.rectMode(p.CENTER);
    p.fill(100);
    // p.rect(centerItemX, centerItemY-10, window.innerWidth/3.05, window.innerHeight/3.05);

    p.rect(centerItemX, centerItemY, 100, 100);

    p.fill(255);
    p.textAlign(p.CENTER);
    p.textSize(textSize);

    p.text(num3, centerItemX, centerItemY + 20);

    if ((p.mouseX > 0) && (p.mouseX < tileW) && (p.mouseY > 0) && (p.mouseY < tileH)) {

      // p.background(50,50,100);
      p.background(255, 151, 148);

      p.imageMode(p.CENTER);

      p.image(img6, centerItemX, centerItemY + 20, 300, 300);


      num3 = "";
      p.textSize(textSize);
      p.text(num3, centerItemX, centerItemY);

    } else {
      // p.background(100);
      // p.background(255, 151, 148);
      p.imageMode(p.CENTER);
      p.image(img5, centerItemX, centerItemY + 15, window.innerWidth / 6, window.innerHeight / 3.5);

      num3 = "9";
      p.textSize(textSize);

      p.text(num3, centerItemX, centerItemY + 20);

    }



  };
};
var myp5 = new p5(t, 'sketch9');
