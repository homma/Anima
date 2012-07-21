/*
 * @author Daisuke Homma
 */

new function() {  // block

var self = an.Editor;

/// select / deselect path /////////////////////////////////////////////////////

self.prototype.getAllPaths = function() {

  return this.pathList;

}

self.prototype.getSelectedPaths = function() {

  return this.selectedPathList;

}

self.prototype.isSelectedPath = function(p) {

  var ret = false;

  // p is a member of this.selectedPathList
  if( this.selectedPathList.indexOf(p) != -1 ) {

    // make sure
    p.setSelected(true);
    ret = true;

  }

  return ret;

}

self.prototype.selectPath = function(p) {

  // do nothing if it is already selected.
  if( this.isSelectedPath(p) ) { return; }

  p.setSelected(true);
  this.selectedPathList.push(p);

}

self.prototype.deselectPath = function(p) {

  if( !p.isSelected() ) return; // do nothing if it is already deselected.

  p.setSelected(false);

  var idx = this.selectedPathList.indexOf(p);
  this.selectedPathList.splice(idx, 1);

/*
  for(var i = 0; i < this.selectedPathList.length; i++) {
    if(p == this.selectedPathList[i]) {
      this.selectedPathList.splice(i, 1);
    }
  }
*/

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
