/*
 * @author Daisuke Homma
 */

new function() { // block

Anima.PointRemover = function() {

  Anima.Global.PointRemover = this;

};
var self = Anima.PointRemover;

// inherit from Anima.EventState;
self.prototype = new Anima.EventState();

self.prototype.test = function(e) {

  this.select();
  return true;

}

self.prototype.select = function() {

  this.selectSelf();

};

self.prototype.deselect = function() {

  this.deselectSelf();

};

self.prototype.onClick = function(e) {

  var position = Anima.Util.getMousePositionInCanvas(e);
  var x = position.x;
  var y = position.y;

  // hit test (Anchor Point)
  var hitEdge = Anima.Global.editor.isOnAnchorPoints(x, y);
  if(hitEdge) {
    Anima.Global.editor.removePoint(hitEdge);
    Anima.Global.editor.draw();
  }

}

} // block
