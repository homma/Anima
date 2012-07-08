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

  var radius = 4;
  ctx.lineWidth   = 0.8;
  ctx.fillStyle = 'rgb(255,102,255)';

  ctx.beginPath();
  ctx.arc(this.p0x, this.p0y, radius, 0, 2 * Math.PI, false);
  ctx.fill();

  ctx.restore();

}

self.prototype.drawAnchorPointOne = function(ctx) {

  ctx.save();

  var radius = 4;
  ctx.lineWidth   = 0.8;
  ctx.strokeStyle = 'rgb(255,102,255)';
  ctx.fillStyle = 'rgb(255,255,255)';

  ctx.beginPath();
  ctx.arc(this.p1x, this.p1y, radius, 0, 2 * Math.PI, false);
  ctx.stroke();
  ctx.fill();

  ctx.restore();

}


self.prototype.drawFirstHandle = function(ctx) {

  var radius = 4;

  ctx.save();

  ctx.lineWidth   = 0.8;

  ctx.strokeStyle = 'rgb(255,102,255)';
  ctx.fillStyle = 'rgb(255,255,255)';

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
  var radius = 4;

  ctx.save();

  ctx.lineWidth   = 0.8;

  ctx.strokeStyle = 'rgb(255,102,255)';
  ctx.fillStyle = 'rgb(255,255,255)';

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
