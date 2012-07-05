/*
 * @author Daisuke Homma
 */

new function() { // block

// Not Yet Implemented

an.PathRotator = function() {

  this.position = null;
  an.g.PathRotator = this;

};
var self = an.PathRotator;

// inherit from an.EventState;
self.prototype = new an.EventState();

self.prototype.select = function(e) {

  var position = an.u.getMousePositionInCanvas(e);
  var x = position.x;
  var y = position.y;

  return false;
}

/*
self.prototype.select = function(obj) {

  this.position = obj.position;
  this.selectSelf();

};
*/

self.prototype.deselect = function() {

  this.position = null;
  this.deselectSelf();

};

self.prototype.onMouseMove = function(e) {

  this.resizePath(e);

}

self.prototype.onMouseUp = function(e) {

  this.deselect();

};

self.prototype.rotatePath = function(e) {

  var position = an.u.getMousePositionInCanvas(e);

  // an.g.editor.rotateSelectedPaths();
  // an.g.editor.translateSelectedPaths(diffX, diffY);

  // an.g.editor.draw();

};

} // block
