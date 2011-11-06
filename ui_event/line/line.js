/*
 * @author Daisuke Homma
 */

new function() { // block
// Line Mode

Anima.LineHandler = function() {

  // this.newPath = null;
  // this.beginX = null;
  // this.beginY = null;

  // console.log(this);
  Anima.Global.lineHandler = this;

}

var self = Anima.LineHandler;
self.prototype = new Anima.EventState();

self.prototype.select = function() {

  document.onkeydown = this.onKeyDown;

  var canvas = Anima.Global.canvas.canvas;

  canvas.style.cursor = "default";

  canvas.onmousedown = this.onMouseDown;
  canvas.onmousemove = this.onMouseMove;
  canvas.onmouseup = this.onMouseUp;
  canvas.onmouseout = this.onMouseUp;
  canvas.onselectstart = function() { return false; };
  canvas.ondblclick = this.onDoubleClick;

}

self.prototype.deselect = function() {

  this.disableAllHandlers();

}

self.prototype.onMouseDown = function(e) {

  // console.log(this);

  var position = Anima.Util.getMousePositionInCanvas(e);
  var x = position.x;
  var y = position.y;

  if(!Anima.Global.editor.newPath) {

    var path = new Anima.Path();
    var edge1 = new Anima.Move(x, y);
    path.addEdge(edge1);
    var edge2 = new Anima.Line(x, y);
    path.addEdge(edge2);
    Anima.Global.editor.newPath = path;

  } else {

    var edge = new Anima.Line(x, y);
    Anima.Global.editor.newPath.addEdge(edge);

  }

  Anima.Global.editor.draw();

  // console.log("mouse down at " + x + " @ " + y);

}

self.prototype.onMouseMove = function(e) {

  var position = Anima.Util.getMousePositionInCanvas(e);
  var x = position.x;
  var y = position.y;

  var path = Anima.Global.editor.newPath;

  if(path) {

    path.removeLastEdge();

    var edge = new Anima.Line(x, y);
    path.addEdge(edge);

    Anima.Global.editor.draw();
  }

}

self.prototype.onDoubleClick = function(e) {

  var position = Anima.Util.getMousePositionInCanvas(e);
  var x = position.x;
  var y = position.y;

  var path = Anima.Global.editor.newPath;

  if(path) {

    path.removeLastEdge();
    var edge = new Anima.Line(x, y);
    path.addEdge(edge);

    Anima.Global.editor.addPath(path);
    Anima.Global.editor.newPath = null;

    Anima.Global.editor.draw();
  }

}

self.prototype.onMouseUp = function(e) {
  // console.log("mouse up at " + x + " @ " + y);
}

self.prototype.onKeyDown = function(e) {
  // console.log(e.keyCode);
}

} // block

