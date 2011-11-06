/*
 * @author Daisuke Homma
 */

// Handler Test

Anima.TestHandler = function() {

  this.prevX = null;
  this.prevY = null;
  this.state = null;

  // console.log(this);
  // Anima.Global.curveHandler = this;
}

Anima.TestHandler.prototype.select = function() {

  var canvas = Anima.Global.canvas.canvas;
  canvas.style.cursor = "default";

  var self = this;

  canvas.onmousedown = function(e) { self.onMouseDown(e, self); };
  canvas.onselectstart = function() { return false; };

}

Anima.TestHandler.prototype.deselect = function() {

  document.onkeydown = null;

  var canvas = Anima.Global.canvas.canvas;

  canvas.style.cursor = "default";

  canvas.onmousedown = null;
  canvas.onmousemove = null;
  canvas.onmouseup = null;
  canvas.onmouseout = null;
  canvas.onselectstart = null;
  canvas.ondblclick = null;

  this.state = null;

}

Anima.TestHandler.prototype.onMouseDown = function(e, self) {

  console.log(self);

}
