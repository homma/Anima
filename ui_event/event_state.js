/*
 * @author Daisuke Homma
 */

new function() { // block

Anima.EventState = function() {};
var self = Anima.EventState;

// test if this handler should take over
self.prototype.test = function(e) {

  return false;

}

self.prototype.selectSelf = function() {

  this.selectState(this);

}

self.prototype.selectNextState = function(s) {

  this.selectState(s);
  s.select();

}

self.prototype.selectState = function(s) {

  var canvas = Anima.Global.canvas.canvas;
  canvas.style.cursor = "default";

  canvas.onmousedown     = function(e) { s.onMouseDown(e) };
  canvas.onmousemove     = function(e) { s.onMouseMove(e) };
  canvas.onmouseup       = function(e) { s.onMouseUp(e) };
  canvas.onmouseout      = function(e) { s.onMouseOut(e) };
  canvas.onclick         = function(e) { s.onClick(e) };
  canvas.ondblclick      = function(e) { s.onDblClick(e) };

  document.onkeydown     = function(e) { s.onKeyDown(e) };

  // we must have this
  canvas.onselectstart = function() { return false; };
  // wd don't use native context menu
  canvas.oncontextmenu   = function() { return false; };

  Anima.Global.editor.draw();

};

self.prototype.disableAllHandlers = function() {

  var canvas = Anima.Global.canvas.canvas;
  canvas.style.cursor = "default";

  canvas.onmousedown     = null;
  canvas.onmousemove     = null;
  canvas.onmouseup       = null;
  canvas.onmouseout      = null;
  canvas.onclick         = null;
  canvas.ondblclick      = null;

  document.onkeydown     = null;

  // we must have this
  canvas.onselectstart = function() { return false; };
  // wd don't use native context menu
  canvas.oncontextmenu   = function() { return false; };

}

// state handler template

self.prototype.select = function() {};
self.prototype.deselect = function() {};
self.prototype.onMouseDown = function(e) {};
self.prototype.onMouseMove = function(e) {};
self.prototype.onMouseUp = function(e) {};
self.prototype.onMouseOut = function(e) {};
self.prototype.onClick = function(e) {};
self.prototype.onDblClick = function(e) {};
self.prototype.onSelectStart = function() { return false; };
self.prototype.onContextMenu = function() { return false; };
self.prototype.onKeyDown = function(e) {};

} // block

