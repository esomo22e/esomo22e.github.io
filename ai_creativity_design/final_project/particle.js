// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

// PoseNet with a pre-recorded video, modified from:
// https://github.com/ml5js/ml5-examples/blob/master/p5js/PoseNet/sketch.js

class Jitter {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.diameter = random(10, 30);
    this.speed = 1;
  }

  move() {
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);
  }

  display() {
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}


let poseNet;
let poses = [];
let poseArray = [];
let noseArray = [];
let leftWristArray = [];
let rightWristArray = [];
let rightAnkleArray = [];

let video;
var videoIsPlaying;

function setup() {
  frameRate(10);
  videoIsPlaying = false;
  createCanvas(833, 480);
  // video = createVideo('yabbay.mp4', vidLoad);
  video = createCapture(VIDEO);

  video.size(width, height);
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', function(results) {
    poses = results;
    if(poses.length >= 0){
      poseArray.push(poses);
    }
  });

  video.hide();
}

function modelReady() {
    console.log('Model Loaded');
}

function mousePressed(){
  vidLoad();
}

function draw() {
  image(video, 0, 0, width, height);
  //background(0);
  drawKeypoints();
}

function drawKeypoints()  {
  for (let i = 0; i < poses.length; i++) {

    let pose = poses[i].pose;

    for (let j = 2; j < pose.keypoints.length; j=j+10) {
      for (let k = 3; k < pose.keypoints.length; k=k+10){
        for (let l = 4; l < pose.keypoints.length; l=l+10){
          for (let m = 5; m < pose.keypoints.length; m=m+10){ // let keypoint = pose.keypoints[j]; // let keypoint2 = pose.keypoints[k]; // let keypoint3 = pose.keypoints[l]; // let keypoint4 = pose.keypoints[m]; // // if (keypoint.score &gt; 0.2) {
        strokeWeight(1);
        stroke(255,0,0);

        beginShape();
        curveVertex(keypoint.position.x, keypoint.position.y);
        curveVertex(keypoint2.position.x, keypoint2.position.y);
        curveVertex(keypoint3.position.x, keypoint3.position.y);
        curveVertex(keypoint4.position.x, keypoint4.position.y);
        endShape();
      }
    }
  }
  }
}


  // for (var i = 0; i <= poses.length; i++){
  //   // let pose = poses[i].pose;
  //   for (var j = 0; j <= poses[i].pose.keypoints.length; j++){
  //     noFill();
  //     strokeWeight(1);
  //     makeVectors("nose", poses[i].pose, j, noseArray);
  //      makeVectors("leftWrist", poses[i].pose, j, leftWristArray);
  //      makeVectors("rightAnkle", poses[i].pose, j, rightAnkleArray);
  //      stroke(255);
  //      makeConnections(leftWristArray);
  //      makeConnections(noseArray);
  //      makeConnections(rightAnkleArray);
  //    }
  //  }
 }

 function makeVectors(part, pose, j, partArray){
   if(pose.keypoints[j].part == part){ stroke(0, 0, 255);
     ellipse(pose.keypoints[j].position.x,pose.keypoints[j].position.y, 10);
     partArray.push(createVector(pose.keypoints[j].position.x,pose.keypoints[j].position.y));
     if (partArray.length >= 4){
      partArray.splice(0,1);
    }
  }
}

function makeConnections(partArray){
  beginShape();
  for (let k = 0; k <= partArray.length; k++){
    curveVertex(partArray[k].x, partArray[k].y);
  }
  endShape();
}

function vidLoad() {
  video.stop();
  video.loop();
  videoIsPlaying = true;
}

function keyPressed(){
  if (videoIsPlaying) {
    video.pause();
    videoIsPlaying = false;
  } else {
    video.loop();
    videoIsPlaying = true;
  }
}
