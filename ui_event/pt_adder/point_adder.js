/*
 * @author Daisuke Homma
 */

new function() { // block

an.PointAdder = function() {

  an.g.PointAdder = this;

};
var self = an.PointAdder;

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
  var curve = an.g.editor.isOnCurve(x, y);
  if(curve) {
    an.g.editor.divideCurve(curve);
    an.g.editor.draw();
  }

}

} // block
