/*
 * @author Daisuke Homma
 */

new function() {  // block

/// drawing ////////////////////////////////////////////////////////////////////

var self = an.Path;

self.prototype.draw = function(ctx) {

  if(this.selected) {

    this.drawWithHandles(ctx);

  } else {

    this.drawEdge(ctx, 0, 0);

  }

}

self.prototype.drawWithHandles = function(ctx) {

  this.drawEdge(ctx, 0, 0);

  this.drawHandles(ctx);

}

self.prototype.drawWithAnchorPoints = function(ctx) {

  this.drawEdge(ctx, 0, 0);
  this.drawAnchorPoints(ctx, 0, 0);

}

self.prototype.drawWithEndPoints = function(ctx) {

  this.drawEdge(ctx, 0, 0);
  this.drawEndPointsOfPath(ctx, 0, 0);

}

self.prototype.drawWithDifference = function(ctx, dx, dy) {

  this.drawEdge(ctx, dx, dy);
  this.drawEndPointsOfPath(ctx, dx, dy);

}

self.prototype.setupContext = function(ctx) {

  ctx.lineWidth = this.lineWidth;
  ctx.lineCap = this.lineCap;
  ctx.lineJoin = this.lineJoin;
  ctx.miterLimit = this.miterLimit;
  ctx.fillStyle = this.fillColor.getColor();     // no gradation support yet
  ctx.strokeStyle = this.strokeColor.getColor(); // no gradation support yet
  ctx.shadowColor = this.shadowColor;
  ctx.shadowOffsetX = this.shadowOffsetX;
  ctx.shadowOffsetY = this.shadowOffsetY;
  ctx.shadowBlur = this.shadowBlur;

}

self.prototype.drawEdge = function(ctx, dx, dy) {

  this.setupContext(ctx);

  ctx.save();

  ctx.beginPath();

  ctx.translate(dx, dy);

  var pt = this.getBeginPoint();
  ctx.moveTo(pt.x, pt.y);

  for (var i = 0; this.edges.length > i; i++) {
    this.edges[i].draw(ctx);

    // test code for outline
    // if(this.selected) {
    //    this.edges[i].drawOutLine(ctx, this.lineWidth);
    // }
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

  ctx.restore();
}

self.prototype.drawHandles = function(ctx) {
  var len = this.edges.length;

  for (var i = 0; this.edges.length > i; i++) {
    this.edges[i].drawHandle(ctx);
  }

}

self.prototype.drawAnchorPoints = function(ctx, dx, dy) {

  var len = this.edges.length;

  for (var i = 0; this.edges.length > i; i++) {

    ctx.save();
    ctx.translate(dx, dy);
    this.edges[i].drawAnchorPoints(ctx);
    ctx.restore();

  }

}

self.prototype.drawEndPointsOfPath = function(ctx, dx, dy) {

  var last = this.edges.length - 1;

  ctx.save();
  ctx.translate(dx, dy);
  this.edges[0].drawAnchorPointZero(ctx);
  this.edges[last].drawAnchorPointOne(ctx);
  ctx.restore();

}

// will we use this?
self.prototype.drawLastTwoHandles = function(ctx) {
  var len = this.edges.length;

  if(len >= 2) {
    this.edges[len - 2].drawHandle(ctx);
  }
  this.edges[len - 1].drawHandle(ctx);

}

} // block

