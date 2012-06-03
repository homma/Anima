/*
 * @author Daisuke Homma
 */

// Canvas View

new function() { // block

Anima.Canvas = function() {

  this.initCanvas();

  Anima.Global.canvas = this;

}
var self = Anima.Canvas;

self.prototype.initCanvas = function() {

  this.canvas = document.getElementById("cv");
  this.width  = this.canvas.clientWidth;
  this.height = this.canvas.clientHeight;

}

self.prototype.getCanvas = function() {

  return this.canvas;

}

self.prototype.clear = function() {
  var canvas = this.canvas;

  var ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgb(255,255,255)';
  ctx.fillRect(0, 0, this.width, this.height);

}

/// test ///////////////////////////////////////////////////////////////////////

self.prototype.test = function() {
  var canvas = this.canvas;

  var ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.moveTo(100,100);
  ctx.bezierCurveTo(120, 140, 280, 300, 250, 250);
  ctx.stroke();
}

} // block
