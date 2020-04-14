let video;
let poseNet;
let poses = [];
let poseArray = [];
let noseArray = [];
let leftWristArray = [];
let rightWristArray = [];
let rightAnkleArray = [];

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

  strokeWeight(3);
  frameRate(30);
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  background(220);
  // image(video, 0, 0, width, height);

  // background('#9999ff');
  // filter(INVERT);

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  drawSkeleton();

}

// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    console.log(pose);
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.8) {
        fill(75,0,130);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(75, 0, 130);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }

  // for (var i = 0; i < poses.length; i++) {
  //   let pose = poses[i].pose;
  //   for (var j = 0; j < pose.keypoints.length; j++) {
  //
  //     // console.log(noseArray);
  //     // console.log(leftWristArray)
  //     strokeWeight(2);
  //     makeVectors("nose", pose, j, noseArray);
  //     makeVectors("leftWrist", pose, j, leftWristArray);
  //     makeVectors("rightAnkle", pose, j, rightAnkleArray);
  //     stroke(125,124, 124);
  //     makeConnections(leftWristArray);
  //     makeConnections(noseArray);
  //     makeConnections(rightAnkleArray);
  //   }
  // }
}

// function makeVectors(part, pose, j, partArray) {
//   if (pose.keypoints[j].part == part) {
//     // console.log(part);
//     stroke(0, 0, 255);
//     strokeWeight(5);
//     fill(120,255, 120);
//     console.log(partArray);
//     // ellipse(pose.keypoints[j].position.x, pose.keypoints[j].position.y, 10);
//     partArray.push(createVector(pose.keypoints[j].position.x, pose.keypoints[j].position.y));
//     if (partArray.length > 4) {
//       partArray.splice(0, 1);
//     }
//   }
// }
//
// function makeConnections(partArray) {
//   console.log(partArray);
//   beginShape();
//   for (let k = 0; k < partArray.length; k++) {
//     curveVertex(partArray[k].x, partArray[k].y);
//     // ellipse(partArray[k].x, partArray[k].y, 10,10);
//   }
//   endShape();
// }
