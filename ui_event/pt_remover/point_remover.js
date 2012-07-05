/*
 * @author Daisuke Homma
 */

new function() { // block

an.PointRemover = function() {

  an.g.PointRemover = this;

};
var self = an.PointRemover;

// inherit from an.EventState;
self.prototype = new an.EventState();

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

  var position = an.u.getMousePositionInCanvas(e);
  var x = position.x;
  var y = position.y;

  // hit test (Anchor Point)
  var hitEdge = an.g.editor.isOnAnchorPoints(x, y);
  if(hitEdge) {
    an.g.editor.removePoint(hitEdge);
    an.g.editor.draw();
  }

}

} // block
