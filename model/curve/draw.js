/*
 * @author Daisuke Homma
 */

new function() { // block

var self = an.Curve;

self.prototype.draw = function(ctx) {
  // console.log("drawing bezier");
  ctx.bezierCurveTo(
    this.c0x,
    this.c0y,
    this.c1x,
    this.c1y,
    this.p1x,
    this.p1y
  );
  // console.log(this);
}

self.prototype.drawAnchorPoints = function(ctx) {

  this.drawAnchorPointZero(ctx);

  // draw 2nd point if it's the last point.
  if(this.next == null) {
    this.drawAnchorPointOne(ctx);
  }

}

self.prototype.drawHandle = function(ctx) {

  this.drawAnchorPointZero(ctx);
  this.drawFirstHandle(ctx);

  // draw 2nd point if it's the last point.
  if(this.next == null) {
    this.drawAnchorPointOne(ctx);
  }
  this.drawSecondHandle(ctx);

}

self.prototype.drawAnchorPointZero = function(ctx) {

  ctx.save();

  var radius = an.d.p0.radius;
  ctx.lineWidth = an.d.p0.lineWidth;
  ctx.fillStyle = an.d.p0.fill;

  ctx.beginPath();
  ctx.arc(this.p0x, this.p0y, radius, 0, 2 * Math.PI, false);
  ctx.fill();

  ctx.restore();

}

self.prototype.drawAnchorPointOne = function(ctx) {

  ctx.save();

  var radius = an.d.p1.radius;
  ctx.lineWidth = an.d.p1.lineWidth;
  ctx.fillStyle = an.d.p1.fill;
  ctx.strokeStyle = an.d.p1.stroke;

  ctx.beginPath();
  ctx.arc(this.p1x, this.p1y, radius, 0, 2 * Math.PI, false);
  ctx.stroke();
  ctx.fill();

  ctx.restore();

}


self.prototype.drawFirstHandle = function(ctx) {

  ctx.save();

  var radius = an.d.c0.radius;
  ctx.lineWidth = an.d.c0.lineWidth;
  ctx.strokeStyle = an.d.c0.stroke;
  ctx.fillStyle = an.d.c0.fill

  ctx.beginPath();
  ctx.moveTo(this.p0x, this.p0y);
  ctx.lineTo(this.c0x, this.c0y);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(this.c0x, this.c0y, radius, 0, 2 * Math.PI, false);
  ctx.stroke();
  ctx.fill();

  ctx.restore();

}

self.prototype.drawSecondHandle = function(ctx) {

  ctx.save();

  var radius = an.d.c1.radius;
  ctx.lineWidth = an.d.c1.lineWidth;
  ctx.strokeStyle = an.d.c1.stroke;
  ctx.fillStyle = an.d.c1.fill

  ctx.beginPath();
  ctx.moveTo(this.p1x, this.p1y);
  ctx.lineTo(this.c1x, this.c1y);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(this.c1x, this.c1y, radius, 0, 2 * Math.PI, false);
  ctx.stroke();
  ctx.fill();

  ctx.restore();
}

} // block
