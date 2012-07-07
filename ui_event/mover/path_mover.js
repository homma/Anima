/*
 * @author Daisuke Homma
 */

new function() { // block

an.PathMover = function() {

  this.prevX = null;
  this.prevY = null;
  this.removePathWhenNoMove = false;
  this.removePath = null;
  this.moved = false;

  an.g.PathMover = this;

};
var self = an.PathMover;

// inherit from an.EventState;
self.prototype = new an.EventState();

self.prototype.test = function(e) {

  var position = an.u.getMousePositionInCanvas(e);
  var x = position.x;
  var y = position.y;

  // hit test (path for move)
  var hitPath = an.g.editor.isOnPath(x, y);
  if(hitPath) {

    var selectedAlready = an.g.editor.isSelectedPath(hitPath);

    an.g.editor.selectPath(hitPath);
    an.g.pathInspectorView.update();  // update the path info pane
    an.g.editor.draw();

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
  var eventObj = an.g.PathInspector.getPathOps();
  eventObj.select();

};

self.prototype.onMouseMove = function(e) {

  this.moved = true;
  this.translatePath(e);

}

self.prototype.onMouseUp = function(e) {

  // this.translatePath(e);  // Is this necessary?

  if( (! this.moved) && (this.removePathWhenNoMove) ) {
    an.g.editor.deselectPath(this.removePath);
  }
  this.deselect();

};

self.prototype.translatePath = function(e) {

  var position = an.u.getMousePositionInCanvas(e);
  var x = position.x;
  var y = position.y;

  var diffX = x - this.prevX;
  var diffY = y - this.prevY;

  this.prevX = x;
  this.prevY = y;

  // var paths = an.g.editor.getSelectedPaths();
  // for(var i = 0; i < paths.length; i++) {
  //   paths[i].translate(diffX, diffY);
  // }
  an.g.editor.translateSelectedPaths(diffX, diffY);

  an.g.editor.draw();

};

} // block
