// save this file as sketch.js
// Sketch One
  var tileW, tileHt, centerItemX, centerItemY;
  var textSize = 40;

var s = function( p ) { // p could be any variable name
  var x = 100;
  var y = 100;
  var header;
  var num = '1';
  var font;
  var img, img2;




  p.preload = function(){
    img =  p.loadImage('assets/hand_1.png');
    img2 =  p.loadImage('assets/hand_2.png');


  }

  p.setup = function() {

    p.createCanvas(window.innerWidth/3.05, window.innerHeight/3.05);
    font = 'Helvetica';

    tileW = (window.innerWidth/3.05);
    tileH = (window.innerHeight/3.05);
    centerItemX = ((window.innerWidth/3.05) - (window.innerWidth/6.10));
    centerItemY = window.innerHeight/6.05 + 10;
    // console.log(window.innerWidth/3.05);
    // console.log(window.innerHeight);
    //
    // console.log("WIDTH/2:" + ((window.innerWidth/3.05) - (window.innerWidth/6.10)));



  };

  p.draw = function() {


      p.background(255, 151, 148);
        p.imageMode(p.CENTER);
      p.image(img, centerItemX, centerItemY,300,300);
      // textSize = 40;

      p.textSize(textSize);

      p.text(num, centerItemX, centerItemY);


    if ((p.mouseX > 0) && (p.mouseX < tileW) && (p.mouseY > 0) && (p.mouseY < tileH)){

      // p.background(120,20,231);
      p.background(255, 151, 148);

      p.imageMode(p.CENTER);

      p.image(img2, centerItemX,centerItemY,300,300);

      // text = "";
      // textSize = 40;
      // textSize = textSize + 20;
      // p.textSize(textSize);
      // // p.textFont(font);
      // p.textFont("sans-serif");
      // // p.textFont("bold");
      //   p.fill(255);
      //   p.textAlign(p.CENTER);
        // p.text(text, centerItemX, centerItemY);
        num = "";
        p.textSize(textSize);
        p.text(num, centerItemX, centerItemY);



      }
    else{

      //
      // p.background(255, 151, 148);
      p.imageMode(p.CENTER);
      p.image(img, centerItemX, centerItemY,300,300);


      // textSize = 40;
      // p.textSize(textSize);
      // // p.textFont(font);
      // p.textFont("sans-serif");
      //   p.fill(255);
      //   p.textAlign(p.CENTER);
      //
      //   p.text(text, centerItemX, centerItemY);
      num = "1";
      p.text(num, centerItemX, centerItemY);



    }


  };


};


var myp5 = new p5(s, 'sketch1');








// Sketch Two
var t = function( p ) {
  var x = 100.0;
  var y = 100;
  var num2 = '2';

  var speed = 2.5;
  p.setup = function() {
    p.createCanvas(window.innerWidth/3.05, window.innerHeight/3.05);
  };

  p.draw = function() {
    // p.fill(1);
    p.background(255, 151, 148);
     // console.log(window.innerWidth/3.05)
     // console.log(window.innerWidth * (2/3.05))
     p.textSize(textSize);


     p.text(num2, centerItemX, centerItemY);

     if ((p.mouseX >0) && (p.mouseX < tileW) && (p.mouseY > 0) && (p.mouseY < tileH)){

       // p.background(50,50,100);
       p.background(255, 151, 148);

       // x += speed;
       // if(x > p.width){
       //   x = 0;
       // }
       // p.ellipse(x,y,50,50);

       num2 = "";
       p.textSize(textSize);

       p.text(num2, centerItemX, centerItemY);

}
else{
  // p.background(100);
  p.background(255, 151, 148);

  num2 = "2";
  p.textSize(textSize);

  p.text(num2, centerItemX, centerItemY);

}



  };
};
var myp5 = new p5(t, 'sketch2');

// Sketch Three
var t = function( p ) {
  var x = 100.0;
  var y = 100;
  var speed = 2.5;
  var num3 = '3';

  p.setup = function() {
    p.createCanvas(window.innerWidth/3.05, window.innerHeight/3.05);
  };

  p.draw = function() {
    p.background(255, 151, 148);
    p.fill(1);

    p.textSize(textSize);

    p.text(num3, centerItemX, centerItemY);
    if ((p.mouseX >0) && (p.mouseX < tileW) && (p.mouseY > 0) && (p.mouseY < tileH)){

      // p.background(250,250,100);
      p.background(255, 151, 148);


      // x += speed;
      // if(x > p.width){
      //   x = 0;
      // }
      // p.ellipse(x,y,50,50);
      num3 = "";
      p.textSize(textSize);

      p.text(num3, centerItemX, centerItemY);
}
else{
  p.background(255, 151, 148);

  num3 = "3";
  p.textSize(textSize);

  p.text(num3, centerItemX, centerItemY);

}

  };
};
var myp5 = new p5(t, 'sketch3');
