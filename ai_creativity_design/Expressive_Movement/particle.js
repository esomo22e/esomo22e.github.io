class Particle {
  // let speed;

  constructor(x, y, velX, velY, speed, size) {
    // let speed = random(-2, -5);

    this.x = x;
    this.y = y;
    // this.velX = cos(radians(velX)) * speed;
    // this.velY = sin(radians(velY)) * speed;
    this.velX = cos(radians(velX)) * speed;
    this.velY = sin(radians(velY)) * speed;
    this.size = size; //random(4, 60);
    this.color = color(random(225),random(225),random(225));
    this.lifespan = 255;

  }
  display() {
    // noStroke();
    // stroke(100, this.lifespan);
    fill(this.color, this.lifespan);
    // strokeWeight(this.size);
    // point(this.x, this.y);
    ellipse(this.x, this.y, this.size, this.size);
  }

  isDead(){
      return this.lifespan < 0;
  }
  move() {
    this.x += this.velX ;
    this.y += this.velY;
  }
}
