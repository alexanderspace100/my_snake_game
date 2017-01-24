function Snake() {
  this.step = 20;
  this.x = this.step;
  this.y = this.step;
  this.lastx = this.step;
  this.lasty = this.step;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];
  this.window = 600;
  this.highscore = localStorage['highscore'] || 0;

  this.update = function() {
    if (this.total === this.tail.length) {
      for (var i = 0; i < this.tail.length-1; i++){
        this.tail[i] = this.tail[i+1];
      }
    }
    this.tail[this.total-1] = createVector(this.x, this.y);

    this.x = this.x + this.xspeed * scl;
    this.y = this.y + this.yspeed * scl;

    this.x = constrain(this.x, 0, width - scl);
    this.y = constrain(this.y, 0, height - scl);
  }

  this.show = function() {
    fill(0);
    for (var i = 0; i< this.tail.length; i++){
    ellipse(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    ellipse(this.x, this.y, scl, scl);
  }

  this.eat = function(pos) {
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {
      this.total++;
      return true;
    } else {
      return false;
    }
  }

  this.dir = function(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  }

  this.reset = function () {
    if (this.highscore < this.total) {
        this.highscore = this.total;
        localStorage['highscore'] = "" + this.highscore;
    }
    //scores
    document.getElementById("score").innerHTML = ("Last Score: " + this.total + "   ^_^   " + "Highscore: " + localStorage['highscore']);
    //the start position
    this.x = this.step;
    this.y = this.step;
    this.lastx = this.step;
    this.lasty = this.step;
    this.xspeed = 1;
    this.yspeed = 0;
    this.lastdir = 39;
    this.total = 0;
    this.tail = [];
}

  this.death = function () {
      for (var i = 0; i < this.tail.length; i++) {
          var pos = this.tail[i];
          d = dist(this.x, this.y, pos.x, pos.y);
          if (d < 1) this.reset();
      }
      if (
          (this.x <= 0 && this.lastx <= 0 && this.lasty == this.y)
          ||
          (this.x >= (this.window - this.step) && this.lastx >= (this.window - this.step) && this.lasty == this.y)
          ||
          (this.y <= 0 && this.lasty <= 0 && this.lastx == this.x)
          ||
          (this.y >= (this.window - this.step) && this.lasty >= (this.window - this.step) && this.lastx == this.x)
      ) this.reset();
  }

}
