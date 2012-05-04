/*
 * @author Daisuke Homma
 */

new function() { // block

Anima.CurveModifier = function() {

  this.hitEdge = null;

  Anima.Global.CurveModifier = this;

};
var self = Anima.CurveModifier;

// inherit from Anima.EventState
self.prototype = new Anima.EventState();

self.prototype.test = function(e) {

  var position = Anima.Util.getMousePositionInCanvas(e);
  var x = position.x;
  var y = position.y;

  // hit test (transform handle)
  var hitEdge = Anima.Global.editor.isOnHandle(x, y);
  if(hitEdge) {

    this.select(hitEdge);
    return true;

  }

  return false;
}

self.prototype.select = function(edge) {

  this.hitEdge = edge;
  this.selectSelf();

}

self.prototype.deselect = function() {

  this.hitEdge = null;
  Anima.Global.Selector.select();

}

self.prototype.onMouseMove = function(e) {

  var position = Anima.Util.getMousePositionInCanvas(e);
  var x = position.x;
  var y = position.y;

  Anima.Global.editor.modifyPoint(this.hitEdge, x, y);
  Anima.Global.editor.draw();

};

self.prototype.onMouseUp = function(e) {

  var position = Anima.Util.getMousePositionInCanvas(e);
  var x = position.x;
  var y = position.y;

  Anima.Global.editor.modifyPoint(this.hitEdge, x, y);
  Anima.Global.editor.draw();

  this.deselect();

};

} // block
