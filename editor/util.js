/*
 * @author Daisuke Homma
 */

new function() {  // block

var self = an.Editor;

// should be cleaned up.
self.prototype.getResizeArea = function() {

  // guard
  if(this.selectMode != this.SelectModes.resize) { return null; }

  return this.selectMode.getResizeGuideHandles();

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

