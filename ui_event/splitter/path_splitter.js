/**
 * @author Daisuke Homma
 */

new function() { // block

an.PathSplitter = function() {

  an.g.PathSplitter = this;

};
var self = an.PathSplitter;

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
  var hitInfo = an.g.editor.isOnAnchorPoints(x, y);
  if(hitInfo) {
    an.g.editor.splitPath(hitInfo.path, hitInfo.curve, hitInfo.point);
    an.g.editor.draw();
  }

}

} // block
