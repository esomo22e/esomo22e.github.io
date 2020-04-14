let video;
let poseNet;
let poses = [];
let particles = [];
let chk0;
let chk1;
let chk2;
let chk3;

let point0;
let point1;
let point2;
let point3;
let point4;
let point5;
let point6;
let point7;
let point8;
let point9;
let point10;
let point11;
let point12;
let point13;
let point14;
let point15;
let point16;

function setup() {
    createCanvas(windowWidth, windowHeight);
    video = createCapture(VIDEO);
    video.size(width, height);
    poseNet = ml5.poseNet(video, modelReady);
    // video.hide();
    // This sets up an event that fills the global variable "poses"
    // with an array every time new poses are detected
    poseNet.on('pose', function(results) {
        poses = results;
    });
    // Hide the video element, and just show the canvas
    video.hide();
    chk0 = select("#box0").elt;
    chk1 = select("#box1").elt;
    chk2 = select("#box2").elt;
    chk3 = select("#box3").elt;

    // console.log(chk1);

    point0 = select("#nose").elt;
    point1 = select("#leftEye").elt;
    point2 = select("#rightEye").elt;
    point3 = select("#leftEar").elt;
    point4 = select("#rightEar").elt;
    point5 = select("#leftShoulder").elt;
    point6 = select("#rightShoulder").elt;
    point7 = select("#leftElbow").elt;
    point8 = select("#rightElbow").elt;
    point9 = select("#leftWrist").elt;
    point10 = select("#rightWrist").elt;
    point11 = select("#leftHip").elt;
    point12 = select("#rightHip").elt;
    point13 = select("#leftKnee").elt;
    point14 = select("#rightKnee").elt;
    point15 = select("#leftAnkle").elt;
    point16 = select("#rightAnkle").elt;

    // chk1.onchange = function() {
    //
    //     // we only want to change things if the box was turned on
    //     // so we check like this
    //     if (chk1.checked) {
    //         // chk2.checked = false;
    //         // chk3.checked = true;
    //     }
    //
    // }
    // chk2.onchange = function() {
    //     if (chk2.checked) {
    //         chk1.checked = true;
    //         chk3.checked = true;
    //     }
    // }
    // chk3.onchange = function() {
    // 	if (chk3.checked) {
    // 		chk1.checked = true;
    // 		chk2.checked = true;
    // 	}
    // }
}

function modelReady() {
    select('#status').html('Model Loaded');
}


