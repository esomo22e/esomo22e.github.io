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
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  // video.hide();
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  image(video, 0, 0, width, height);

  background(0,0,0, 5);
  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  drawSkeleton();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
    for (let i = 0; i < poses.length; i++) {

      let pose = poses[i].pose;

      for (let j = 2; j < pose.keypoints.length; j=j+10) {
        for (let k = 3; k < pose.keypoints.length; k=k+10){
          for (let l = 4; l < pose.keypoints.length; l=l+10){
            for (let m = 5; m < pose.keypoints.length; m=m+10){
              let keypoint = pose.keypoints[j];
              let keypoint2 = pose.keypoints[k];
              let keypoint3 = pose.keypoints[l];
              let keypoint4 = pose.keypoints[m];
              if (keypoint.score > 0.2) {
          strokeWeight(1);
          stroke(255,0,0);

          beginShape();
        curveVertex(keypoint.position.x, keypoint.position.y,10,20);
          curveVertex(keypoint2.position.x, keypoint2.position.y);
          curveVertex(keypoint3.position.x, keypoint3.position.y);
          curveVertex(keypoint4.position.x, keypoint4.position.y);
          endShape();
        }
      }
    }
    }
  }
  }

  for (var i = 0; i < poses.length; i++) {
    let pose = poses[i].pose;
    for (var j = 0; j < pose.keypoints.length; j++) {

      console.log(noseArray);
      console.log(leftWristArray)
      strokeWeight(1);
      makeVectors("nose", pose, j, noseArray);
      makeVectors("leftWrist", pose, j, leftWristArray);
      makeVectors("rightAnkle", pose, j, rightAnkleArray);
      stroke(255);
      makeConnections(leftWristArray);
      makeConnections(noseArray);
      makeConnections(rightAnkleArray);
    }
  }
}

function makeVectors(part, pose, j, partArray) {
  if (pose.keypoints[j].part == part) {
    console.log(part);
    stroke(0, 0, 255);
    // ellipse(pose.keypoints[j].position.x, pose.keypoints[j].position.y, 10);
    partArray.push(createVector(pose.keypoints[j].position.x, pose.keypoints[j].position.y));
    if (partArray.length > 4) {
      partArray.splice(0, 1);
    }
  }
}

function makeConnections(partArray) {
  beginShape();
  for (let k = 0; k < partArray.length; k++) {
    curveVertex(partArray[k].x, partArray[k].y);
    // ellipse(partArray[k].x, partArray[k].y, 10,10);
  }
  endShape();
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
      // console.log(partA);
      // console.log(partB);
      // console.log(skeleton);
      stroke(255, 0, 123);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
      ellipse(partA.position.x, partA.position.y, 20, 20);
      // ellipse(partB.position.x, partB.position.y, 20, 20)

    }
  }
}
