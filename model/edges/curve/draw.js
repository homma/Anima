/*
 * @author Daisuke Homma
 */

Anima.Curve.prototype.draw = function(ctx) {
  // console.log("drawing bezier");
  ctx.bezierCurveTo(
    this.cp0x,
    this.cp0y,
    this.cp1x,
    this.cp1y,
    this.p1x,
    this.p1y
  );
  // console.log(this);
}

Anima.Curve.prototype.drawHandle = function(ctx) {
  this._drawFirstHandle(ctx);
  this._drawSecondHandle(ctx);
}

Anima.Curve.prototype._drawFirstHandle = function(ctx) {
  var radius = 4;
  ctx.lineWidth   = 0.8;

  // draw 1st point
  {
    ctx.fillStyle = 'rgb(255,102,255)';

    ctx.beginPath();
    ctx.arc(this.p0x, this.p0y, radius, 0, 2 * Math.PI, false);
    ctx.fill();
  }

  // drawing 1st handle
  {
    ctx.strokeStyle = 'rgb(255,102,255)';
    ctx.fillStyle = 'rgb(255,255,255)';

    ctx.beginPath();
    ctx.moveTo(this.p0x, this.p0y);
    ctx.lineTo(this.cp0x, this.cp0y);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(this.cp0x, this.cp0y, radius, 0, 2 * Math.PI, false);
    ctx.stroke();
    ctx.fill();
  }
}

Anima.Curve.prototype._drawSecondHandle = function(ctx) {
  var radius = 4;
  ctx.lineWidth   = 0.8;

  // draw 2nd point if it's the last point.
  if(this.next == null) {
    ctx.fillStyle = 'rgb(255,102,255)';

    ctx.beginPath();
    ctx.arc(this.p1x, this.p1y, radius, 0, 2 * Math.PI, false);
    ctx.fill();
  }

  // drawing 2nd handle
  {
    ctx.strokeStyle = 'rgb(255,102,255)';
    ctx.fillStyle = 'rgb(255,255,255)';

    ctx.beginPath();
    ctx.moveTo(this.p1x, this.p1y);
    ctx.lineTo(this.cp1x, this.cp1y);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(this.cp1x, this.cp1y, radius, 0, 2 * Math.PI, false);
    ctx.stroke();
    ctx.fill();
  }

}

