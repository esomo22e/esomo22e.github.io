function setup(){
    createCanvas(windowWidth/2, windowHeight);
}

function draw(){
    for(var j = 0; j <= (windowHeight); j+=12){
        for(var i =0; i <= (windowWidth/2); i+=12){
            background(j *0.2,229, 204);

            stroke(j*0.2,j * 0.2,j * 1);
            strokeWeight(0.01*j);
            line(0, j,(windowWidth/2), j);
        }
    }
}
