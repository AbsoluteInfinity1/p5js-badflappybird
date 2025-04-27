let bird;
let pipes = [];
let score = 0;

function setup() {
  createCanvas(400, 600);
  bird = new Bird();
  pipes.push(new Pipe());
}

function draw() {
  background(135, 206, 235); // Sky blue background

  bird.update();
  bird.show();

  // Handle pipes
  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();

    // Check for collision
    if (pipes[i].hits(bird)) {
      console.log("HIT");
      noLoop(); // Stop the game
    }

    // Remove pipes that are off-screen
    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
      score++;
    }
  }

  // Add new pipes
  if (frameCount % 75 === 0) {
    pipes.push(new Pipe());
  }

  // Display score
  rect(9, 10, 130, 40) // Background for score;
  fill(255);
  textSize(32);
  text(`Score: ${score}`, 10, 40);
}

function keyPressed() {
  if (key === ' ') {
    bird.up();
  }
}

class Bird {
  constructor() {
    this.y = height / 2;
    this.x = 64;

    this.gravity = 0.6;
    this.lift = -15;
    this.velocity = 0;
  }

  show() {
    fill(255, 204, 0);
    ellipse(this.x, this.y, 32, 32);
  }

  up() {
    this.velocity += this.lift;
  }

  update() {
    this.velocity += this.gravity;
    this.velocity *= 0.9; // Air resistance
    this.y += this.velocity;

    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  }
}

class Pipe {
  constructor() {
    this.top = random(height / 2);
    this.bottom = random(height / 2);
    this.x = width;
    this.w = 40;
    this.speed = 3;
  }

  show() {
    fill(34, 139, 34);
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height - this.bottom, this.w, this.bottom);
  }

  update() {
    this.x -= this.speed;
  }

  offscreen() {
    return this.x < -this.w;
  }

  hits(bird) {
    if (bird.y < this.top || bird.y > height - this.bottom) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
        return true;
      }
    }
    return false;
  }
}