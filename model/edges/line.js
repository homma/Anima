/*
 * @author Daisuke Homma
 */

/// line

Anima.Line = function(n0, n1) {
  this.x = n0;
  this.y = n1;
}	

Anima.Line.prototype.draw = function(ctx) {
  ctx.lineTo(this.x, this.y);
}

Anima.Line.prototype.drawHandle = function(ctx) {
  // ctx.lineTo(this.x, this.y);

  // drawing the handle

}

// Anima.Line.prototype._drawFirstHandle = function(ctx) {}
// Anima.Line.prototype._drawSecondHandle = function(ctx) {}

