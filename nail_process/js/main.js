// save this file as sketch.js
// Sketch One
var tileW, tileHt, centerItemX, centerItemY;
var textSize = 50,
width = window.innerWidth / 3.25,
height = window.innerHeight / 3.25;
// ;

var s = function(p) { // p could be any variable name
  var x = 100;
  var y = 100;
  var header;
  var num = '1';
  var font;
  var img, img2;
  var gif_createImg;
  var img_width,img_height;


  p.preload = function() {
    img = p.loadImage('assets/tile-1-hands.png');
    // img2 = p.loadImage('assets/testHands.gif');

    // gif_createImg = createImg("tile-1-hands.gif");


  }

  p.setup = function() {

    p.createCanvas(width, height);
    font = 'Helvetica';

    tileW = (window.innerWidth / 3.25);
    tileH = (window.innerHeight / 3.25);
    centerItemX = ((window.innerWidth / 3.25) - (window.innerWidth / 6.50));
    centerItemY = window.innerHeight / 6.5;
    // console.log(window.innerWidth/3.05);
    // console.log(window.innerHeight);
    //
    // console.log("WIDTH/2:" + ((window.innerWidth/3.05) - (window.innerWidth/6.10)));
    img2 = p.loadGif('assets/testHands.gif');



  };

  p.draw = function() {


    img_width = window.innerWidth / 4;
    img_height= window.innerHeight / 4;
    p.background(245,135,125);

    p.imageMode(p.CENTER);
    p.image(img, centerItemX, centerItemY , img_width,img_height );
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


      p.background(252,197,119);

      p.imageMode(p.CENTER);

      p.image(img2, centerItemX, centerItemY , img_width,img_height );


      num = "";
      p.textSize(textSize);
      p.text(num, centerItemX, centerItemY);



    } else {


      p.imageMode(p.CENTER);
      p.image(img, centerItemX, centerItemY , img_width,img_height );



      num = "1";
      p.text(num, centerItemX, centerItemY + 20);

    }


  };


};


var myp5 = new p5(s, 'sketch1');








// Sketch Two
var t = function(p) {
  var x = 100.0;
  var y = 100;
  var num2 = '2';
  var img3, img4;
  var img_width,img_height;

  var speed = 2.5;
  p.preload = function() {
    img3 = p.loadImage('assets/tile-2-water.png');
    // img4 = p.loadImage('assets/testWater.gif');


  }

  p.setup = function() {
    p.createCanvas(width, height);

    tileW = (window.innerWidth / 3.25);
    tileH = (window.innerHeight / 3.25);
    centerItemX = ((window.innerWidth / 3.25) - (window.innerWidth / 6.50));
    centerItemY = window.innerHeight / 6.5;

    img4=  p.loadGif('assets/tile-2-water.gif');
  };

  p.draw = function() {

    img_width = window.innerWidth / 4.75;
    img_height= window.innerHeight / 3.5;

    p.background(245,135,125);

    p.imageMode(p.CENTER);
    p.image(img3, centerItemX, centerItemY ,  img_width,img_height );

    p.rectMode(p.CENTER);
    p.fill(100);

    p.rect(centerItemX, centerItemY, 100, 100);

    p.fill(255);
    p.textAlign(p.CENTER);
    p.textSize(textSize);

    p.text(num2, centerItemX, centerItemY + 20);

    if ((p.mouseX > 0) && (p.mouseX < tileW) && (p.mouseY > 0) && (p.mouseY < tileH)) {

      p.background(252,197,119);

      p.imageMode(p.CENTER);

      p.image(img4, centerItemX, centerItemY,  img_width,img_height );


      num2= "";
      p.textSize(textSize);
      p.text(num2, centerItemX, centerItemY);

    } else {

      p.imageMode(p.CENTER);
      p.image(img3, centerItemX, centerItemY,  img_width,img_height );

      num2 = "2";
      p.textSize(textSize);

      p.text(num2, centerItemX, centerItemY + 20);

    }



  };
};
var myp5 = new p5(t, 'sketch2');



// Sketch Three
var t = function(p) {
  var x = 100.0;
  var y = 100;
  var num3 = '3';
  var img5, img6;
  var img_width,img_height;

  var speed = 2.5;
  p.preload = function() {
    img5 = p.loadImage('assets/tile-3-file.png');
    // img6 = p.loadImage('assets/hand_2.png');


  }

  p.setup = function() {
    p.createCanvas(width, height);

    tileW = (window.innerWidth / 3.25);
    tileH = (window.innerHeight / 3.25);
    centerItemX = ((window.innerWidth / 3.25) - (window.innerWidth / 6.50));
    centerItemY = window.innerHeight / 6.5;

    img6 = p.loadGif('assets/tile-3-file.gif');

  };

  p.draw = function() {

    img_width = window.innerWidth / 4.5;
    img_height= window.innerHeight / 3.5;

    p.background(245,135,125);

    p.imageMode(p.CENTER);
    p.image(img5, centerItemX, centerItemY ,  img_width,img_height );

    p.rectMode(p.CENTER);
    p.fill(100);

    p.rect(centerItemX, centerItemY, 100, 100);

    p.fill(255);
    p.textAlign(p.CENTER);
    p.textSize(textSize);

    p.text(num3, centerItemX, centerItemY + 20);

    if ((p.mouseX > 0) && (p.mouseX < tileW) && (p.mouseY > 0) && (p.mouseY < tileH)) {

      p.background(252,197,119);

      p.imageMode(p.CENTER);

      p.image(img6, centerItemX, centerItemY,  img_width,img_height );


      num3 = "";
      p.textSize(textSize);
      p.text(num3, centerItemX, centerItemY);

    } else {
      // p.background(100);
      // p.background(255, 151, 148);
      p.imageMode(p.CENTER);
      p.image(img5, centerItemX, centerItemY , img_width,img_height );

      num3 = "3";
      p.textSize(textSize);

      p.text(num3, centerItemX, centerItemY + 20);

    }



  };
};
var myp5 = new p5(t, 'sketch3');
