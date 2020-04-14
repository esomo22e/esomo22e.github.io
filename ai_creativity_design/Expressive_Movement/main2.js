let video;
let poseNet;
let poses;
let particles = [];

let input;
let button;

let graphic;


function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // video.hide();
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();

  graphic = createGraphics(width, height, RGB);


//   input = createInput();
//   input.position(20, 65);
//
//   button = createButton('submit');
// button.position(input.x + input.width, 65);
//   button.mousePressed(draw);

}


function modelReady() {
  console.log("Model Ready!");
}


function draw() {
  background(0);
  // image(video, 0, 0, width, height);
  // const name = input.value();
  // input.value?('');

  // console.log(name);
  if (poses != undefined ) {
    for (let i = 0; i < poses.length; i++) {
      for (let j=0; j< poses[i].pose.keypoints.length; j++) {

        let partname = poses[i].pose.keypoints[j].part;
        let score = poses[i].pose.keypoints[j].score;

        let x = poses[i].pose.keypoints[j].position.x;
        let y = poses[i].pose.keypoints[j].position.y;
        // console.log(partname);
        if (score > 0.2) {
          if (partname == "nose") {
            // console.log("score": + score)
            print("score: " + score);
            particles.push( new Particle(x, y, random(1, 3), random(-3, 3),2, 10));

            // graphic.noStroke();
            // graphic.fill(172, 52, 60);
            // graphic.ellipse(x, y, 3,3);
          }
        else if (partname == "leftShoulder") {
                // console.log("score": + score)
                print("score: " + score);
                particles.push( new Particle(x, y, random(1, 3), random(-3, 3), random(-1, 1), random(2,20)));
                //
                // graphic.noStroke();
                // graphic.fill(172, 52, 60);
                // graphic.ellipse(x, y, 3,3);
              }
             if (partname == "rightWrist") {
                    // console.log("score": + score)
                    print("score: " + score);
                    particles.push( new Particle(x, y, random(1, 1), random(-5, 0), -4, random(5,50)));

                    // graphic.noStroke();
                    // graphic.fill(172, 52, 60);
                    // graphic.ellipse(x, y, 3,3);
                  }
          // else if (partname == "leftEar") {
          //   particles.push( new Particle(-x, -y, random(-3, -1), random(-1, 1)));
          // }
          // else if (partname == "rightWrist") {
          //   particles.push( new Particle(x, y, random(3, 1), random(1, -1)));
          // }
          // else if (partname == "rightWrist") {
          //   particles.push( new Particle(x, y, random(-3, -1), random(-1, 1)));
          // }
          //  else if (partname == "rightAnkle") {
          //   particles.push( new Particle(x, y, random(-3, -1), random(-1, 1)));
          // }
        }

      }
    }
  }
  // image(graphic, 0, 0, width, height);
  // image(video, 0, 0, width, height);

  // update and display particles
  for (let i=0; i<particles.length; i++) {
    // console.log(particles)
    let p = particles[i];
    p.move();
    p.display();
  }

  // limit the number of particles
  for (let i = particles.length-1; i >= 0; i--) {
    let p = particles[i];

    if(p.isDead()){
        particles.splice(0, 1);

    }
  }
}


// class Particle {
//   // let speed;
//
//   constructor(x, y, velX, velY, speed, size) {
//     // let speed = random(-2, -5);
//
//     this.x = x;
//     this.y = y;
//     // this.velX = cos(radians(velX)) * speed;
//     // this.velY = sin(radians(velY)) * speed;
//     this.velX = cos(radians(velX)) * speed;
//     this.velY = sin(radians(velY)) * speed;
//     this.size = size; //random(4, 60);
//     this.color = color(random(225),random(225),random(225));
//     this.lifespan = 255;
//
//   }
//   display() {
//     // noStroke();
//     stroke(100, this.lifespan);
//     fill(this.color, this.lifespan);
//     ellipse(this.x, this.y, this.size, this.size);
//   }
//
//   isDead(){
//       return this.lifespan < 0;
//   }
//   move() {
//     this.x += this.velX;
//     this.y += this.velY;
//   }
// }
// class Particle {
//   constructor(x, y, velX, velY) {
//     this.x = x;
//     this.y = y;
//     this.velX = velX;
//     this.velY = velY;
//     this.size = random(1, 100);
//     this.color = color(random(225),random(225),random(225));
//   }
//   display() {
//     // noStroke();
//     fill(this.color);
//     ellipse(this.x, this.y, this.size, this.size);
//   }
//   move() {
//     this.x += this.velX;
//     this.y += this.velY;
//   }
// }
