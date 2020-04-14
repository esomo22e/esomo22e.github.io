let video;
let poseNet;
let poses;

let graphic;

function setup() {
  createCanvas(1000, 800);

  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', function (results) {
    poses = results;
  });

  graphic = createGraphics(width, height, RGB);

}


function draw() {

  background(255, 255, 255);
  image(video, 0, 0);

  fill(105, 208, 84);
  noStroke();
  ellipse(320, 530, 70, 70);

  if (mouseX > 270 && mouseX < 370 && mouseY < 580 && mouseY > 480) {

  if (poses != undefined ) {
    for (let i = 0; i < poses.length; i++) {
      for (let j=0; j< poses[i].pose.keypoints.length; j++) {

        let partname = poses[i].pose.keypoints[j].part;
        let score = poses[i].pose.keypoints[j].score;
        let x = poses[i].pose.keypoints[j].position.x;
        let y = poses[i].pose.keypoints[j].position.y;
        let sizex = 3;
        let sizey = 3;
        let rvalue = 255;
        let gvalue = 255;
        let bvalue = 255;

        if (partname == "nose") {
          if (score > 0.8) {
            graphic.noStroke();
            // graphic.fill(172, 52, 60);
            graphic.ellipse(x, y, sizex, sizey);
          }
        }

         if (partname == "leftEye") {
          if (score > 0.8) {
            graphic.noStroke();
            graphic.fill(43, 165, 195);
            graphic.ellipse(x, y, sizex, sizey);
          }
        }
         if (partname == "rightEye") {
          if (score > 0.8) {
            graphic.noStroke();
            graphic.fill(rvalue, gvalue, bvalue);
            graphic.ellipse(x, y, sizex, sizey);
          }
        }

         if (partname == "leftEar") {
          if (score > 0.8) {
            graphic.noStroke();
            graphic.fill(172, 52, 60);
            graphic.ellipse(x, y, sizex, sizey);
          }
        }
         if (partname == "rightEar") {
          if (score > 0.8) {
            graphic.noStroke();
            graphic.fill(172, 52, 60);
            graphic.ellipse(x, y, sizex, sizey);
          }
        }
         if (partname == "leftShoulder") {
          if (score > 0.8) {
            graphic.noStroke();
            graphic.fill(43, 165, 195);
            graphic.ellipse(x, y, sizex, sizey);
          }
        }
         if (partname == "rightShoulder") {
          if (score > 0.8) {
            graphic.noStroke();
            graphic.fill(rvalue, gvalue, bvalue);
            graphic.ellipse(x, y, sizex, sizey);
          }
        }
         if (partname == "leftElbow") {
          if (score > 0.8) {
            graphic.noStroke();
            graphic.fill(43, 165, 195);
            graphic.ellipse(x, y, sizex, sizey);
          }
        }
         if (partname == "rightElbow") {
          if (score > 0.8) {
            graphic.noStroke();
            graphic.fill(rvalue, gvalue, bvalue);
            graphic.ellipse(x, y, sizex, sizey);
          }
        }
         if (partname == "leftWrist") {
          if (score > 0.8) {
            graphic.noStroke();
            graphic.fill(45, 165, 195);
            graphic.ellipse(x, y, sizex, sizey);
          }
        }
         if (partname == "rightWrist") {
          if (score > 0.8) {
            graphic.noStroke();
            graphic.fill(rvalue, gvalue, bvalue);
            graphic.ellipse(x, y, sizex, sizey);
          }
        }
         if (partname == "leftHip") {
          if (score > 0.8) {
            graphic.noStroke();
            graphic.fill(45, 165, 195);
            graphic.ellipse(x, y, sizex, sizey);
          }
        }
         if (partname == "rightHip") {
          if (score > 0.8) {
            graphic.noStroke();
            graphic.fill(rvalue, gvalue, bvalue);
            graphic.ellipse(x, y, sizex, sizey);
          }
        }
         if (partname == "leftKnee") {
          if (score > 0.8) {
            graphic.noStroke();
            graphic.fill(45, 165, 195);
            graphic.ellipse(x, y, sizex, sizey);
          }
        }
         if (partname == "rightKnee") {
          if (score > 0.8) {
            graphic.noStroke();
            graphic.fill(rvalue, gvalue, bvalue);
            graphic.ellipse(x, y, sizex, sizey);
          }
        }
         if (partname == "leftAnkle") {
          if (score > 0.8) {
            graphic.noStroke();
            graphic.fill(45, 165, 195);
            graphic.ellipse(x, y, sizex, sizey);
          }
        }
         if (partname == "rightAnkle") {
          if (score > 0.8) {
            graphic.noStroke();
            graphic.fill(rvalue, gvalue, bvalue);
            graphic.ellipse(x, y, sizex, sizey);
          }
        }
        if (partname == "rightElbow") {
          if (score > 0.8) {
            graphic.noStroke();
            graphic.fill(rvalue, gvalue, bvalue);
            graphic.ellipse(x, y, sizex, sizey);
          }
        }
        if (partname == "leftElbow") {
          if (score > 0.8) {
            graphic.noStroke();
            graphic.fill(45, 165, 195);
            graphic.ellipse(x, y, sizex, sizey);
          }
        }

      }
    }
  }

  image(graphic, 0, 0);

}

else {
	graphic.background(0);
}

}


function modelReady() {
  console.log("Model Ready!");
}
