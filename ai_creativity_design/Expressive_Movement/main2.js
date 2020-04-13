let video;
let poseNet;
let poses;

let particles = [];

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
}


function modelReady() {
  console.log("Model Ready!");
}


function draw() {
  background(0);

  if (poses != undefined ) {
    for (let i = 0; i < poses.length; i++) {
      for (let j=0; j< poses[i].pose.keypoints.length; j++) {

        let partname = poses[i].pose.keypoints[j].part;
        let score = poses[i].pose.keypoints[j].score;
        let x = poses[i].pose.keypoints[j].position.x;
        let y = poses[i].pose.keypoints[j].position.y;

        if (score > 0.8) {
          if (partname == "leftEye") {
            particles.push( new Particle(x, y, random(1, 3), random(-1, 1)));
          }
          else if (partname == "rightEar") {
            particles.push( new Particle(x, y, random(-3, -1), random(-1, 1)));
          }
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

  image(video, 0, 0, width, height);

  // update and display particles
  for (let i=0; i<particles.length; i++) {
    let p = particles[i];
    p.move();
    p.display();
  }

  // limit the number of particles
  if (particles.length > 400) {
    particles.splice(0, 1);
  }
}



class Particle {
  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.size = random(1, 100);
    this.color = color(random(225),random(225),random(225));
  }
  display() {
    // noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.size, this.size);
  }
  move() {
    this.x += this.velX;
    this.y += this.velY;
  }
}
