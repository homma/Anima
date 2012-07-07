/*
 * @author Daisuke Homma
 */

new function() { // block

an.PathConnector = function() {

  this.hitPath = null;

  this.prevX = null;
  this.prevY = null;
  this.removePathWhenNoMove = false;
  this.removePath = null;
  this.moved = false;

  an.g.PathConnector = this;

};
var self = an.PathConnector;

// inherit from an.EventState;
self.prototype = new an.EventState();

self.prototype.test = function(e) {

  var position = an.u.getMousePositionInCanvas(e);
  var x = position.x;
  var y = position.y;

  // hit test (path for move)
  this.hitPath = an.g.editor.isOnPath(x, y);
  if(this.hitPath) {

    var selectedAlready = an.g.editor.isSelectedPath(this.hitPath);

    an.g.editor.selectPath(this.hitPath);
    an.g.pathInspectorView.update();  // update the path info pane
    an.g.editor.draw();

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
  an.g.editor.deselectAll();
  an.g.editor.draw();
  an.g.pathInspectorView.update();  // update the path info pane

}

self.prototype.onMouseMove = function(e) {

  if( !this.hitPath ) { return; }

  this.moved = true;
  this.translatePath(e);

}

self.prototype.onMouseUp = function(e) {

  if( !this.hitPath ) { return; }

  if( (! this.moved) && (this.removePathWhenNoMove) ) {
    an.g.editor.deselectPath(this.removePath);
  }

  if(this.moved) {
    an.g.editor.commitTranslation();
    an.g.editor.draw();
  }

  this.prevX = null;
  this.prevY = null;
  this.moved = false;
  this.hitPath = null;

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
