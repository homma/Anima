/*
 * @author Daisuke Homma
 */

new function() { // block

Anima.PointRemover = function() {

  this.hitEdge = null;

  Anima.Global.PointRemover = this;

};
var self = Anima.PointRemover;

// inherit from Anima.EventState;
self.prototype = new Anima.EventState();

self.prototype.test = function(e) {

  var position = Anima.Util.getMousePositionInCanvas(e);
  var x = position.x;
  var y = position.y;

  // hit test (Anchor Point)
  var hitEdge = Anima.Global.editor.hitTestAnchorPoint(x, y);
  if(hitEdge) {

    this.select(hitEdge);
    return true;

  }

  return false;

}

self.prototype.select = function(edge) {

  this.hitEdge = edge;
  this.selectSelf();

};

self.prototype.deselect = function() {

  this.hitEdge = null;
  Anima.Global.Selector.select();

};

self.prototype.onMouseMove = function(e) {

  this.deselect();

}

self.prototype.onMouseUp = function(e) {

  Anima.Global.editor.removePoint(this.hitEdge);
  Anima.Global.editor.draw();

}

} // block