function draw() {
    // background(220);
    // if (chk0.checked) {
    //
    // image(video, 0, 0, width, height);
    // }
    if (chk0.checked) {
        image(video, 0, 0, width, height);
    } else {
        background('#9999ff');

    }
    // filter(INVERT);

    // We can call both functions to draw all keypoints and the skeletons
    if (chk2.checked) {

        drawKeypoints();
    }
    if (chk1.checked) {

        drawSkeleton();
    }
    if (chk3.checked) {
        drawParticles();
    }
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
    // Loop through all the poses detected
    for (let i = 0; i < poses.length; i++) {
        // For each pose detected, loop through all the keypoints
        let pose = poses[i].pose;
        console.log(pose);
        for (let j = 0; j < pose.keypoints.length; j++) {
            // A keypoint is an object describing a body part (like rightArm or leftShoulder)
            let keypoint = pose.keypoints[j];
            // Only draw an ellipse is the pose probability is bigger than 0.2
            if (keypoint.score > 0.2) {
                fill(75, 0, 130);
                noStroke();

                ellipse(keypoint.position.x, keypoint.position.y, 30, 30);
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
            strokeWeight(3);
            line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
            beginShape();
            curveVertex(partA.position.x, partA.position.y);
            curveVertex(partB.position.x, partB.position.y);
            endShape();

        }
    }
}

function drawParticles() {
    if (poses != undefined) {
        for (let i = 0; i < poses.length; i++) {
            for (let j = 0; j < poses[i].pose.keypoints.length; j++) {

                let partname = poses[i].pose.keypoints[j].part;
                let score = poses[i].pose.keypoints[j].score;

                let x = poses[i].pose.keypoints[j].position.x;
                let y = poses[i].pose.keypoints[j].position.y;
                // console.log(partname);
                if (score > 0.4) {
                    // if (partname == "leftEar") {
                    // console.log("score": + score)
                    if (point0.checked) {
                        if (partname == "nose") {
                            print("score: " + score);
                            particles.push(new Particle(x, y, random(1, 3), random(3), random(-2, 2), random(2, 50)));
                        }
                    }
                    if (point1.checked) {
                        if (partname == "leftEye") {
                            print("score: " + score);
                            particles.push(new Particle(x, y, random(1, 3), random(3), random(-2, 2), random(2, 50)));
                        }
                    }
                    if (point2.checked) {
                        if (partname == "rightEye") {
                            print("score: " + score);
                            particles.push(new Particle(x, y, random(1, 3), random(3), random(-2, 2), random(2, 50)));
                        }
                    }


                    if (point3.checked) {
                        if (partname == "leftEar") {
                            print("score: " + score);
                            particles.push(new Particle(x, y, random(1, 3), random(3), random(-2, 2), random(2, 50)));
                        }
                    }
                    if (point4.checked) {
                        if (partname == "rightEar") {
                            print("score: " + score);
                            particles.push(new Particle(x, y, random(1, 3), random(3), random(-2, 2), random(2, 50)));
                        }
                    }


                    if (point5.checked) {
                        if (partname == "leftShoulder") {
                            print("score: " + score);
                            particles.push(new Particle(x, y, random(1, 3), random(3), 10, random(2, 50)));
                        }
                    }
                    if (point6.checked) {
                        if (partname == "rightShoulder") {
                            print("score: " + score);
                            particles.push(new Particle(x, y, random(1, 3), random(3), random(-2, 2), random(2, 50)));
                        }
                    }


                    if (point7.checked) {
                        if (partname == "leftElbow") {
                            print("score: " + score);
                            particles.push(new Particle(x, y, random(1, 3), random(3), random(-2, 2), random(2, 50)));
                        }
                    }
                    if (point8.checked) {
                        if (partname == "rightElbow") {
                            print("score: " + score);
                            particles.push(new Particle(x, y, random(1, 3), random(3), random(-2, 2), random(2, 50)));
                        }
                    }

                    if (point9.checked) {
                        if (partname == "leftWrist") {
                            print("score: " + score);
                            particles.push(new Particle(x, y, random(1, 3), random(3), random(-2, 2), random(2, 50)));
                        }
                    }
                    if (point10.checked) {
                        if (partname == "rightWrist") {
                            print("score: " + score);
                            particles.push(new Particle(x, y, random(1, 3), random(3), random(-2, 2), random(2, 50)));
                        }
                    }

                    if (point11.checked) {
                        if (partname == "leftHip") {
                            print("score: " + score);
                            particles.push(new Particle(x, y, random(1, 3), random(3), random(-2, 2), random(2, 50)));
                        }
                    }
                    if (point12.checked) {
                        if (partname == "rightHip") {
                            print("score: " + score);
                            particles.push(new Particle(x, y, random(1, 3), random(3), random(-2, 2), random(2, 50)));
                        }
                    }

                    if (point13.checked) {
                        if (partname == "leftKnee") {
                            print("score: " + score);
                            particles.push(new Particle(x, y, random(1, 3), random(3), random(-2, 2), random(2, 50)));
                        }
                    }
                    if (point14.checked) {
                        if (partname == "rightKnee") {
                            print("score: " + score);
                            particles.push(new Particle(x, y, random(1, 3), random(3), random(-2, 2), random(2, 50)));
                        }
                    }

                    if (point15.checked) {
                        if (partname == "leftAnkle") {
                            print("score: " + score);
                            particles.push(new Particle(x, y, random(1, 3), random(3), random(-2, 2), random(2, 50)));
                        }
                    }
                    if (point16.checked) {
                        if (partname == "rightAnkle") {
                            print("score: " + score);
                            particles.push(new Particle(x, y, random(1, 3), random(3), random(-2, 2), random(2, 50)));
                        }
                    }



                }

            }
        }
    }
    // image(graphic, 0, 0, width, height);
    // image(video, 0, 0, width, height);

    // update and display particles
    for (let i = 0; i < particles.length; i++) {
        // console.log(particles)
        let p = particles[i];
        p.move();
        p.display();
    }

    // limit the number of particles
    for (let i = particles.length - 1; i >= 0; i--) {
        let p = particles[i];

        if (p.isDead()) {
            particles.splice(0, 1);

        }
    }
}
