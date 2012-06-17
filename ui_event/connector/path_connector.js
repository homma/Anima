/*
 * @author Daisuke Homma
 */

new function() { // block

var gl = Anima.Global;

Anima.PathConnector = function() {

  this.hitPath = null;

  this.prevX = null;
  this.prevY = null;
  this.removePathWhenNoMove = false;
  this.removePath = null;
  this.moved = false;

  gl.PathConnector = this;

};
var self = Anima.PathConnector;

// inherit from Anima.EventState;
self.prototype = new Anima.EventState();

self.prototype.test = function(e) {

  var position = Anima.Util.getMousePositionInCanvas(e);
  var x = position.x;
  var y = position.y;

  // hit test (path for move)
  this.hitPath = gl.editor.hitTest(x, y);
  if(this.hitPath) {

    var selectedAlready = gl.editor.isSelectedPath(this.hitPath);

    gl.editor.selectPath(this.hitPath);
    gl.pathInspectorView.update();  // update the path info pane
    gl.editor.draw();

    this.prevX = x;
    this.prevY = y;

    if(selectedAlready) {
      this.removePathWhenNoMove = true;
      this.removePath = this.hitPath;
    } else {
      this.removePathWhenNoMove = false;
      this.removePath = null;
    }

    return true;

  }

  return false;
}

self.prototype.select = function() {

  // initialize
  this.removePathWhenNoMove = false;
  this.removePath = null;
  this.moved = false;
  this.hitPath = null;

  this.selectSelf();

};

self.prototype.deselect = function() {

  this.deselectSelf();

};

self.prototype.onMouseDown = function(e) {

  if( this.test(e) ) { return; }

  // otherwise deselect
  gl.editor.deselectAll();
  gl.editor.draw();
  gl.pathInspectorView.update();  // update the path info pane

}

self.prototype.onMouseMove = function(e) {

  if( !this.hitPath ) { return; }

  this.moved = true;
  this.translatePath(e);

}

self.prototype.onMouseUp = function(e) {

  if( !this.hitPath ) { return; }

  if( (! this.moved) && (this.removePathWhenNoMove) ) {
    gl.editor.deselectPath(this.removePath);
  }

  if(this.moved) {
    gl.editor.commitTranslation();
    gl.editor.draw();
  }

  this.prevX = null;
  this.prevY = null;
  this.moved = false;
  this.hitPath = null;

};

self.prototype.translatePath = function(e) {

  var position = Anima.Util.getMousePositionInCanvas(e);
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
