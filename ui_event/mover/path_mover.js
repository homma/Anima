/*
 * @author Daisuke Homma
 */

new function() { // block

var gl = Anima.Global;
var util = Anima.Util;

Anima.PathMover = function() {

  this.prevX = null;
  this.prevY = null;
  this.removePathWhenNoMove = false;
  this.removePath = null;
  this.moved = false;

  gl.PathMover = this;

};
var self = Anima.PathMover;

// inherit from Anima.EventState;
self.prototype = new Anima.EventState();

self.prototype.test = function(e) {

  var position = util.getMousePositionInCanvas(e);
  var x = position.x;
  var y = position.y;

  // hit test (path for move)
  var hitPath = gl.editor.hitTest(x, y);
  if(hitPath) {

    var selectedAlready = gl.editor.isSelectedPath(hitPath);

    gl.editor.selectPath(hitPath);
    gl.pathInspectorView.update();  // update the path info pane
    gl.editor.draw();

    if(selectedAlready) {
      this.select(x, y, true, hitPath);
    } else {
      this.select(x, y, false, null);
    }

    return true;
  }

  return false;
}

self.prototype.select = function(x, y, remove, path) {

  // initialize
  this.prevX = x;
  this.prevY = y;
  this.removePathWhenNoMove = remove;
  this.removePath = path;
  this.moved = false;

  this.selectSelf();

};

self.prototype.deselect = function() {

  this.prevX = null;
  this.prevY = null;

  // return to the current operator
  var eventObj = Anima.Global.PathInspector.getPathOps();
  eventObj.select();

};

self.prototype.onMouseMove = function(e) {

  this.moved = true;
  this.translatePath(e);

}

self.prototype.onMouseUp = function(e) {

  // this.translatePath(e);  // Is this necessary?

  if( (! this.moved) && (this.removePathWhenNoMove) ) {
    gl.editor.deselectPath(this.removePath);
  }
  this.deselect();

};

self.prototype.translatePath = function(e) {

  var position = util.getMousePositionInCanvas(e);
  var x = position.x;
  var y = position.y;

  var diffX = x - this.prevX;
  var diffY = y - this.prevY;

  this.prevX = x;
  this.prevY = y;

  // var paths = gl.editor.getSelectedPaths();
  // for(var i = 0; i < paths.length; i++) {
  //   paths[i].translate(diffX, diffY);
  // }
  gl.editor.translateSelectedPaths(diffX, diffY);

  gl.editor.draw();

};

} // block
