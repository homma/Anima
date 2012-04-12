/*
 * @author Daisuke Homma
 */

new function() {  // block

var self = Anima.Editor;

/// select / deselect path with cache management ///////////////////////////////

self.prototype._setSelectMode = function(mode) {

  // this.SelectModes.transform = 1;
  // this.SelectModes.resize = 2;
  // this.SelectModes.rotate = 3;

  this.selectMode = mode;

}

self.prototype._getSelectedPaths = function() {

  return this.selectedPathList;

}

self.prototype._isSelectedPath = function(p) {
  return p.isSelected();
}

self.prototype._selectPath = function(p) {

  if( p.isSelected() ) return; // do nothing if it is already selected.

  p.setSelected(true);
  this.selectedPathList.push(p);

}

self.prototype._deselectPath = function(p) {

  if( !p.isSelected() ) return; // do nothing if it is already deselected.

  p.setSelected(false);

  for(var i = 0; i < this.selectedPathList.length; i++) {
    if(p == this.selectedPathList[i]) {
      this.selectedPathList.splice(i, 1);
    }
  }

}

self.prototype._deselectAll = function() {

  for (var i = 0; i < this.pathList.length; i++) {
    this.deselectPath(this.pathList[i]);
  }

}

self.prototype._selectAll = function() {

  for (var i = 0; i < this.pathList.length; i++) {
    this.selectPath(this.pathList[i]);
  }

}

} // block
