/*
 * @author Daisuke Homma
 */

new function() {  // block

/// drawing ////////////////////////////////////////////////////////////////////

var self = Anima.Path;

self.prototype.draw = function(ctx) {

  this.setupContext(ctx);

  this.drawEdge(ctx);

  if(this.selected) {
    this.drawHandle(ctx);
  }

  if(!this.complete) {
    this.drawLastTwoHandles(ctx);
  }

}

self.prototype.setupContext = function(ctx) {

  ctx.lineWidth = this.lineWidth;
  ctx.lineCap = this.lineCap;
  ctx.lineJoin = this.lineJoin;
  ctx.miterLimit = this.miterLimit;
  ctx.fillStyle = this.fillHSLA;       // gradation is not yet implemented.
  ctx.strokeStyle = this.strokeHSLA;   // gradation is not yet implemented.
  ctx.shadowColor = this.shadowColor;
  ctx.shadowOffsetX = this.shadowOffsetX;
  ctx.shadowOffsetY = this.shadowOffsetY;
  ctx.shadowBlur = this.shadowBlur;

}

self.prototype.drawEdge = function(ctx) {

  ctx.beginPath();

  var pt = this.getBeginPoint();
  ctx.moveTo(pt.x, pt.y);

  for (var i = 0; this.edges.length > i; i++) {
    this.edges[i].draw(ctx);
  }

  if( this.getClosePath() ) {  // true if this.closePath == true
    ctx.closePath();
  }

  if( this.getFill() ) {
    ctx.fill();
  }

  if( this.getStroke() ) {
    ctx.stroke();
  }

}

self.prototype.drawEdgeWithDifference(ctx, dx, dy) {

  // to be implemented

}

self.prototype.drawHandle = function(ctx) {
  var len = this.edges.length;

  for (var i = 0; this.edges.length > i; i++) {
    this.edges[i].drawHandle(ctx);
  }

  if(!this.complete) {
    this.drawLastTwoHandles(ctx);
  }
}

self.prototype.drawLastTwoHandles = function(ctx) {
  var len = this.edges.length;

  if(len >= 2) {
    this.edges[len - 2].drawHandle(ctx);
  }
  this.edges[len - 1].drawHandle(ctx);

}

} // block

