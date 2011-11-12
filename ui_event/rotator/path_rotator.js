/*
 * @author Daisuke Homma
 */

new function() { // block

Anima.PathRotator = function() {

  this.position = null;
  Anima.Global.PathRotator = this;

};
var self = Anima.PathRotator;

// inherit from Anima.EventState;
self.prototype = new Anima.EventState();

self.prototype.select = function(obj) {

  this.position = obj.position;
  this.selectSelf();

};

self.prototype.deselect = function() {

  this.position = null;
  Anima.Global.Selector.select();

};

self.prototype.onMouseMove = function(e) {

  this.resizePath(e);

}

self.prototype.onMouseUp = function(e) {

  this.deselect();

};

self.prototype.rotatePath = function(e) {

  var position = Anima.Util.getMousePositionInCanvas(e);

  var handles = Anima.Global.editor.getRotateGuideHandles();
  var p = this.position;

  //     3
  // 1 - 0 - 2
  //     4

  // Anima.Global.editor.rotateSelectedPaths();
  // Anima.Global.editor.translateSelectedPaths(diffX, diffY);

  // Anima.Global.editor.draw();

};

} // block
