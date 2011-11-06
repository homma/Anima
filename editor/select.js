/*
 * @author Daisuke Homma
 */

new function() {  // block

var self = Anima.Editor;

/// select / deselect path with cache management ///////////////////////////////

self.prototype.setSelectMode = function(mode) {

  // this.SelectModes.transform = 1;
  // this.SelectModes.resize = 2;
  // this.SelectModes.rotate = 3;

  this.selectMode = mode;

}

self.prototype.getSelectedPaths = function() {

  return this.selectedPathList;

}

self.prototype.selectPath = function(path) {

  if( path.getSelected() ) return; // do nothing if it is already selected.

  path.setSelected(true);
  this.selectedPathList.push(path);

}

self.prototype.deselectPath = function(path) {

  if( !path.getSelected() ) return; // do nothing if it is already deselected.

  path.setSelected(false);

  for(var i = 0; i < this.selectedPathList.length; i++) {
    if(path == this.selectedPathList[i]) {
      this.selectedPathList.splice(i, 1);
    }
  }

}

self.prototype.deselectAll = function() {

  for (var i = 0; i < this.pathList.length; i++) {
    this.deselectPath(this.pathList[i]);
  }

}

self.prototype.selectAll = function() {

  for (var i = 0; i < this.pathList.length; i++) {
    this.selectPath(this.pathList[i]);
  }

}

} // block
