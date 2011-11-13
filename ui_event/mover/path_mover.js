/*
 * @author Daisuke Homma
 */

new function() { // block

Anima.PathMover = function() {

  this.prevX = null;
  this.prevY = null;
  this.removePathWhenNoMove = false;
  this.removePath = null;
  this.moved = false;

  Anima.Global.PathMover = this;

};
var self = Anima.PathMover;

// inherit from Anima.EventState;
self.prototype = new Anima.EventState();

self.prototype.test = function(e) {

  var position = Anima.Util.getMousePositionInCanvas(e);
  var x = position.x;
  var y = position.y;

  // hit test (path for move)
  var hitPath = Anima.Global.editor.hitTest(x, y);
  if(hitPath) {

    var selectedAlready = false;
    if( hitPath.getSelected() ) {
      selectedAlready = true;
    }

    Anima.Global.editor.selectPath(hitPath);
    Anima.Global.pathInspectorView.update();  // update the path info pane
    Anima.Global.editor.draw();

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

  Anima.Global.Selector.select();

};

self.prototype.onMouseMove = function(e) {

  this.moved = true;
  this.translatePath(e);

}

self.prototype.onMouseUp = function(e) {

  // this.translatePath(e);  // Is this necessary?

  if( (! this.moved) && (this.removePathWhenNoMove) ) {
    Anima.Global.editor.deselectPath(this.removePath);
  }
  this.deselect();

};

self.prototype.translatePath = function(e) {

  var position = Anima.Util.getMousePositionInCanvas(e);
  var x = position.x;
  var y = position.y;

  var diffX = x - this.prevX;
  var diffY = y - this.prevY;

  this.prevX = x;
  this.prevY = y;

  // var paths = Anima.Global.editor.getSelectedPaths();
  // for(var i = 0; i < paths.length; i++) {
  //   paths[i].translate(diffX, diffY);
  // }
  Anima.Global.editor.translateSelectedPaths(diffX, diffY);

  Anima.Global.editor.draw();

};

} // block
