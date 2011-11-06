/*
 * @author Daisuke Homma
 */

new function() { // block

// Pen Mode

Anima.PenHandler = function() {

  this.onDrawing = false;
  this.prevCurve = null;

  // console.log(this);
  Anima.Global.PenHandler = this;

};

var self = Anima.PenHandler;
self.prototype = new Anima.EventState();

self.prototype.select = function() {

  var canvas = Anima.Global.canvas.canvas;
  canvas.style.cursor = "default";

  canvas.onmousedown     = this.onMouseDown;
  canvas.onmousemove     = this.onMouseMove;
  canvas.onmouseup       = this.onMouseUp;
  canvas.onmouseout      = this.onMouseOut;
  // canvas.onclick         = this.onClick;
  // canvas.ondblclick      = this.onDblClick;

  document.onkeydown     = this.onKeyDown;

  // we must have this
  canvas.onselectstart = function() { return false; };
  // wd don't use native context menu
  canvas.oncontextmenu   = function() { return false; };

  Anima.Global.editor.draw();

};

self.prototype.onMouseDown = function(e) {

  var position = Anima.Util.getMousePositionInCanvas(e);
  var x = position.x;
  var y = position.y;

  var path = new Anima.Path();
  Anima.Global.editor.setNewPath(path);

  var curve = new Anima.Curve();
  curve.p0x = x;
  curve.p0y = y;
  curve.cp0x = x;
  curve.cp0y = y;
  path.addEdge(curve);

  this.prevCurve = curve;

  // console.log("mouse down at " + x + " @ " + y);

  this.onDrawing = true;

};

self.prototype.onMouseMove = function(e) {

  if(!this.onDrawing) return;

  var position = Anima.Util.getMousePositionInCanvas(e);
  var x = position.x;
  var y = position.y;

  var path = Anima.Global.editor.getNewPath();

  this.prevCurve.p1x = x;
  this.prevCurve.p1y = y;
  this.prevCurve.cp1x = x;
  this.prevCurve.cp1y = y;

  var curve = new Anima.Curve();
  curve.p0x = x;
  curve.p0y = y;
  curve.cp0x = x;
  curve.cp0y = y;
  path.addEdge(curve);

  this.prevCurve = curve;

  Anima.Global.editor.draw();

};

self.prototype.onMouseUp = function(e) {

  if(!this.onDrawing) return;

  var position = Anima.Util.getMousePositionInCanvas(e);
  var x = position.x;
  var y = position.y;

  var path = Anima.Global.editor.getNewPath();

  this.prevCurve.p1x = x;
  this.prevCurve.p1y = y;
  this.prevCurve.cp1x = x;
  this.prevCurve.cp1y = y;

  path.finished();
  Anima.Global.editor.addPath(path);
  Anima.Global.editor.setNewPath(null);

  Anima.Global.editor.draw();

  // console.log("mouse up at " + x + " @ " + y);

  this.onDrawing = false;

};

self.prototype.onMouseOut = self.prototype.onMouseUp;

self.prototype.onKeyDown = function(e) {
  // console.log(e.keyCode);
};

} // block
