var s;
var scl = 20;
var food;

function setup() {
  createCanvas(1000, 380);
  s = new Snake();
  frameRate(5);
  pickLocation();
  document.getElementById("score").innerHTML = ("Last Score: " + 0 + "   ^ _ ^   " + "Highscore: " + (localStorage['highscore'] || 0));
}

function pickLocation(){
  var cols = floor(width/scl);
  var rows = floor(height/scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}

function draw() {
  background(255,153,0);
  s.death();
  s.update();
  s.show();
  if (s.eat(food)){
    pickLocation();
  }
  fill(64,131,153);
  noStroke();
  ellipse(food.x, food.y, scl, scl);
}

function keyPressed() {
  if (keyCode === UP_ARROW){
    s.dir(0, -1);
  } else if (keyCode === DOWN_ARROW){
    s.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW){
    s.dir(1, 0);
  } else if (keyCode === LEFT_ARROW){
    s.dir(-1, 0);
  }
}
