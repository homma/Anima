/*
 * @author Daisuke Homma
 */

new function() { // block

// Pen Mode

an.PenHandler = function() {

  this.onDrawing = false;
  this.prevCurve = null;

  // console.log(this);
  an.g.PenHandler = this;

};

var self = an.PenHandler;
self.prototype = new an.EventState();

self.prototype.select = function() {

  var canvas = an.g.canvas.canvas;
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

  an.g.editor.draw();

};

self.prototype.onMouseDown = function(e) {

  var position = an.u.getMousePositionInCanvas(e);
  var x = position.x;
  var y = position.y;

  var path = new an.Path();
  an.g.editor.setNewPath(path);

  var curve = new an.Curve();
  curve.setAnchorPointZero(x, y);
  curve.setControlPointZero(x, y);
  path.addEdge(curve);

  this.prevCurve = curve;

  // console.log("mouse down at " + x + " @ " + y);

  this.onDrawing = true;

};

self.prototype.onMouseMove = function(e) {

  if(!this.onDrawing) return;

  var position = an.u.getMousePositionInCanvas(e);
  var x = position.x;
  var y = position.y;

  var path = an.g.editor.getNewPath();

  this.prevCurve.setAnchorPointOne(x, y);
  this.prevCurve.setControlPointOne(x, y);

  var curve = new an.Curve();
  curve.setAnchorPointZero(x, y);
  curve.setControlPointZero(x, y);
  path.addEdge(curve);

  this.prevCurve = curve;

  an.g.editor.draw();

};

self.prototype.onMouseUp = function(e) {

  if(!this.onDrawing) return;

  var position = an.u.getMousePositionInCanvas(e);
  var x = position.x;
  var y = position.y;

  var path = an.g.editor.getNewPath();

  this.prevCurve.setAnchorPointOne(x, y);
  this.prevCurve.setControlPointOne(x, y);

  path.finished();
  an.g.editor.addPath(path);
  an.g.editor.setNewPath(null);

  an.g.editor.draw();

  // console.log("mouse up at " + x + " @ " + y);

  this.onDrawing = false;

};

self.prototype.onMouseOut = self.prototype.onMouseUp;

self.prototype.onKeyDown = function(e) {
  // console.log(e.keyCode);
};

} // block
