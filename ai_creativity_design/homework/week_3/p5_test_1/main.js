var d= 200;
function setup(){

    createCanvas(windowWidth/2, windowHeight);
    background(25,0,51);
    print(windowWidth);
    print(d);



}
function draw(){
            //
          noStroke();
          fill(255, 0, 127);
           ellipse((windowWidth/4)-20,(windowHeight/2)-30, d, d);

    for(var cx = 0; cx <= (windowWidth/2);cx+=100 ){
        for(var cy = 0; cy <=(windowHeight); cy+=100){

            strokeWeight(5);
            // noStroke();
            stroke(255, 204,204);
          noFill();
           ellipse(cx, (windowHeight) -cy, d, d);


        }
    }

    for(var j = 0; j <= (windowHeight); j+=12){
        for(var i =0; i <= (windowWidth/2); i+=12){
            stroke(j*0.2,j * 0.2,j * 1);
            strokeWeight(0.01*j);
            line(0, j,(windowWidth/2), j);

        }
    }


}
