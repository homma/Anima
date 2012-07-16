/*
 * @author Daisuke Homma
 */

new function() {  // block

var self = an.Editor;

// should be cleaned up.
self.prototype.getResizeHandles = function() {

  // guard
  if(this.editorMode != this.EditorModes.resize) { return null; }

  return this.editorMode.getResizeHandles();

}

self.prototype.getRotateHandles = function() {

  // guard
  if(this.editorMode != this.EditorModes.rotate) { return null; }

  return this.editorMode.getRotateHandles();

}

self.prototype.resetRotation = function() {

  // guard
  if(this.editorMode != this.EditorModes.rotate) {
    return;
  }

  this.editorMode.resetRotation();

}

self.prototype.getBoundaryOfSelectedPaths = function() {

  if(this.selectedPathList.length == 0) { return; };

  var rect = this.selectedPathList[0].getBoundary();

  for(var i = 1; i < this.selectedPathList.length; i++) {
    var bound = this.selectedPathList[i].getBoundary();
    rect = an.u.getCompoundBoundary(bound, rect);
  }

  return rect;
}

} // block

