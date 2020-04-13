let video;
let poseNet;
let poses = [];
let historical = [];
let flyImage;
let system = null;
let systemCount = 0;


// Handle asynchronous loading of external files in a blocking way.
// Called directly before setup().
// https://p5js.org/reference/#/p5/preload
function preload() {
  // flyImage = loadImage('fly.gif');
}


// Called once when the program starts.
// It's used to define initial environment properties
// such as screen size and background color and to
// load media such as images and fonts as the program starts.
// https://p5js.org/reference/#/p5/setup
function setup() {
  createCanvas(640, 480);

  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
    debugger;
  });
  // Hide the video element, and just show the canvas
  video.hide();
}


function modelReady() {
  select('#status').html('Model Loaded');
}


// Continuously executes the lines of code contained
// inside its block until the program is stopped
// or noLoop() is called.
// Called directly after setup().
// https://p5js.org/reference/#/p5/draw
function draw() {
  image(video, 0, 0, width, height);
  // drawFlyAtNose();
  // drawGreenCircleAtBodyPart('leftWrist');
  // drawGreenCircleAtBodyPart('rightWrist');
  // drawParticleSystemAtBodyPart("leftWrist");
  drawGreenCircleAtBodyPart('nose');
}


function drawGreenCircle(point) {
  fill(0, 255, 0);
  noStroke();
  circle(point.x, point.y, 20, 20);
}


function drawGreenCircleAtBodyPart(bodyPart) {
  if (poses.length > 0) {
    const point = poses[0].pose[bodyPart];
    if (point && point.confidence > 0.3) {
      drawGreenCircle(point);
    }
  }
}
//
//{
//    pose: {
//        'nose': {
//            x: 100,
//            y: 200,
//            confidence: 0.99
//        },
//        'leftWrist': {},
//        'leftEye': {}
//    }
//}



function drawParticleSystemAtBodyPart(bodyPart) {
  if (poses.length > 0) {
    const point = poses[0].pose[bodyPart];
    if (point && point.confidence > 0.01) {
      if (system) {
        system.origin = createVector(point.x, point.y);
      } else {
        system = new ParticleSystem(
          createVector(point.x, point.y)
        );
      }
      system.addParticle();
    }
  }
  if (system !== null) {
    system.run();
  }
}


// function drawFlyAtNose() {
//   if (poses.length > 0) {
//     const nose = poses[0].pose.nose;
//     if (nose.confidence > .5) {
//       image(
//         flyImage,
//         nose.x - Math.floor(flyImage.width / 2),
//         nose.y - Math.floor(flyImage.height / 2)
//       )
//     }
//   }
// }


function drawLine(point1, point2) {
  line(point1.x, point1.y, point2.x, point2.y);
  strokeWeight(20);
  // const transparency = i / Math.min(20, historical.length) / 2;
  const transparency = .4;
  fill(`rgba(255,0,0,${transparency})`);
  stroke(`rgba(255,0,0,${transparency})`);
}


// Particle system
// Source: https://p5js.org/examples/simulate-particle-system.html

// A simple Particle class
let Particle = function(position) {
  this.acceleration = createVector(0, 0.05);
  this.velocity = createVector(random(-1, 1), random(-1, 0));
  this.position = position.copy();
  this.lifespan = 255;
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
};

// Method to display
Particle.prototype.display = function() {
  stroke(200, this.lifespan);
  strokeWeight(2);
  fill(127, this.lifespan);
  ellipse(this.position.x, this.position.y, 12, 12);
};

// Is the particle still useful?
Particle.prototype.isDead = function(){
  return this.lifespan < 0;
};

let ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.run = function() {
  for (let i = this.particles.length-1; i >= 0; i--) {
    let p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};
