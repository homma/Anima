/*
 * @author Daisuke Homma
 */

/// Move

Anima.Move = function(n0, n1) {
  this.x = n0;
  this.y = n1;
}

Anima.Move.prototype.draw = function(ctx) {
  ctx.moveTo(this.x, this.y);
}

Anima.Move.prototype.drawHandle = function(ctx) {
  // ctx.moveTo(this.x, this.y);

  // drawing the handle

}

// Anima.Move.prototype._drawFirstHandle = function(ctx) {}
// Anima.Move.prototype._drawSecondHandle = function(ctx) {}

Anima.Move.prototype.hitTest = function(x, y) {
  return false;
}

Anima.Move.prototype.hitTestHandle = function(x, y) {
  return false;
}

