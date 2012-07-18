/*
 * @author Daisuke Homma
 */

new function() {  // block

var self = an.Editor;

/// select / deselect path with cache management ///////////////////////////////

self.prototype.getSelectedPaths = function() {

  return this.selectedPathList;

}

self.prototype.isSelectedPath = function(p) {
  return p.isSelected();
}

self.prototype.selectPath = function(p) {

  if( p.isSelected() ) return; // do nothing if it is already selected.

  p.setSelected(true);
  this.selectedPathList.push(p);

}

self.prototype.deselectPath = function(p) {

  if( !p.isSelected() ) return; // do nothing if it is already deselected.

  p.setSelected(false);

  for(var i = 0; i < this.selectedPathList.length; i++) {
    if(p == this.selectedPathList[i]) {
      this.selectedPathList.splice(i, 1);
    }
  }

}

self.prototype.deselectAll = function() {

  for (var i = 0; i < this.pathList.length; i++) {
    this.interface.deselectPath(this.pathList[i]);
  }

}

self.prototype.selectAll = function() {

  for (var i = 0; i < this.pathList.length; i++) {
    this.interface.selectPath(this.pathList[i]);
  }

}

} // block
