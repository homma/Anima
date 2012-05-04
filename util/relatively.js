/*
 * @author Daisuke Homma
 */

// determin which relative direction (front, back, left, right) the target is at

new function() { // block

Anima.Relatively = this;

// capturing 'this' to 'self' for convenience.
var self = this;

self.isRight = function(headX, headY, tailX, tailY, targetX, targetY) {
  var ax = headX - tailX;
  var ay = headY - tailY;
  var bx = targetX - headX;
  var by = targetY - headY;

  return (self.exterior(ax, ay, bx, by) > 0);
}

self.isLeft = function(headX, headY, tailX, tailY, targetX, targetY) {
  var ax = headX - tailX;
  var ay = headY - tailY;
  var bx = targetX - headX;
  var by = targetY - headY;

  return (self.exterior(ax, ay, bx, by) < 0);
}

self.isFront = function(headX, headY, tailX, tailY, targetX, targetY) {
  var ax = headX - tailX;
  var ay = headY - tailY;
  var bx = targetX - headX;
  var by = targetY - headY;

  return (self.inner(ax, ay, bx, by) > 0);
}

self.isBack = function(headX, headY, tailX, tailY, targetX, targetY) {
  var ax = headX - tailX;
  var ay = headY - tailY;
  var bx = targetX - headX;
  var by = targetY - headY;

  return (self.inner(ax, ay, bx, by) < 0);
}

// inner or dot product
self.inner = function(ax, ay, bx, by) {
  return (ax * bx + ay * by);
}

// exterior or cross product
self.exterior = function(ax, ay, bx, by) {
  return (ax * by - bx * ay);
}

} // block
