// save this file as sketch.js
// Sketch One
  var tileW, tileHt, centerItemX, centerItemY;
var s = function( p ) { // p could be any variable name
  var x = 100;
  var y = 100;
  var header;
  var text = 'NAIL PROCESS';
  var text2 = 'NAIL PROCESS';
  var textSize;
  var font;
  var img, img2;




  p.preload = function(){
    img =  p.loadImage('assets/hand_1.png');
    img2 =  p.loadImage('assets/hand_2.png');


  }

  p.setup = function() {

    p.createCanvas(p.windowWidth/3.05, p.windowHeight/3.05);
    font = 'Helvetica';

    tileW = (p.windowWidth/3.05);
    tileH = (p.windowHeight/3.05);
    centerItemX = ((p.windowWidth/3.05) - (p.windowWidth/6.10));
    centerItemY = p.windowHeight/6.05 + 10;
    // console.log(p.windowWidth/3.05);
    // console.log(p.windowHeight);
    //
    // console.log("WIDTH/2:" + ((p.windowWidth/3.05) - (p.windowWidth/6.10)));



  };

  p.draw = function() {


      p.background(255, 151, 148);
        p.imageMode(p.CENTER);
      p.image(img, centerItemX, centerItemY,300,300);

    if ((p.mouseX > 0) && (p.mouseX < tileW) && (p.mouseY > 0) && (p.mouseY < tileH)){

      p.background(120,20,231);
      p.imageMode(p.CENTER);

      p.image(img2, centerItemX,centerItemY,300,300);

      // text = "";
      textSize = 40;
      textSize = textSize + 20;
      p.textSize(textSize);
      // p.textFont(font);
      p.textFont("sans-serif");
      // p.textFont("bold");
        p.fill(255);
        p.textAlign(p.CENTER);
        p.text(text, centerItemX, centerItemY);




      }
    else{

      //
      p.background(255, 151, 148);
      p.imageMode(p.CENTER);
      p.image(img, centerItemX, centerItemY,300,300);


      textSize = 40;
      p.textSize(textSize);
      // p.textFont(font);
      p.textFont("sans-serif");
        p.fill(255);
        p.textAlign(p.CENTER);

        p.text(text, centerItemX, centerItemY);



    }


  };

  // p.oldText = function(){
  //   p.textSize(52);
  //     p.fill(255);
  //     p.text(text, 0, p.windowHeight/6.05);
  //
  //
  //
  //
  // }
  //
  // p.newText = function(){
  //   p.textSize(60);
  //     p.fill(200, 80, 255);
  //     p.text(text2, 0, p.windowHeight/6.05);
  //
  //
  //
  // }
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
    // p.fill(1);
    p.background(255, 151, 148);
     // console.log(p.windowWidth/3.05)
     // console.log(p.windowWidth * (2/3.05))
     if ((p.mouseX >0) && (p.mouseX < tileW) && (p.mouseY > 0) && (p.mouseY < tileH)){

       p.background(50,50,100);

       x += speed;
       if(x > p.width){
         x = 0;
       }
       p.ellipse(x,y,50,50);
}
else{
  // p.background(100);
  p.background(255, 151, 148);

}


    //   if ((p.mouseX > 0) && (p.mouseX < (p.windowWidth * (2/3.05))) &&
    //     (p.mouseY > 0) && (p.mouseY < tileW)){
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
    p.background(255, 151, 148);
    p.fill(1);
    if ((p.mouseX >0) && (p.mouseX < tileW) && (p.mouseY > 0) && (p.mouseY < tileH)){

      p.background(250,250,100);

      x += speed;
      if(x > p.width){
        x = 0;
      }
      p.ellipse(x,y,50,50);
}
else{
  p.background(255, 151, 148);

}

  };
};
var myp5 = new p5(t, 'sketch3');
